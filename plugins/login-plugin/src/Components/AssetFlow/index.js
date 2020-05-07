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
  const [loading, setLoading] = useState(true);
  const assetId = inPlayerAssetId(props.payload)

  useEffect(() => {
    const { configuration, payload } = props;

    checkAccessOrPurchaseWorkflow({ assetId: assetId })
      .finally(() => setLoading(false))
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
};

export default AssetFlow;
