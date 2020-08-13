import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { Keyboard } from "react-native";
// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

import ParentLockPlugin from "@applicaster/quick-brick-parent-lock";
import { Login } from "../Login";
import { ForgotPassword } from "../ForgotPassword";
import { SetNewPassword } from "../SetNewPassword";
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
    SET_NEW_PASSWORD: "SetNewPassword",
    PARENT_LOCK: "ParentLock",
  };
  let stillMounted = true;

  const {
    configuration: {
      in_player_client_id: clientId,
      in_player_referrer: referrer,
    },
    accountFlowCallback,
  } = props;

  const { shouldShowParentLock } = props;
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(ScreensData.EMPTY);
  const [lastEmailUsed, setLastEmailUsed] = useState(null);

  useEffect(() => {
    InPlayerService.isAuthenticated(clientId)
      .then(async (isAuthenticated) => {
        if (stillMounted) {
          if (isAuthenticated) {
            accountFlowCallback({ success: true });
          } else {
            if (
              shouldShowParentLock &&
              shouldShowParentLock(props.parentLockWasPresented)
            ) {
              presentParentLock();
            } else {
              await authenticateUser();
            }
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

  const authenticateUser = async () => {
    setLastEmailUsed((await InPlayerService.getLastEmailUsed()) || null);
    setScreen(ScreensData.LOGIN);
  };

  const presentParentLock = () => {
    setScreen(ScreensData.PARENT_LOCK);
    props.setParentLockWasPresented(true);
  };

  const parentLockCallback = async (result) => {
    if (result.success) {
      await authenticateUser();
    } else {
      accountFlowCallback({ success: false });
    }
  };

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
    stillMounted && setLoading(true);
    InPlayerService.login({
      email,
      password,
      clientId,
      referrer,
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
    stillMounted && setLoading(true);
    InPlayerService.signUp({
      fullName,
      email,
      password,
      clientId,
      referrer,
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

  const setNewPasswordCallback = ({ password, token }) => {
    Keyboard.dismiss();
    if (token && password) {
      stillMounted && setLoading(true);
      InPlayerService.setNewPassword({
        password,
        token,
      })
        .then(() => {
          showAlertToUser({
            title: "Set New Password Success",
            message: "Your password was successfully updated",
            type: "success",
          });
          stillMounted && setLoading(false);
          stillMounted && setScreen(ScreensData.LOGIN);
        })
        .catch((error) => {
          stillMounted && setLoading(false);

          showAlertToUser({
            title: "Set New Password",
            message: "New password could not be set. Please try again.",
          });
        });
    } else {
      stillMounted && setScreen(ScreensData.FORGOT_PASSWORD);
    }
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
          showAlertToUser({
            title: "Request Password Success",
            message,
            type: "success",
          });
          stillMounted && setLoading(false);
          stillMounted && setScreen(ScreensData.SET_NEW_PASSWORD);
        })
        .catch((error) => {
          stillMounted && setLoading(false);
          showAlertToUser({
            title: "Request Password Fail",
            message: "Can not request password",
          });
          console.error(error);
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
      case ScreensData.SET_NEW_PASSWORD:
        return (
          <SetNewPassword
            setNewPasswordCallback={setNewPasswordCallback}
            onBackButton={() => {
              stillMounted && setScreen(ScreensData.FORGOT_PASSWORD);
            }}
            onError={showAlertToUser}
            {...props}
          />
        );
    }
    return null;
  };

  const { screenStyles } = props;

  if (screen === ScreensData.PARENT_LOCK) {
    return <ParentLockPlugin.Component callback={parentLockCallback} />;
  }
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
