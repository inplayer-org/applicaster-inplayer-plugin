import React, { useState, useEffect } from "react";
import R from "ramda";
import moment from "moment";
import globalSessionManager from "../globalSessionManager";
import { Login } from "./Login";
import { showAlert } from "./Utils";

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

const parseJSON = R.tryCatch(JSON.parse, () => null);

const InPlayer = (props) => {
  const riverScreen = Object.values(props.rivers).find(
    (river) => river.type === "my-plugin-identifier"
  );

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(true);
  const ScreensData = {
    LOADING: "Loading",
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
    console.log("login", { payload });
  };
  const signUp = () => {
    console.log("SignUP");
    setScreen(ScreensData.SIGN_UP);
  };

  console.disableYellowBox = true;

  createAccount = (payload) => {
    console.log("createAccount", { payload });
  };
  const renderScreen = () => {
    console.log("renderScreen");
    if (!screen) {
      return null;
    }
    switch (screen) {
      case ScreensData.LOADING:
        return <LoadingScreen />;

      case ScreensData.LOGIN:
        return <Login login={login} signUp={signUp} />;

      case ScreensData.SIGN_UP:
        return <SignUp createAccount={createAccount} />;
    }
    return null;
  };

  return renderScreen();
};

export default InPlayer;
