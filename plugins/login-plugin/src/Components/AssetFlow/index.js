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
} from "./Helper";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const assetId = inPlayerAssetId(props.payload);

  const [actionSheetDataSource, setActionSheetDataSource] = useState([]);
  const [assetLoading, setAssetLoading] = useState(true);

  const [packageData, setPackageData] = useState({
    loading: true,
    error: null,
    data: null,
  });
  var stillMounted = true;

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
      configuration: { in_player_client_id },
    } = props;
    try {
      const resultPurchaseData = await Promise.all([
        getAccessFees(assetId),
        getAllPackages(in_player_client_id),
      ]);

      const purchasableItems = retrievePurchasableItems({
        feesToSearch: resultPurchaseData[0],
        allPackagesData: resultPurchaseData[1],
      });

      const purchasableItemsData = await retrieveProducts(purchasableItems);
      stillMounted &&
        setPackageData({
          loading: false,
          error: null,
          data: purchasableItemsData,
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
        invokeCallBack(props, { success: false, error });
      }
    } else if (packageData.loading == false && packageData.error) {
      invokeCallBack(props, { success: false, error: packageData.error });
    }
  };

  const loadAsset = ({ startPurchaseFlow = false }) => {
    const retryInCaseFail = startPurchaseFlow == false;
    const { payload } = props;
    checkAccessForAsset({ assetId: assetId, retryInCaseFail: retryInCaseFail })
      .then((data) => {
        const src = data?.src;

        if (data && src) {
          newPayload = src && {
            ...payload,
            content: { src },
          };
          invokeCallBack(props, { newPayload });
        } else {
          const error = new Error("Source for asset not exist");
          invokeCallBack(props, { success: false, error });
        }
      })
      .catch((error) => {
        if (error?.requestedToPurchase && startPurchaseFlow) {
          stillMounted && setAssetLoading(false);
        } else {
          invokeCallBack(props, {
            success: false,
            error: { ...error, message: error?.response?.status },
          });
        }
      });
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
        .then(() => loadAsset({ startPurchaseFlow: false }))
        .catch((error) => {
          invokeCallBack(props, { success: false, error: error });
        });
    } else {
      const error = new Error("Can not purchase, product identifier not exist");
      invokeCallBack(props, { success: false, error });
    }
  };

  const onPressActionSheet = (index) => {
    if (cancelButtonIndex(actionSheetDataSource) === index) {
      invokeCallBack(props, { success: false });
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
        title={"Please select subscription do you like to purchase ?"}
        options={actionSheetDataSource}
        cancelButtonIndex={cancelButtonIndex(actionSheetDataSource)}
        onPress={onPressActionSheet}
      />
    </SafeAreaView>
  );
};

export default AssetFlow;
