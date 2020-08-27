import React, { useState, useLayoutEffect } from "react";

import AccountFlow from "./AccountFlow";
import AssetFlow from "./AssetFlow";
import LogoutFlow from "./LogoutFlow";
import R, { prop } from "ramda";

import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { localStorage as defaultStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import { initFromNativeLocalStorage } from "../LocalStorageHack";
import {
  isVideoEntry,
  inPlayerAssetId,
  isAuthenticationRequired,
} from "../Utils/PayloadUtils";
import { showAlert } from "../Utils/Account";
import { setConfig } from "../Services/inPlayerService";
import {
  getStyles,
  isHomeScreen,
  getMessageOrDefault,
} from "../Utils/Customization";
import { isHook, isTokenInStorage } from "../Utils/UserAccount";
import {
  createLogger,
  BaseSubsystem,
  BaseCategories,
} from "../Services/LoggerService";
import { XRayLogLevel } from "@applicaster/quick-brick-xray/src/logLevels";

export const logger = createLogger({
  subsystem: BaseSubsystem,
  category: BaseCategories.GENERAL,
});

const getScreenStyles = R.compose(
  R.prop("styles"),
  R.find(R.propEq("type", "quick-brick-inplayer")),
  R.values,
  R.prop("rivers")
);

const InPlayer = (props) => {
  const HookTypeData = {
    UNDEFINED: "Undefined",
    PLAYER_HOOK: "PlayerHook",
    SCREEN_HOOK: "ScreenHook",
    USER_ACCOUNT: "UserAccount",
  };

  const navigator = useNavigation();
  const [parentLockWasPresented, setParentLockWasPresented] = useState(false);
  const [idToken, setIdtoken] = useState(null);
  const [hookType, setHookType] = useState(HookTypeData.UNDEFINED);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { callback, payload } = props;
  const screenStyles = getStyles(getScreenStyles(props));
  const { import_parent_lock: showParentLock } = screenStyles;
  let stillMounted = true;

  useLayoutEffect(() => {
    setupEnviroment();
  }, []);

  const checkIdToken = async () => {
    const token = await isTokenInStorage("idToken");

    logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .setMessage(`User token is in local storage: ${token}`)
      .addData({ token_exists: token })
      .send();

    setIdtoken(token);
  };

  const setupEnviroment = async () => {
    const {
      configuration: { in_player_environment },
    } = props;
    logger.addContext({ configuration: props.configuration, payload });

    logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .setMessage(`Starting InPlayer Plugin`)
      .addData({ in_player_environment })
      .send();

    await checkIdToken();
    initFromNativeLocalStorage();

    setConfig(in_player_environment);

    const videoEntry = isVideoEntry(payload);
    if (videoEntry) {
      logger
        .createEvent()
        .setLevel(XRayLogLevel.debug)
        .setMessage(`Plugin invoked as a player hook`)
        .addData({ isVideoEntry: videoEntry })
        .send();
      const authenticationRequired = isAuthenticationRequired({ payload });
      const assetId = inPlayerAssetId({
        payload,
        configuration: props.configuration,
      });

      logger
        .createEvent()
        .setLevel(XRayLogLevel.debug)
        .setMessage(`Plugin invoked as a player hook`)
        .addData({
          authentication_required: authenticationRequired,
          inplayer_asset_id: assetId,
        })
        .send();

      if (authenticationRequired || assetId) {
        stillMounted && setHookType(HookTypeData.PLAYER_HOOK);
      } else {
        logger
          .createEvent()
          .setLevel(XRayLogLevel.debug)
          .setMessage(
            "Data source not support InPlayer plugin invocation, finishing hook with: success"
          )
          .send();
        callback && callback({ success: true, error: null, payload });
      }
    } else {
      if (!isHook(navigator)) {
        logger
          .createEvent()
          .setLevel(XRayLogLevel.debug)
          .setMessage("Plugin invoked from User Account Plugin")
          .send();
        stillMounted && setHookType(HookTypeData.USER_ACCOUNT);
      } else {
        logger
          .createEvent()
          .setLevel(XRayLogLevel.debug)
          .setMessage(
            "Plugin invoked as screen hook data source not exist or not video entry"
          )
          .send();
        stillMounted && setHookType(HookTypeData.SCREEN_HOOK);
      }
    }
    return () => {
      stillMounted = false;
    };
  };

  const assetFlowCallback = ({ success, payload, error }) => {
    let eventMessage = `Asset flow completed success:${success}`;
    const event = logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .addData({ payload, success });

    if (error) {
      const message = getMessageOrDefault(error, screenStyles);
      event
        .addData({ message })
        .attachError(error)
        .setLevel(XRayLogLevel.error);
      eventMessage = `${eventMessage} error:${message}`;
      showAlert("General Error!", message);
    }

    event.setMessage(eventMessage).send();

    callback &&
      callback({
        success,
        error,
        payload,
      });
  };

  const accountFlowCallback = async ({ success }) => {
    let eventMessage = `Account flow completed success: ${success}, hook_type: ${hookType}`;

    const event = logger
      .createEvent()
      .setLevel(XRayLogLevel.debug)
      .addData({ success, payload, hookType });

    if (success) {
      const token = localStorage.getItem("inplayer_token");
      event.addData({ token });
      await defaultStorage.setItem("idToken", token);
    }

    if (hookType === HookTypeData.SCREEN_HOOK && success) {
      const { callback } = props;
      eventMessage = `${eventMessage}, hook task finished`;
      callback && callback({ success, error: null, payload: payload });
    } else if (hookType === HookTypeData.PLAYER_HOOK) {
      if (success) {
        eventMessage = `${eventMessage}, account flow completed. Will start invocation of Asset flow`;
        stillMounted && setIsUserAuthenticated(true);
      } else {
        callback && callback({ success, error: null, payload: payload });
        eventMessage = `${eventMessage}, task finished`;
      }
    } else if (hookType === HookTypeData.USER_ACCOUNT) {
      eventMessage = `${eventMessage}, task finished going back to previous screen`;
      navigator.goBack();
    } else {
      callback && callback({ success: success, error: null, payload: payload });
    }

    event.setMessage(eventMessage).send();
  };

  const renderPlayerHook = () => {
    return isUserAuthenticated ? (
      <AssetFlow
        setParentLockWasPresented={setParentLockWasPresented}
        parentLockWasPresented={parentLockWasPresented}
        shouldShowParentLock={shouldShowParentLock}
        assetFlowCallback={assetFlowCallback}
        screenStyles={screenStyles}
        {...props}
      />
    ) : (
      <AccountFlow
        setParentLockWasPresented={setParentLockWasPresented}
        parentLockWasPresented={parentLockWasPresented}
        shouldShowParentLock={shouldShowParentLock}
        accountFlowCallback={accountFlowCallback}
        backButton={!isHomeScreen(navigator)}
        screenStyles={screenStyles}
        {...props}
      />
    );
  };

  const renderScreenHook = () => {
    return (
      <AccountFlow
        setParentLockWasPresented={setParentLockWasPresented}
        parentLockWasPresented={parentLockWasPresented}
        shouldShowParentLock={shouldShowParentLock}
        accountFlowCallback={accountFlowCallback}
        backButton={!isHomeScreen(navigator)}
        screenStyles={screenStyles}
        {...props}
      />
    );
  };

  const renderLogoutScreen = () => {
    return <LogoutFlow screenStyles={screenStyles} {...props} />;
  };

  const renderUACFlow = () => {
    return idToken ? renderLogoutScreen() : renderScreenHook();
  };

  const shouldShowParentLock = (parentLockWasPresented) => {
    if (parentLockWasPresented || !showParentLock) {
      return false;
    }
    return true;
  };

  const renderFlow = () => {
    switch (hookType) {
      case HookTypeData.PLAYER_HOOK:
        return renderPlayerHook();
      case HookTypeData.SCREEN_HOOK:
        return renderScreenHook();
      case HookTypeData.USER_ACCOUNT:
        return renderUACFlow();
      case HookTypeData.UNDEFINED:
        return null;
    }
  };

  return renderFlow();
};

export default InPlayer;
