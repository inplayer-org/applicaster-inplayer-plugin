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
  unsubscribeNotifications,
  subscribeNotifications,
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
  const [
    purchasesingProductIdentifier,
    setPurchasesingProductIdentifier,
  ] = useState(null);
  const [assetLoading, setAssetLoading] = useState(true);
  const [packageData, setPackageData] = useState({
    loading: true,
    error: null,
    data: null,
  });
  let stillMounted = true;

  let notificationObservers = {
    onMessage: function (message) {
      console.log("subscribeNotifications onMessage", { message });
      if (message?.type === "access.granted") {
        loadAsset({ startPurchaseFlow: false }).catch((error) => {
          completeAssetFlow({ success: false, error: error });
        });
      } else {
        new Error("Can not grant access to purchased items");
        completeAssetFlow({ success: false, error: error });
      }
    },
    onOpen: function (e) {
      console.log("subscribeNotifications onOpen", { e });
    },
    onClose: function (e) {
      console.log("subscribeNotifications onClose", { e });
    },
  };
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

  useEffect(() => {
    if (purchasesingProductIdentifier) {
      const purchaseData = productIdentifier.split("_");

      purchaseAnItem({
        purchaseID: productIdentifier,
        item_id: purchaseData[0],
        access_fee_id: purchaseData[1],
      }).catch((error) => {
        completeAssetFlow({ success: false, error: error });
      });
    }
  }, [purchasesingProductIdentifier]);

  const preparePurchaseData = async () => {
    const {
      configuration: { in_player_client_id },
    } = props;
    try {
      const resultPurchaseData = await Promise.all([
        getAccessFees(assetId),
        getAllPackages(in_player_client_id),
        subscribeNotifications({
          clientId: in_player_client_id,
          callbacks: notificationObservers,
        }),
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
    checkAccessForAsset({ assetId: assetId, retryInCaseFail: retryInCaseFail })
      .then((data) => {
        console.log("LoadAsset2", { data });

        const src = data?.src;

        if (data && src) {
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
            error: { ...error, message: error?.response?.status },
          });
        }
      });
  };

  const completeAssetFlow = (completionObject) => {
    unsubscribeNotifications();
    notificationObservers = null;
    invokeCallBack(props, completionObject);
  };

  const buyItem = (itemToPurchase) => {
    const { productIdentifier } = itemToPurchase;

    if (productIdentifier) {
      setPurchasesingProductIdentifier(productIdentifier);
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
        title={"Please select subscription do you like to purchase ?"}
        options={actionSheetDataSource}
        cancelButtonIndex={cancelButtonIndex(actionSheetDataSource)}
        onPress={onPressActionSheet}
      />
    </SafeAreaView>
  );
};

export default AssetFlow;
