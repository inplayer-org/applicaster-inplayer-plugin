import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ActionSheet from "react-native-actionsheet";
import LoadingScreen from "../LoadingScreen";
import { container } from "../Styles";

import {
  retrievePurchasableItems,
  checkAccessForAsset,
  getAccessFees,
  getAllPackages,
} from "../../Services/inPlayerService";

import { purchaseAnItem, retrieveProducts } from "../../Services/iAPService";
import { inPlayerAssetId } from "../../Utils/PayloadUtils";
import {
  invokeCallBack,
  prepareActionSheetDataSource,
  cancelButtonIndex,
  mergeFeesTitlesIfNeeded,
} from "./Helper";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const assetId = inPlayerAssetId({
    payload: props.payload,
    configuration: props.configuration,
  });

  const [actionSheetDataSource, setActionSheetDataSource] = useState([]);
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
    if ([packageData.loading == false]) {
      invokePurchaseLogicIfNeeded();
    }
  }, [packageData.loading]);

  useEffect(() => {
    if (assetLoading == false) {
      invokePurchaseLogicIfNeeded();
    }
  }, [assetLoading]);

  useEffect(() => {
    if (actionSheetDataSource.length > 0) {
      this.ActionSheet.show();
    }
  }, [actionSheetDataSource]);

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
      const purchaseMapping = {
        consumable_type_mapper,
        non_consumable_type_mapper,
        subscription_type_mapper,
      };

      const resultPurchaseData = await Promise.all([
        getAccessFees(assetId),
        getAllPackages({
          clientId: in_player_client_id,
          purchaseMapping,
        }),
      ]);

      if (resultPurchaseData.length === 0) {
        throw new Error("No fees availible for current asset");
      }
      const inPlayerFeesData = retrievePurchasableItems({
        feesToSearch: resultPurchaseData[0],
        allPackagesData: resultPurchaseData[1],
        assetId,
        purchaseMapping,
      });

      const storeFeesData = await retrieveProducts(inPlayerFeesData);

      if (storeFeesData.length === 0) {
        throw new Error("No items availible in store");
      }

      mergeFeesTitlesIfNeeded({
        storeFeesData,
        inPlayerFeesData,
      });
      //Callback if no items
      console.log({ storeFeesData });
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
      assetLoading == false &&
      packageData.loading == false &&
      packageData.data
    ) {
      const actionSheetDS = prepareActionSheetDataSource(packageData.data);
      if (actionSheetDS) {
        stillMounted && setActionSheetDataSource(actionSheetDS);
      } else {
        const error = new Error("Can not create action sheet data source");
        completeAssetFlow({ success: false, error });
      }
    } else if (packageData.loading == false && packageData.error) {
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
          const error = new Error("Source for asset not exist");
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

  const onPressActionSheet = (index) => {
    if (cancelButtonIndex(actionSheetDataSource) === index) {
      completeAssetFlow({ success: false });
    } else {
      const itemToPurchase = packageData.data[index];
      buyItem(itemToPurchase);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {<LoadingScreen />}
      <ActionSheet
        ref={(o) => (this.ActionSheet = o)}
        title={"Please select item to purchase ?"}
        options={actionSheetDataSource}
        cancelButtonIndex={cancelButtonIndex(actionSheetDataSource)}
        onPress={onPressActionSheet}
      />
    </SafeAreaView>
  );
};

export default AssetFlow;
