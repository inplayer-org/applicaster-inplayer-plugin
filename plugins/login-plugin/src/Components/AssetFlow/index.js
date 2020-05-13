import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import ActionSheet from "react-native-actionsheet";
import LoadingScreen from "../LoadingScreen";
import { container } from "../Styles";
import {
  checkAccessOrPurchaseWorkflow,
  retrievePurchasableItems,
  checkAccessForAsset,
} from "../../Services/inPlayerService";
import { inPlayerAssetId } from "../../Utils/PayloadUtils";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const [allPackagesData, setAllPackagesData] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [userRequest, setUserRequest] = useState({
    loading: true,
    purchasing: true,
  });

  const [subscriptionData, setSubscriptionData] = useState({
    purchaseDataSource: [],
    actionSheetDataSource: [],
  });

  const assetId = inPlayerAssetId(props.payload);
  useEffect(() => {
    const { configuration, payload, assetFlowCallback } = props;
    prepareAllPackagesData();
    loadAsset()
  }, []);

  useEffect(() => {
    if (subscriptionData.actionSheetDataSource.length > 0) {
      this.ActionSheet.show();
    }
  }, [subscriptionData]);


  const loadAsset = () => {
    //combinePayload
    checkAccessForAsset({ assetId: assetId })
      .then(({ data, requesetedToPurchase }) => ({
        data: data,
        requesetedToPurchase: requesetedToPurchase,
      }))
      .catch((error) => ({ error }))
      .finally(({ error, data, requesetedToPurchase }) => {
        console.log("Finally!", { error, data, requesetedToPurchase });
        if (requesetedToPurchase === false) {
          assetFlowCallback({ success: !error || !data.src, data, error });
        } else {
          getPurchasableItems();
        }
      });
  };
  const prepareAllPackagesData = () => {
    const {
      configuration: { in_player_client_id },
    } = props;
    getAllPackages(in_player_client_id)
      .then((data) => {
        setAllPackagesData({
          data: data,
          loading: false,
          error: null,
        });
      })
      .throw((error) => {
        setAllPackagesData({
          data: null,
          loading: false,
          error,
        });
      });
  };

  const getPurchasableItems = () => {
    retrievePurchasableItems({ assetId: assetId })
      .then(prepareActionSheetDataSource)
      .then((data) => {
        console.log({ data });
        // this.ActionSheet.show();
        setSubscriptionData(data);
      });
  };
  const prepareActionSheetDataSource = (data) => {
    console.log("prepareActionSheetDataSource", { data });
    var actionSheetDataSource = data.map((item) => {
      return `${item.description}: ${item.amount} ${item.currency}`;
    });
    actionSheetDataSource.push("Cancel");
    return {
      purchaseDataSource: data,
      actionSheetDataSource,
    };
  };

  const onPressActionSheet = (index) => {
    const { assetFlowCallback } = props;
    if (index === 2) {
      assetFlowCallback({ success: false, data: null, error: null });
    }
  };
  // useEffect(() => {
  //   if (userRequest.purchasing === true) {
  //   }
  // }, [userRequest]);

  const { loading, purchasing } = userRequest;
  const { purchaseDataSource, actionSheetDataSource } = subscriptionData;

  console.log({
    loading,
    purchasing,
    purchaseDataSource,
    actionSheetDataSource,
  });
  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen />}
      {purchasing && (
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={"Please select subscription do you like to purchase ?"}
          options={actionSheetDataSource}
          cancelButtonIndex={2}
          onPress={onPressActionSheet}
        />
      )}
    </SafeAreaView>
  );
};

export default AssetFlow;
