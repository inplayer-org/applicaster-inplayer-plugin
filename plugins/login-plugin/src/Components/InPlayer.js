import React, { useState, useEffect } from "react";
import R, { prop } from "ramda";
import { Keyboard } from "react-native";
import moment from "moment";
import globalSessionManager from "../globalSessionManager";
import { Login } from "./Login";
import { showAlert } from "./Utils";
import { container } from "./Styles";
import { AccountModule } from "../NativeModules/AccountModule";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  NativeModules,
  TouchableOpacity,
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

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(true);
  const ScreensData = {
    LOGIN: "Login",
    SIGN_UP: "SignUp",
    FORGOT_PASSWORD: "ForgotPassword",
  };

  useEffect(() => {
    async function getLoginStatus() {
      await checkLoginStatus();
    }
    getLoginStatus();
    //TODO MAKE LOGIC FOR SCREENS AND SKIP
    setScreen(ScreensData.LOGIN);
  }, []);

  const isTokenValid = (expiresAt) => moment().diff(expiresAt, "second") < 0;

  const checkLoginStatus = async () => {
    const { callback, payload } = props;
    const loginDetails = await NativeModules.LocalStorage.getItem(
      "loginDetails",
      "dev_demo_login"
    ).catch((err) => {
      setLoading(false);
      globalSessionManager.logOut();
    });

    if (loginDetails && isTokenValid(parseJSON(loginDetails).expiresAt)) {
      callback({
        success: true,
        payload,
      });
    } else {
      setLoading(false);
      globalSessionManager.logOut();
    }
  };

  const saveLoginData = ({ token, userId, expiresAt }) => {
    NativeModules.LocalStorage.setItem(
      "loginDetails",
      JSON.stringify({ token, userId, expiresAt }),
      "dev_demo_login"
    )
      .then(console.log)
      .catch(console.log);
  };

  const createExpirationDate = (expiresIn) =>
    moment().add(expiresIn, "second").format();

  const onSuccess = (credentials) => {
    // this is the example of the logic on auth0
    // to be replaced with what inPlayer needs
    // auth0.auth
    //   .userInfo({ token: credentials.accessToken })
    //   .then(profile => {
    //     globalSessionManager.logIn(credentials);
    //     saveLoginData({
    //       token: credentials.accessToken,
    //       userId: profile.sub,
    //       expiresAt: createExpirationDate(credentials.expiresIn)
    //     });
    //   })
    //   .catch(console.err);
  };
  const login = (payload) => {
    Keyboard.dismiss();
    const { callback } = props;
    console.log("login", { payload });
    setLoading(true);
    AccountModule.authenticate(payload)
      .then((data) => {
        console.log("Authenticated", { data });
        setLoading(false);
        callback({ success: true, error: null, payload: props.payload });
      })
      .catch((e) => {
        console.log("Authentication Failed", { e });
        setLoading(false);
        const { code = -1, message = "Unknown Error" } = e;
        showAlert(
          "Error: Authentefication Failed",
          `Code:${code}, Message: ${message}`
        );
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
    console.log("createAccount", { payload });
    setLoading(true);
    const { callback } = props;
    AccountModule.signUp(payload)
      .then((data) => {
        console.log("Sign Up complete", { data, callback });
        setLoading(false);
        callback({ success: true, error: null, payload: props.payload });
      })
      .catch((e) => {
        console.log("Sign Up  Failed", { e });
        setLoading(false);
        const { code = -1, message = "Unknown Error" } = e;
        showAlert("Error: Sign Up Failed", `Code:${code}, Message: ${message}`);
      });
  };
  const renderAuthenteficationScreen = () => {
    console.log("renderScreen");
    if (!screen) {
      return null;
    }
    switch (screen) {
      case ScreensData.LOGIN:
        return <Login login={login} signUp={signUp} />;

      case ScreensData.SIGN_UP:
        return (
          <SignUp createAccount={createAccount} onSiginUpBack={onSiginUpBack} />
        );
    }
    return null;
  };

  console.log({ props });
  return (
    <SafeAreaView style={styles.container}>
      {renderAuthenteficationScreen()}
      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
};

export default InPlayer;
