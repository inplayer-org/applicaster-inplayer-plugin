import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import { Keyboard } from "react-native";
import { Login } from "../Login";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../Styles";
import { AssetModule } from "../../NativeModules/AssetModule";
import { PayloadUtils } from "../../Utils";
import { showAlert } from "../Utils";

const { inPlayerAssetId } = PayloadUtils;
// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

// callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void,

const styles = StyleSheet.create({
  container,
});
const AssetFlow = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { configuration, payload, assetFlowCallback } = props;
    console.log("AssetFlow Did finish");
    AssetModule.checkAccessForAsset({
      ...configuration,
      id: inPlayerAssetId(payload),
      entryId: null,
    })
      .then((itemAccess) => {
        setLoading(false);
        assetFlowCallback({ success: true, data: itemAccess, error: null });
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error catched", { error });
        showAlert({ error });
        assetFlowCallback({ success: false, data: null, error });
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
};

export default AssetFlow;
