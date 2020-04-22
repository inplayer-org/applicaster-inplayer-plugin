import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import LoadingScreen from "../LoadingScreen";
import { container } from "../Styles";
import { AssetModule } from "../../NativeModules/AssetModule";
import { PaymentModule } from "../../NativeModules/PaymentModule";

import {
  inPlayerAssetId,
  retrievePurchaseProductId,
} from "../../Utils/PayloadUtils";
import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInPlayerAsset();
  }, []);

  const loadInPlayerAsset = async () => {
    const { assetFlowCallback } = props;
    try {
      const itemAccess = await checkAssetForAsset();
      setLoading(false);
      console.log({ itemAccess });
      assetFlowCallback({ success: true, data: itemAccess, error: null });
    } catch (originalError) {
      const { itemAccess, error } = await handleErrorLogic(originalError);
      setLoading(false);
      assetFlowCallback({ success: !error, data: itemAccess, error });
    }
  };

  const handleErrorLogic = async (error) => {
    const { code } = error;
    if (code === "402") {
      return await tryPurchaseItem();
    } else {
      return { error };
    }
  };

  const tryPurchaseItem = async () => {
    const { payload } = props;

    try {
      const purchaseId = retrievePurchaseProductId({ payload });
      if (purchaseId) {
        const productIdentifier = await retrieveProducts(purchaseId);
        const { reciept } = await ApplicasterIAPModule.purchase(
          productIdentifier
        );
        await PaymentModule.validate({
          receiptString: reciept,
          productIdentifier,
        });
        const { error, itemAccess } = await tryLoadLoadAssets(500);

        if (itemAccess) {
          return { itemAccess };
        } else if (error) {
          throw error;
        }
      } else {
        throw { Error: { message: "Purchase_id not exist" } };
      }
    } catch (error) {
      return { error };
    }
  };

  const tryLoadLoadAssets = async (requestDelayTime) => {
    try {
      const itemAccess = await checkAssetForAsset();
      return { itemAccess };
    } catch (error) {
      await sleep(requestDelayTime);
      const newRequestDelayTime = requestDelayTime * 2;
      if (newRequestDelayTime < 20000) {
        return await tryLoadLoadAssets(newRequestDelayTime);
      }
      return { error };
    }
  };

  const checkAssetForAsset = async () => {
    const { configuration, payload } = props;
    const assetData = await AssetModule.checkAccessForAsset({
      ...configuration,
      id: inPlayerAssetId(payload),
      entryId: null,
    });
    return assetData;
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const retrieveProducts = async (purchaseId) => {
    const { products } = await ApplicasterIAPModule.products([purchaseId]);
    const productIdentifier = R.compose(
      R.prop("productIdentifier"),
      R.head
    )(products);
    if (productIdentifier !== purchaseId) {
      throw {
        Error: {
          message: `Can not retrive products with purchase product Identifier ${purchaseId}`,
        },
      };
    }
    return productIdentifier;
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
};

export default AssetFlow;
