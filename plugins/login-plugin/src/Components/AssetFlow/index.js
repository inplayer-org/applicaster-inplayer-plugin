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
    loadAssetAccessFees();
  }, []);

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

  const searchPurchaseData = () => {
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
      invokeCallBack(props, { success: false, error });
    }
  };

  const loadAssetAccessFees = () => {
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
    const { payload } = props;
    checkAccessForAsset({ assetId: assetId })
      .then(({ data, requesetedToPurchase }) => {
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
          invokeCallBack(props, { newPayload });
        } else {
          invokeCallBack(props, { success: false, error: unknownError });
        }
      })
      .catch((error) => {
        invokeCallBack(props, { success: false, error });
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

  const onPressActionSheet = (index) => {
    if (index === 2) {
      invokeCallBack(props, { success: false });
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
          cancelButtonIndex={cancelButtonIndex()}
          onPress={onPressActionSheet}
        />
      )}
    </SafeAreaView>
  );
};

export default AssetFlow;
