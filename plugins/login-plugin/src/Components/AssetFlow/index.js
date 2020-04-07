import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import { Keyboard } from "react-native";
import { Login } from "../Login";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../Styles";
import { AssetModule } from "../../NativeModules/AssetModule";
import { PaymentModule } from "../../NativeModules/PaymentModule";

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
    AssetModule.checkAccessForAsset({ ...configuration, payload })
      .then((itemAccess) => {
        setLoading(false);
        assetFlowCallback({ success: true, data: itemAccess });
      })
      .catch((error) => {
        console.log({ error });
        const { code = -1, message = "Unknown Error" } = error;
        setLoading(false);
        assetFlowCallback({ success: false, data: itemAccess });
        this.dropDownAlertRef.alertWithType(
          "error",
          errorMessage,
          `Code:${code}, ${message}`
        );
        // const { code } = err;
        // check if error code 402 which means it requires payment
        // if (code === 402) {
        //     //TODO: Decide where will be purchases
        // }
      });
  }, []);

  console.log({ props, AccountModule });
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {renderAuthenteficationScreen()}
        {loading && <LoadingScreen />}
      </SafeAreaView>
      <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
    </View>
  );
};

export default AssetFlow;
