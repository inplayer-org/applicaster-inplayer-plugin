import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import { Keyboard } from "react-native";
import { Login } from "../Login";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../Styles";
import { AssetModule } from "../../NativeModules/AssetModule";
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
    console.log("I am in AssetFlow", AssetModule);

    const inPlayerAssetId = R.path(["extensions", "inplayer_asset_id"])(
      payload
    );
    console.log("Params to path", {
      ...configuration,
      id: inPlayerAssetId,
      entryId: null,
    });

    AssetModule.checkAccessForAsset({
      ...configuration,
      id: inPlayerAssetId,
      entryId: null,
    })
      .then((itemAccess) => {
        setLoading(false);
        assetFlowCallback({ success: true, data: itemAccess });
      })
      .catch((error) => {
        console.log({ error, assetFlowCallback });
        const { code = -1, message = "Unknown Error" } = error;
        setLoading(false);
        this.dropDownAlertRef.alertWithType(
          "error",
          "Unable to retrieve Asset",
          `Code:${code}, ${message}`
        );
        assetFlowCallback({ success: false, data: null });
      });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {loading && <LoadingScreen />}
      </SafeAreaView>
      <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
    </View>
  );
};

export default AssetFlow;
