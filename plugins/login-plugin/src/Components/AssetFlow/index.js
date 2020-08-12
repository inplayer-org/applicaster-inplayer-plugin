import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import LoadingScreen from "../LoadingScreen";
import Storefront from "../UIComponents/Storefront";
import NavbarComponent from "../UIComponents/NavbarComponent";
import ParentLockPlugin from "@applicaster/quick-brick-parent-lock";
import {
  getAssetByExternalId,
  checkAccessForAsset,
  getAccessFees,
  getAllPackages,
} from "../../Services/inPlayerService";

import {
  purchaseAnItem,
  retrieveProducts,
  restore,
} from "../../Services/iAPService";

import { inPlayerAssetId } from "../../Utils/PayloadUtils";
import {
  invokeCallBack,
  addInPlayerProductId,
  retrieveInPlayerFeesData,
  isRequirePurchaseError,
  showAlert,
} from "./Helper";
import Footer from "../UIComponents/Footer";
import MESSAGES from "./Config";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height,
    width,
    paddingBottom: 15,
  },
});

const AssetFlow = (props) => {
  const { screenStyles } = props;

  const ScreensData = {
    EMPTY: "Empty",
    STOREFRONT: "Storefront",
    PARENT_LOCK: "ParentLock",
  };

  const [screen, setScreen] = useState(ScreensData.EMPTY);
  const { shouldShowParentLock } = props;
  const { onParentLockAppeared } = props;

  const {
    payment_screen_background: screenBackground = "",
    client_logo: logoUrl = "",
    close_button: buttonUrl = "",
  } = screenStyles;

  const [dataSource, setDataSource] = useState(null);
  const [assetLoading, setAssetLoading] = useState(false);
  const [assetId, setAssetId] = useState(null);
  let stillMounted = true;

  useEffect(() => {
    prepareAssetId();
    return () => {
      stillMounted = false;
    };
  }, []);

  useEffect(() => {
    if (assetId) {
      loadAsset({ startPurchaseFlow: true });
    }
  }, [assetId]);

  const prepareAssetId = async () => {
    const { payload, configuration } = props;

    let newAssetId = inPlayerAssetId({
      payload,
      configuration,
    });
    if (newAssetId) {
      setAssetId(newAssetId);
    } else {
      newAssetId = await getAssetByExternalId(payload);
      if (newAssetId && stillMounted) {
        setAssetId(newAssetId);
      } else {
        completeAssetFlow({
          success: false,
          error: { message: MESSAGES.asset.fail },
        });
      }
    }
  };

  const hideLoader = () => {
    setAssetLoading(false);
  };

  const presentParentLock = () => {
    setScreen(ScreensData.PARENT_LOCK);
    props.setParentLockWasPresented(true);
  };

  const parentLockCallback = (result) => {
    if (result.success) {
      setScreen(ScreensData.STOREFRONT);
    } else {
      completeAssetFlow({ success: false });
    }
  };

  const preparePurchaseData = async () => {
    const {
      configuration: {
        in_player_client_id,
        consumable_type_mapper,
        non_consumable_type_mapper,
        subscription_type_mapper,
        in_player_environment,
      },
    } = props;
    try {
      const purchaseKeysMapping = {
        consumable_type_mapper,
        non_consumable_type_mapper,
        subscription_type_mapper,
      };

      const resultPurchaseData = await Promise.all([
        getAccessFees(assetId),
        getAllPackages({
          clientId: in_player_client_id,
          purchaseKeysMapping,
        }),
      ]);
      if (resultPurchaseData.length === 0) {
        throw new Error(MESSAGES.validation.noFees);
      }
      const inPlayerFeesData = retrieveInPlayerFeesData({
        feesToSearch: resultPurchaseData[0],
        allPackagesData: resultPurchaseData[1],
        assetId,
        purchaseKeysMapping,
        in_player_environment,
      });

      const storeFeesData = await retrieveProducts(inPlayerFeesData);

      console.log({ inPlayerFeesData, storeFeesData });
      if (storeFeesData.length === 0) {
        throw new Error(MESSAGES.validation.emptyStore);
      }

      addInPlayerProductId({
        storeFeesData,
        inPlayerFeesData,
      });

      if (
        shouldShowParentLock &&
        shouldShowParentLock(props.parentLockWasPresented)
      ) {
        presentParentLock();
      } else {
        setScreen(ScreensData.STOREFRONT);
      }
      stillMounted && setDataSource(storeFeesData);
    } catch (error) {
      stillMounted && completeAssetFlow({ success: false, error });
    }
  };

  const loadAsset = async ({ startPurchaseFlow = false }) => {
    console.log("LoadAsset");
    const retryInCaseFail = !startPurchaseFlow;

    checkAccessForAsset({ assetId, retryInCaseFail })
      .then((data) => {
        console.log("LoadAsset2", { data });

        const src = data?.src;

        if (data && src) {
          console.log({ src, data });
          const newPayload = src && {
            ...payload,
            content: { src },
          };
          completeAssetFlow({ newPayload });
        } else {
          const errorMessage =
            screenStyles.video_stream_exception_message || "";
          const error = new Error(errorMessage);
          completeAssetFlow({ success: false, error });
        }
      })
      .catch((error) => {
        if (error?.requestedToPurchase && startPurchaseFlow) {
          return preparePurchaseData();
        }
        let status = error?.response?.status;
        console.log({ error, status });

        if (status) {
          const statusString = status.toString();
          const message = isRequirePurchaseError(statusString)
            ? MESSAGES.purchase.required
            : statusString;
          const errorWithMessage = { ...error, message };
          completeAssetFlow({ success: false, error: errorWithMessage });
        } else {
          completeAssetFlow({
            success: false,
            error: { message: MESSAGES.asset.fail },
          });
        }
      });
  };

  const completeAssetFlow = (completionObject) => {
    invokeCallBack(props, completionObject);
  };

  const buyItem = async ({ productIdentifier, inPlayerProductId }) => {
    if (!productIdentifier || !inPlayerProductId) {
      const error = new Error(MESSAGES.validation.productId);
      return completeAssetFlow({ success: false, error });
    }

    try {
      const [item_id, access_fee_id] = inPlayerProductId.split("_");
      console.log({
        purchaseID: productIdentifier,
        item_id,
        access_fee_id,
      });
      await purchaseAnItem({
        purchaseID: productIdentifier,
        item_id,
        access_fee_id,
      });

      setDataSource(null);
      return loadAsset({ startPurchaseFlow: false });
    } catch (error) {
      const alertTitle = MESSAGES.purchase.fail;
      showAlert(alertTitle, error.message);
      Platform.OS === "ios" && hideLoader();
    }
  };

  const onPressPaymentOption = (index) => {
    Platform.OS === "ios" && setAssetLoading(true);

    const itemToPurchase = dataSource[index];
    console.log({ itemToPurchase });
    return buyItem(itemToPurchase);
  };

  const onRestoreSuccess = () => {
    setDataSource(null);
    loadAsset({ startPurchaseFlow: false });
  };

  const onPressRestore = () => {
    setAssetLoading(true);

    restore(dataSource)
      .then(() => {
        const alertTitle = MESSAGES.restore.success;
        const alertMessage = MESSAGES.restore.successInfo;
        showAlert(alertTitle, alertMessage, onRestoreSuccess);
      })
      .catch((err) => {
        console.log(err);
        const alertTitle = MESSAGES.restore.fail;
        showAlert(alertTitle, err.message, hideLoader);
      });
  };

  const render = () => {
    if (!dataSource) {
      return <LoadingScreen />;
    }
    switch (screen) {
      case ScreensData.PARENT_LOCK:
        return <ParentLockPlugin.Component callback={parentLockCallback} />;
      case ScreensData.STOREFRONT:
        return (
          <SafeAreaView
            style={[styles.container, { backgroundColor: screenBackground }]}
          >
            <NavbarComponent
              buttonAction={completeAssetFlow}
              logoUrl={logoUrl}
              buttonUrl={buttonUrl}
            />
            <Storefront
              screenStyles={screenStyles}
              dataSource={dataSource}
              onPressPaymentOption={onPressPaymentOption}
              onPressRestore={onPressRestore}
            />
            <Footer screenStyles={screenStyles} />
            {assetLoading && <LoadingScreen />}
          </SafeAreaView>
        );
    }
  };

  return render();
};

export default AssetFlow;
