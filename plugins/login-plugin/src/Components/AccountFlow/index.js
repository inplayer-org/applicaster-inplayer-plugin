import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import { Keyboard } from "react-native";
// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

import { Login } from "../Login";
import { ForgotPassword } from "../ForgotPassword";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../Styles";
import * as InPlayerService from "../../Services/inPlayerService";

const containerStyle = (screenStyles) => {
  return {
    ...container,
    backgroundColor: screenStyles?.background_color,
  };
};

const AccountFlow = (props) => {
  const ScreensData = {
    EMPTY: "Empty",
    LOGIN: "Login",
    SIGN_UP: "SignUp",
    FORGOT_PASSWORD: "ForgotPassword",
  };
  let stillMounted = true;

  const { accountFlowCallback } = props;

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(ScreensData.EMPTY);
  const [lastEmailUsed, setLastEmailUsed] = useState(null);

  useEffect(() => {
    InPlayerService.isAuthenticated()
      .then(async (isAuthenticated) => {
        console.debug("InPlayerService.isAuthenticated", isAuthenticated);
        if (stillMounted) {
          if (isAuthenticated) {
            accountFlowCallback({ success: true });
          } else {
            setLastEmailUsed(await InPlayerService.getLastEmailUsed());
            setScreen(ScreensData.LOGIN);
          }
        }
      })
      .finally(() => {
        stillMounted && setLoading(false);
      });
    return () => {
      stillMounted = false;
    };
  }, []);

  const showAlertToUser = ({ title, message, type = "warn" }) => {
    this.dropDownAlertRef.alertWithType(type, title, message);
  };

  const maybeShowAlertToUser = (title) => async (error) => {
    const { response } = error;
    if (response && response.status >= 400 && response.status < 500) {
      const json = await error.response.json();
      showAlertToUser({ title, message: json.message });
      stillMounted && setLoading(false);
    } else {
      throw error;
    }
  };

  const login = ({ email, password } = params) => {
    Keyboard.dismiss();
    const {
      configuration: { in_player_client_id, in_player_referrer },
    } = props;
    stillMounted && setLoading(true);
    InPlayerService.login({
      email,
      password,
      clientId: in_player_client_id,
      referrer: in_player_referrer,
    })
      .then(() => {
        accountFlowCallback({ success: true });
      })
      .catch(maybeShowAlertToUser("Login failed"))
      .catch((error) => {
        stillMounted && setLoading(false);
        console.error(error);
      });
  };

  const createAccount = ({ fullName, email, password } = params) => {
    Keyboard.dismiss();
    const {
      configuration: { in_player_client_id, in_player_referrer },
    } = props;
    stillMounted && setLoading(true);
    InPlayerService.signUp({
      fullName,
      email,
      password,
      clientId: in_player_client_id,
      referrer: in_player_referrer,
    })
      .then(() => {
        accountFlowCallback({ success: true });
      })
      .catch(maybeShowAlertToUser("Sign-up failed"))
      .catch((error) => {
        stillMounted && setLoading(false);
        console.error(error);
      });
  };

  const forgotPasswordFlowCallback = ({ email }) => {
    Keyboard.dismiss();
    const {
      configuration: { in_player_client_id },
    } = props;
    if (email) {
      stillMounted && setLoading(true);
      InPlayerService.requestPassword({ email, clientId: in_player_client_id })
        .then((result) => {
          const { message } = result;
          console.log(result);
          console.log(result);

          showAlertToUser({
            title: "Request Password Complete",
            message,
            type: "success",
          });
        })
        .catch((error) => {
          stillMounted && setLoading(false);
          showAlertToUser({
            title: "Request Password Complete",
            message: "Can not request password",
          });
          console.error(error);
        })
        .finally(() => {
          stillMounted && setLoading(false);
          stillMounted && setScreen(ScreensData.LOGIN);
        });
    } else {
      stillMounted && setScreen(ScreensData.LOGIN);
    }
  };

  const onPresentForgotPasswordScreen = () => {
    stillMounted && setScreen(ScreensData.FORGOT_PASSWORD);
  };

  const renderAuthenteficationScreen = () => {
    console.log("Render Screen:", screen);
    switch (screen) {
      case ScreensData.LOGIN:
        return (
          <Login
            initialEmail={lastEmailUsed}
            login={login}
            signUp={() => {
              stillMounted && setScreen(ScreensData.SIGN_UP);
            }}
            onPresentForgotPasswordScreen={onPresentForgotPasswordScreen}
            onLoginError={showAlertToUser}
            {...props}
          />
        );

      case ScreensData.SIGN_UP:
        return (
          <SignUp
            createAccount={createAccount}
            onBackButton={() => {
              stillMounted && setScreen(ScreensData.LOGIN);
            }}
            onSignUpError={showAlertToUser}
            {...props}
          />
        );
      case ScreensData.FORGOT_PASSWORD:
        return (
          <ForgotPassword
            forgotPasswordFlowCallback={forgotPasswordFlowCallback}
            onBackButton={() => {
              stillMounted && setScreen(ScreensData.LOGIN);
            }}
            onError={showAlertToUser}
            {...props}
          />
        );
    }
    return null;
  };

  const { screenStyles } = props;
  return (
    <View style={containerStyle(screenStyles)}>
      <SafeAreaView style={container}>
        {renderAuthenteficationScreen()}
        {loading && <LoadingScreen />}
      </SafeAreaView>
      <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
    </View>
  );
};

export default AccountFlow;
