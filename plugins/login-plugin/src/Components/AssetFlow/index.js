import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LoadingScreen from "../LoadingScreen";
import PaymentOptionView from "../UIComponents/PaymentOptionView";
import { container } from "../Styles";

import {
  checkAccessForAsset,
  getAccessFees,
  getAllPackages,
} from "../../Services/inPlayerService";

import { purchaseAnItem, retrieveProducts } from "../../Services/iAPService";
import { inPlayerAssetId } from "../../Utils/PayloadUtils";
import {
  invokeCallBack,
  mergeFeesTitlesAndAddType,
  retrieveInPlayerFeesData,
} from "./Helper";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const { screenStyles } = props;
  const assetId = inPlayerAssetId({
    payload: props.payload,
    configuration: props.configuration,
  });

  const [dataSource, setDataSource] = useState([]);
  const [assetLoading, setAssetLoading] = useState(true);
  const [packageData, setPackageData] = useState({
    loading: true,
    error: null,
    data: null,
  });
  let stillMounted = true;

  useEffect(() => {
    loadAsset({ startPurchaseFlow: true });
    preparePurchaseData();
    return () => {
      stillMounted = false;
    };
  }, []);

  useEffect(() => {
    if ([packageData.loading === false]) {
      invokePurchaseLogicIfNeeded();
    }
  }, [packageData.loading]);

  useEffect(() => {
    if (assetLoading === false) {
      invokePurchaseLogicIfNeeded();
    }
  }, [assetLoading]);

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

      stillMounted &&
        setPackageData({
          loading: false,
          error: null,
          data: storeFeesData,
        });
    } catch (error) {
      stillMounted &&
        setPackageData({
          loading: false,
          error,
          data: null,
        });
    }
  };

  const invokePurchaseLogicIfNeeded = () => {
    if (
      assetLoading === false &&
      packageData.loading === false &&
      packageData.data
    ) {
      if (packageData.data) {
        stillMounted && setDataSource(packageData.data);
      } else {
        const error = new Error("Can not create action sheet data source");
        completeAssetFlow({ success: false, error });
      }
    } else if (packageData.loading === false && packageData.error) {
      completeAssetFlow({ success: false, error: packageData.error });
    }
  };

  const loadAsset = ({ startPurchaseFlow = false }) => {
    console.log("LoadAsset");
    const retryInCaseFail = startPurchaseFlow == false;
    const { payload } = props;
    checkAccessForAsset({ assetId, retryInCaseFail })
      .then((data) => {
        console.log("LoadAsset2", { data });

        const src = data?.src;

        if (data && src) {
          console.log({ src, data });
          newPayload = src && {
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
          stillMounted && setAssetLoading(false);
        } else {
          completeAssetFlow({
            success: false,
            error: { ...error, message: error?.response?.status?.toString() },
          });
        }
      });
  };

  const completeAssetFlow = (completionObject) => {
    invokeCallBack(props, completionObject);
  };

  const buyItem = (itemToPurchase) => {
    const { productIdentifier } = itemToPurchase;

    if (productIdentifier) {
      const purchaseData = productIdentifier.split("_");

      purchaseAnItem({
        purchaseID: productIdentifier,
        item_id: purchaseData[0],
        access_fee_id: purchaseData[1],
      })
        .then(() => {
          loadAsset({ startPurchaseFlow: false });
        })
        .catch((error) => {
          completeAssetFlow({ success: false, error: error });
        });
    } else {
      const error = new Error("Can not purchase, product identifier not exist");
      completeAssetFlow({ success: false, error });
    }
  };

  const onPressPaymentOption = (index) => {
    const itemToPurchase = packageData.data[index];
    buyItem(itemToPurchase);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(assetLoading || packageData.loading) && <LoadingScreen />}
      {dataSource.map((item) => (
        <PaymentOptionView
          screenStyles={screenStyles}
          paymentOptionItem={item}
          key={item.productIdentifier}
          onPress={onPressPaymentOption}
        />
      ))}
    </SafeAreaView>
  );
};

export default AssetFlow;
