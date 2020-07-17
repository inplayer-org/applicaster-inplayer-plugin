import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import LoadingScreen from "../LoadingScreen";
import Storefront from "../UIComponents/Storefront";
import NavbarComponent from "../UIComponents/NavbarComponent";
import { container } from "../Styles";

import {
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
  mergeFeesTitlesAndAddType,
  retrieveInPlayerFeesData,
  isRequirePurchaseError,
} from "./Helper";
import Footer from "../UIComponents/Footer";
import MESSAGES from "./Config";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const { screenStyles } = props;

  const {
    payment_screen_background: screenBackground = "",
    client_logo: logoUrl = "",
    close_button: buttonUrl = "",
  } = screenStyles;

  const assetId = inPlayerAssetId({
    payload: props.payload,
    configuration: props.configuration,
  });

  const [dataSource, setDataSource] = useState(null);
  const [assetLoading, setAssetLoading] = useState(false);
  let stillMounted = true;

  useEffect(() => {
    loadAsset({ startPurchaseFlow: true });
    return () => {
      stillMounted = false;
    };
  }, []);

  const preparePurchaseData = async () => {
    const {
      configuration: {
        in_player_client_id,
        consumable_type_mapper,
        non_consumable_type_mapper,
        subscription_type_mapper,
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
        throw new Error("No fees available for current asset");
      }
      const inPlayerFeesData = retrieveInPlayerFeesData({
        feesToSearch: resultPurchaseData[0],
        allPackagesData: resultPurchaseData[1],
        assetId,
        purchaseKeysMapping,
      });

      const storeFeesData = await retrieveProducts(inPlayerFeesData);

      if (storeFeesData.length === 0) {
        throw new Error("No items available in store");
      }

      mergeFeesTitlesAndAddType({
        storeFeesData,
        inPlayerFeesData,
      });

      stillMounted && setDataSource(storeFeesData);
    } catch (error) {
      stillMounted && completeAssetFlow({ success: false, error });
    }
  };

  const loadAsset = ({ startPurchaseFlow = false }) => {
    console.log("LoadAsset");
    const retryInCaseFail = !startPurchaseFlow;
    const { payload } = props;
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

        const status = error?.response?.status?.toString();

        const message = isRequirePurchaseError(status)
          ? MESSAGES.purchase.required
          : status;
        const errorWithMessage = { ...error, message };
        completeAssetFlow({ success: false, error: errorWithMessage });
      });
  };

  const completeAssetFlow = (completionObject) => {
    invokeCallBack(props, completionObject);
  };

  const buyItem = async ({ productIdentifier }) => {
    if (!productIdentifier) {
      const error = new Error(MESSAGES.validation.productId);
      return completeAssetFlow({ success: false, error });
    }

    try {
      const [item_id, access_fee_id] = productIdentifier.split("_");

      await purchaseAnItem({
        purchaseID: productIdentifier,
        item_id,
        access_fee_id,
      });

      return loadAsset({ startPurchaseFlow: false });
    } catch (error) {
      Alert.alert(MESSAGES.purchase.fail, error.message);
      assetLoading && setAssetLoading(false);
    }
  };

  const onPressPaymentOption = (index) => {
    Platform.OS === "ios" && setAssetLoading(true);

    const itemToPurchase = dataSource[index];
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
        Alert.alert(MESSAGES.restore.success, MESSAGES.restore.successInfo, [
          {
            text: "OK",
            onPress: () => onRestoreSuccess(dataSource),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(MESSAGES.restore.fail, err.message, [
          {
            text: "OK",
            onPress: () => setAssetLoading(false),
          },
        ]);
      });
  };

  if (!dataSource) {
    return <LoadingScreen />;
  }

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
};

export default AssetFlow;
