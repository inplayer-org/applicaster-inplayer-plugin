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
import { inPlayerAssetId } from "../../Utils/PayloadUtils";

const styles = StyleSheet.create({
  container,
});

const unknownError = {
  message: "Unknown Error",
};

const AssetFlow = (props) => {
  const [allPackagesData, setAllPackagesData] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [assetAccessFees, setAssetAccessFees] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [userRequest, setUserRequest] = useState({
    loading: true,
    purchasing: true,
  });

  const [purchasesData, setPurchasesData] = useState({
    purchaseDataSource: [],
    actionSheetDataSource: [],
  });

  const assetId = inPlayerAssetId(props.payload);
  useEffect(() => {
    loadAsset();
    prepareAllPackagesData();
    loadAccessFees();
  }, []);

  useEffect(() => {
    if (purchasesData.actionSheetDataSource.length > 0) {
      this.ActionSheet.show();
    }
  }, [purchasesData]);

  useEffect(() => {
    console.log("Importand states", {
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
        const { assetFlowCallback, payload } = props;

        assetFlowCallback &&
          assetFlowCallback({
            success: false,
            error: unknownError,
            payload: payload,
          });
      }
    }
  }, [allPackagesData, assetAccessFees, userRequest]);

  const searchPurchaseData = () => {
    console.log("searchPurchaseData");
    const dataToPurchase = retrievePurchasableItems({
      feesToSearch: assetAccessFees.data,
      allPackagesData: allPackagesData.data,
    });
    const actionSheetDS = prepareActionSheetDataSource(dataToPurchase);
    if (dataToPurchase && actionSheetDS) {
      setPurchasesData({
        purchaseDataSource: dataToPurchase,
        actionSheetDataSource: actionSheetDS,
      });
    } else {
      const { payload, assetFlowCallback } = props;

      assetFlowCallback &&
        assetFlowCallback({
          success: false,
          error,
          payload: payload,
        });
    }
  };

  const loadAccessFees = () => {
    getAccessFees(assetId)
      .then((data) => {
        setAssetAccessFees({
          data: data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        setAssetAccessFees({
          data: null,
          loading: false,
          error: error,
        });
      });
  };

  const loadAsset = () => {
    //combinePayload
    const { configuration, payload, assetFlowCallback } = props;
    checkAccessForAsset({ assetId: assetId })
      .then(({ data, requesetedToPurchase }) => {
        var success = true;
        var error = null;
        var newPayload = payload;
        const src = data?.src;

        if (requesetedToPurchase) {
          setUserRequest({
            loading: true,
            purchasing: true,
          });
        } else if (data && src) {
          newPayload = src && {
            ...payload,
            content: { src },
          };
          assetFlowCallback &&
            assetFlowCallback({
              success,
              error,
              payload: newPayload,
            });
        } else {
          success = false;
          error = unknownError;
          assetFlowCallback &&
            assetFlowCallback({
              success,
              error,
              payload: newPayload,
            });
        }
        console.log("checkAccessForAsset", {
          success,
          error,
          payload: newPayload,
        });
      })
      .catch((error) => {
        console.log("checkAccessForAsset:Error", {
          success,
          error,
          payload: newPayload,
        });
        assetFlowCallback &&
          assetFlowCallback({
            success: false,
            error,
            payload: payload,
          });
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
      .catch((error) => {
        setAllPackagesData({
          data: null,
          loading: false,
          error,
        });
      });
  };

  const prepareActionSheetDataSource = (data) => {
    console.log("prepareActionSheetDataSource", { data });
    var actionSheetDataSource = data.map((item) => {
      return `${item.description}: ${item.amount} ${item.currency}`;
    });
    actionSheetDataSource.push("Cancel");
    return actionSheetDataSource;
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
  const { purchaseDataSource, actionSheetDataSource } = purchasesData;

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
