import React, { useState, useEffect } from "react";
import R, { prop } from "ramda";
import { Keyboard } from "react-native";
import moment from "moment";
import globalSessionManager from "../globalSessionManager";
import { Login } from "./Login";
import { container } from "./Styles";
import { AccountModule } from "../NativeModules/AccountModule";
// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  NativeModules,
} from "react-native";
import LoadingScreen from "./LoadingScreen";
import SignUp from "./SignUp";
// callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void,

const parseJSON = R.tryCatch(JSON.parse, () => null);
const styles = StyleSheet.create({
  container,
});
const InPlayer = (props) => {
  const riverScreen = Object.values(props.rivers).find(
    (river) => river.type === "my-plugin-identifier"
  );

  const ScreensData = {
    EMPTY: "Empty",
    LOGIN: "Login",
    SIGN_UP: "SignUp",
    FORGOT_PASSWORD: "ForgotPassword",
  };
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(ScreensData.EMPTY);

  useEffect(() => {
    const { configuration } = props;
    // Check is Autheticated
    AccountModule.isAuthenticated(configuration)
      .then((isLogedIn) => {
        console.log({ isLogedIn });
        setLoading(false);
        isLogedIn == true ? onSuccess() : setScreen(ScreensData.LOGIN);
        console.log({ isLogedIn });
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const onSuccess = () => {
    const { callback } = props;
    setLoading(false);
    callback &&
      callback({ success: true, error: null, payload: props.payload });
  };

  const onFail = (error, errorMessage) => {
    const { code = -1, message = "Unknown Error" } = error;
    setLoading(false);
    this.dropDownAlertRef.alertWithType(
      "error",
      errorMessage,
      `Code:${code}, ${message}`
    );
  };

  const login = (payload) => {
    Keyboard.dismiss();
    const { configuration } = props;
    console.log("login", { payload });
    setLoading(true);
    AccountModule.authenticate({ ...payload, ...configuration })
      .then((data) => {
        console.log("Authenticated", { data });
        onSuccess();
      })
      .catch((e) => {
        onFail(e, "Error: Authentefication Failed");
      });
  };
  const signUp = () => {
    console.log("SignUP");
    setScreen(ScreensData.SIGN_UP);
  };

  const onSiginUpBack = () => {
    setScreen(ScreensData.LOGIN);
  };

  console.disableYellowBox = true;

  createAccount = (payload) => {
    Keyboard.dismiss();
    const { configuration } = this.props;
    console.log("createAccount", { ...payload, ...configuration });
    setLoading(true);
    const { callback } = props;
    AccountModule.signUp({ ...payload, ...configuration })
      .then((data) => {
        console.log("Sign Up complete", { data, callback });
        onSuccess();
      })
      .catch((e) => {
        onFail(e, "Error: Error: Sign Up Failed");
      });
  };

  onLoginError = ({ title, message }) => {
    this.dropDownAlertRef.alertWithType("warn", title, message);
  };

  onSignUpError = ({ title, message }) => {
    this.dropDownAlertRef.alertWithType("warn", title, message);
  };
  const renderAuthenteficationScreen = () => {
    console.log("renderScreen");
    if (!screen) {
      return null;
    }
    switch (screen) {
      case ScreensData.LOGIN:
        return (
          <Login login={login} signUp={signUp} onLoginError={onLoginError} />
        );

      case ScreensData.SIGN_UP:
        return (
          <SignUp
            createAccount={createAccount}
            onSiginUpBack={onSiginUpBack}
            onSignUpError={onSignUpError}
          />
        );
    }
    return null;
  };

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

export default InPlayer;
