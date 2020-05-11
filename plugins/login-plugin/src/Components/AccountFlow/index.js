import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import { Keyboard } from "react-native";
// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

import { Login } from "../Login";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../Styles";
import * as InPlayerService from "../../Services/inPlayerService";
import { inspect } from "../../Utils";

const styles = StyleSheet.create({
  container,
});
const AccountFlow = (props) => {
  const ScreensData = {
    EMPTY: "Empty",
    LOGIN: "Login",
    SIGN_UP: "SignUp",
    FORGOT_PASSWORD: "ForgotPassword",
  };

  const { accountFlowCallback } = props;

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(ScreensData.EMPTY);
  const [lastEmailUsed, setLastEmailUsed] = useState(null);

  useEffect(() => {
    const { configuration } = props;
    let stillMounted = true;
    InPlayerService.setConfig("develop");
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
        if (stillMounted) setLoading(false);
      });
    return () => {
      stillMounted = false;
    };
  }, []);

  const showAlertToUser = ({ title, message }) => {
    this.dropDownAlertRef.alertWithType("warn", title, message);
  };

  const maybeShowAlertToUser = (title) => async (error) => {
    const { response } = error;
    if (response && response.status >= 400 && response.status < 500) {
      const json = await error.response.json();
      showAlertToUser({ title, message: json.message });
    } else {
      throw error;
    }
  };

  const login = ({ email, password } = params) => {
    Keyboard.dismiss();
    const {
      configuration: { in_player_client_id, in_player_referrer },
    } = props;
    setLoading(true);
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
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createAccount = ({ fullName, email, password } = params) => {
    Keyboard.dismiss();
    const {
      configuration: { in_player_client_id, in_player_referrer },
    } = props;
    setLoading(true);
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
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderAuthenteficationScreen = () => {
    switch (screen) {
      case ScreensData.LOGIN:
        return (
          <Login
            initialEmail={lastEmailUsed}
            login={login}
            signUp={() => {
              setScreen(ScreensData.SIGN_UP);
            }}
            onLoginError={showAlertToUser}
            {...props}
          />
        );

      case ScreensData.SIGN_UP:
        return (
          <SignUp
            createAccount={createAccount}
            onSiginUpBack={() => {
              setScreen(ScreensData.LOGIN);
            }}
            onSignUpError={showAlertToUser}
            {...props}
          />
        );
    }
    return null;
  };

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

export default AccountFlow;
