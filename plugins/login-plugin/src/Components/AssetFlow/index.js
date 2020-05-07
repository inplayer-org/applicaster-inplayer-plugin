import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";

import LoadingScreen from "../LoadingScreen";
import { container } from "../Styles";
import { checkAccessOrPurchaseWorkflow } from "../../Services/inPlayerService";
import { inPlayerAssetId } from "../../Utils/PayloadUtils";

const styles = StyleSheet.create({
  container,
});

const AssetFlow = (props) => {
  const assetId = inPlayerAssetId(props.payload);
  useEffect(() => {
    const { configuration, payload, assetFlowCallback } = props;

    checkAccessOrPurchaseWorkflow({ assetId: assetId })
      .then((result) => ({ data: result }))
      .catch((error) => ({ error }))
      .finally(({ error, data }) => {
        assetFlowCallback({ success: !error || !data.src, data, error });
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen />
    </SafeAreaView>
  );
};

export default AssetFlow;
