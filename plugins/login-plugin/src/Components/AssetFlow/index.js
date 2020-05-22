import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
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
  unknownError,
} from "./Helper";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const [userRequest, setUserRequest] = useState({
    loading: true,
    purchasing: false,
  });

  const [purchasesData, setPurchasesData] = useState({
    purchaseDataSource: [],
    actionSheetDataSource: [],
  });

  const assetId = inPlayerAssetId(props.payload);
  useEffect(() => {
    loadAsset({ startPurchaseFlow: true });
    preparePurchaseData();
  }, []);

  const preparePurchaseData = async () => {
    const {
      configuration: { in_player_client_id },
    } = props;
    const resultPurchaseData = await Promise.all([
      getAccessFees(assetId),
      getAllPackages(in_player_client_id),
    ]);

    console.log("Promise Reuslt", { preparePurchaseData });

    const purchasableItems = retrievePurchasableItems({
      feesToSearch: resultPurchaseData[0],
      allPackagesData: resultPurchaseData[1],
    });

    console.log({ purchasableItems });
    const purchasableItemsData = await retrieveProducts(purchasableItems);

    console.log({ purchasableItemsData });
  };

  useEffect(() => {
    if (purchasesData.actionSheetDataSource.length > 0) {
      this.ActionSheet.show();
    }
  }, [purchasesData]);

  useEffect(() => {
    console.log("General States", {
      allPackagesData,
      assetAccessFees,
      userRequest,
    });
    if (userRequest.purchasing === true) {
      if (allPackagesData.data && assetAccessFees.data) {
        searchPurchaseData();
      } else if (allPackagesData.loading || assetAccessFees.loading) {
        console.debug("Continue Flow waiting until all items finish load");
      } else {
        invokeCallBack(props, { success: false, error: unknownError });
      }
    }
  }, [allPackagesData, assetAccessFees, userRequest]);

  const searchPurchaseData = async () => {
    const dataToPurchase = retrievePurchasableItems({
      feesToSearch: assetAccessFees.data,
      allPackagesData: allPackagesData.data,
    });
    const purchasableItems = R.map(R.prop("purchase_id"))(dataToPurchase);

    const actionSheetDS = prepareActionSheetDataSource(dataToPurchase);
    console.log({
      dataToPurchase,
      purchasableItems,
      actionSheetDS,
      dataToPurchase,
    });

    const data = await retrieveProducts(purchasableItems);

    console.log({ data });
    if (dataToPurchase && actionSheetDS) {
      setPurchasesData({
        purchaseDataSource: dataToPurchase,
        actionSheetDataSource: actionSheetDS,
      });
    } else {
      invokeCallBack(props, { success: false, error });
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
          invokeCallBack(props, { success: false, error: unknownError });
        }
      })
      .catch((error) => {
        if (error?.requestedToPurchase && startPurchaseFlow) {
          setUserRequest({
            loading: true,
            purchasing: true,
          });
        } else {
          invokeCallBack(props, {
            success: false,
            error: { ...error, message: error?.response?.status },
          });
        }
      });
  };

  const buyItem = (itemToPurchase) => {
    const { purchase_id, id, package_id } = itemToPurchase;

    if (itemToPurchase?.purchase_id) {
      purchaseAnItem({
        purchaseID: purchase_id,
        item_id: package_id,
        access_fee_id: id,
      })
        .then(() => loadAsset({ startPurchaseFlow: false }))
        .catch((error) => {
          invokeCallBack(props, { success: false, error: error });
        });
    } else {
      //TODO: Add proper error handler
      invokeCallBack(props, { success: false, error: unknownError });
    }
  };

  const onPressActionSheet = (index) => {
    if (index === 2) {
      invokeCallBack(props, { success: false });
    } else {
      const itemToPurchase = purchaseDataSource[index];
      buyItem(itemToPurchase);
    }
  };

  const { loading, purchasing } = userRequest;
  const { purchaseDataSource, actionSheetDataSource } = purchasesData;

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen />}
      {purchasing && (
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={"Please select subscription do you like to purchase ?"}
          options={actionSheetDataSource}
          cancelButtonIndex={cancelButtonIndex(actionSheetDataSource)}
          onPress={onPressActionSheet}
        />
      )}
    </SafeAreaView>
  );
};

export default AssetFlow;
