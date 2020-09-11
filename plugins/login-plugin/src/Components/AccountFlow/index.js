import React, { useState, useLayoutEffect } from "react";
import { View, SafeAreaView, Keyboard, Platform } from "react-native";
// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

import ParentLockPlugin from "@applicaster/quick-brick-parent-lock";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";
import SetNewPassword from "../SetNewPassword";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../Styles";
import * as InPlayerService from "../../Services/inPlayerService";
import { showAlert } from "../../Utils/Account";
import { createLogger, Subsystems } from "../../Services/LoggerService";
import { XRayLogLevel } from "@applicaster/quick-brick-xray/src/logLevels";
import { logger as rootLogger } from "../../Components/InPlayer";
import { isWebBasedPlatform } from "../../Utils/Platform";

export const logger = createLogger({
  subsystem: Subsystems.ACCOUNT,
  category: "",
  parent: rootLogger,
});

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

  useLayoutEffect(() => {
    InPlayerService.isAuthenticated(clientId)
      .then(async (isAuthenticated) => {
        let eventMessage = "Account Flow:";
        const event = logger
          .createEvent()
          .setLevel(XRayLogLevel.debug)
          .addData({ is_authenticated: isAuthenticated });

        if (stillMounted) {
          if (isAuthenticated) {
            eventMessage = `${eventMessage} access granted, flow completed`;
            accountFlowCallback({ success: true });
          } else {
            if (
              shouldShowParentLock &&
              shouldShowParentLock(props.parentLockWasPresented)
            ) {
              eventMessage = `${eventMessage} not granted, present parent lock`;
              presentParentLock();
            } else {
              eventMessage = `${eventMessage} not granted, present login screen`;
              await authenticateUser();
            }
          }
        }
        event.setMessage(eventMessage).send();
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
    const success = result.success;
    let eventMessage = "Parent lock finished";

    logger.createEvent().setLevel(XRayLogLevel.debug).addData({ success });

    if (success) {
      eventMessage = `${eventMessage}, no access presenting login screen`;
      await authenticateUser();
    } else {
      accountFlowCallback({ success: false });
    }
    event.setMessage(eventMessage).send();
  };

  const showAlertToUser = ({ title, message, type = "warn" }) => {
    logger
      .createEvent()
      .setLevel(XRayLogLevel.info)
      .setMessage(
        `Aller will be presented for user title: ${title}, message: ${message}, type: ${type}`
      )
      .addData({ title, message, type })
      .send();
    Platform.isTV
      ? showAlert(title, message)
      : this.dropDownAlertRef.alertWithType(type, title, message);
  };

  const maybeShowAlertToUser = (title) => async (error) => {
    const { response } = error;
    if (response && response.status >= 400 && response.status < 500) {
      const json = await error.response.json();
      showAlertToUser({ title, message: json.message });
      stillMounted && setLoading(false);
    } else {
      logger
        .createEvent()
        .setLevel(XRayLogLevel.info)
        .setMessage(`Error: ${error}`)
        .attachError(error)
        .send();
      throw error;
    }
  };

  const login = ({ email, password } = params) => {
    Keyboard.dismiss();
    stillMounted && setLoading(true);
    logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .setMessage(
        `Perform Login In task, email: ${email}, password: ${password}`
      )
      .addData({ email, password })
      .send();

    InPlayerService.login({
      email,
      password,
      clientId,
      referrer,
    })
      .then(() => {
        logger
          .createEvent()
          .setLevel(XRayLogLevel.debug)
          .setMessage(`Login succeed, email: ${email}, password: ${password}`)
          .addData({ email, password })
          .send();
        accountFlowCallback({ success: true });
      })
      .catch(maybeShowAlertToUser("Login failed"))
      .catch((error) => {
        logger
          .createEvent()
          .setLevel(XRayLogLevel.error)
          .setMessage(`Login failed, email: ${email}, password: ${password}`)
          .attachError(error)
          .addData({ email, password })
          .send();
        stillMounted && setLoading(false);
      });
  };

  const createAccount = ({ fullName, email, password } = params) => {
    Keyboard.dismiss();
    stillMounted && setLoading(true);

    logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .setMessage(
        `Perform Create Account task, email: ${email}, password: ${password}`
      )
      .addData({ email, password })
      .send();

    InPlayerService.signUp({
      fullName,
      email,
      password,
      clientId,
      referrer,
    })
      .then(() => {
        logger
          .createEvent()
          .setLevel(XRayLogLevel.debug)
          .setMessage(
            `Account Creation succeed, fullName: ${fullName}, email: ${email}, password: ${password}`
          )
          .addData({ email, password, fullName })
          .send();
        accountFlowCallback({ success: true });
      })
      .catch(maybeShowAlertToUser("Sign-up failed"))
      .catch((error) => {
        logger
          .createEvent()
          .setLevel(XRayLogLevel.error)
          .setMessage(
            `Account Creation failed, fullName: ${fullName}, email: ${email}, password: ${password}`
          )
          .attachError(error)
          .addData({ email, password, fullName })
          .send();
        stillMounted && setLoading(false);
      });
  };

  const setNewPasswordCallback = ({ password, token }) => {
    Keyboard.dismiss();

    logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .setMessage(
        `Set new password task, password: ${password}, token: ${token}`
      )
      .addData({ token, password })
      .send();

    if (token && password) {
      stillMounted && setLoading(true);
      InPlayerService.setNewPassword({
        password,
        token,
      })
        .then(() => {
          logger
            .createEvent()
            .setLevel(XRayLogLevel.debug)
            .setMessage(
              `Set new password task succeed, password: ${password}, token: ${token}`
            )
            .addData({ password, token })
            .send();
          showAlertToUser({
            title: "Set New Password Success",
            message: "Your password was successfully updated",
            type: "success",
          });
          stillMounted && setLoading(false);
          stillMounted && setScreen(ScreensData.LOGIN);
        })
        .catch((error) => {
          logger
            .createEvent()
            .setLevel(XRayLogLevel.error)
            .setMessage(
              `Set new password task failed, password: ${password}, token: ${token}`
            )
            .attachError(error)
            .addData({ password, token })
            .send();

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

    logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .setMessage(`Request password change task, email: ${email}`)
      .addData({ email })
      .send();

    if (email) {
      stillMounted && setLoading(true);
      InPlayerService.requestPassword({ email, clientId: in_player_client_id })
        .then((result) => {
          const { message } = result;
          logger
            .createEvent()
            .setLevel(XRayLogLevel.debug)
            .setMessage(`Request password change task, email: ${email}`)
            .addData({ email })
            .send();
          showAlertToUser({
            title: "Request Password Success",
            message,
            type: "success",
          });
          stillMounted && setLoading(false);
          stillMounted && setScreen(ScreensData.SET_NEW_PASSWORD);
        })
        .catch((error) => {
          logger
            .createEvent()
            .setLevel(XRayLogLevel.error)
            .setMessage(`Request password change task failed, email: ${email}`)
            .attachError(error)
            .addData({ email })
            .send();
          stillMounted && setLoading(false);
          showAlertToUser({
            title: "Request Password Fail",
            message: "Can not request password",
          });
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

  const SafeArea = Platform.isTV ? View : SafeAreaView;

  return (
    <View style={containerStyle(screenStyles)}>
      <SafeArea style={container}>
        {renderAuthenteficationScreen()}
        {loading && <LoadingScreen />}
      </SafeArea>
      {!Platform.isTV && !isWebBasedPlatform && (
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
      )}
    </View>
  );
};

export default AccountFlow;
