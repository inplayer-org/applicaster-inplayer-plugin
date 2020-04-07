import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import { Keyboard } from "react-native";
import { Login } from "../Login";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../../Styles";
import { AssetModule } from "../NativeModules/AssetModule";
import { PaymentModule } from "../NativeModules/PaymentModule";

// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

// callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void,

const styles = StyleSheet.create({
  container,
});
const AssetFlow = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { configuration } = props;
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
