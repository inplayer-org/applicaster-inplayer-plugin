import React, { useState, useEffect } from "react";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";

import AssetFlow from "./AssetFlow";
import LogoutFlow from "./LogoutFlow";
import ErrorFlow from "./ErrorFlow";
import LoginScreen from "./Login";

import {
  isVideoEntry,
  inPlayerAssetId,
  isHook,
  isHomeScreen,
} from "../Utils/payloadUtils";
import { setConfig } from "../Services/inPlayerService";

import {
  getScreenStyles,
  PluginContext,
  HookTypeData,
} from "../Config/PluginData";
import * as InPlayerService from "../Services/inPlayerService";
import session from "../globalSessionManager";

console.disableYellowBox = true;

const InPlayer = (props) => {
  const navigator = useNavigation();
  let stillMounted = true;
  const { callback, payload, configuration } = props;
  const screenStyles = getScreenStyles(props);
  const { enable_skip_functionality: skip } = screenStyles;

  session.isHomeScreen = isHomeScreen(navigator);

  const useSetState = (initialState = {}) => {
    const [state, regularSetState] = useState(initialState);

    const setState = (newState) => {
      regularSetState((prevState) => {
        return stillMounted ? { ...prevState, ...newState } : prevState;
      });
    };

    return [state, setState];
  };

  const [state, setState] = useSetState({
    idToken: null,
    hookType: HookTypeData.UNDEFINED,
    isAuthenticated: false,
    error: null,
  });

  useEffect(() => {
    setupEnvironment()
      .then(defineFlow)
      .catch((err) => console.log(err));

    return () => {
      stillMounted = false;
    };
  }, []);

  const setupEnvironment = async () => {
    const { in_player_environment } = configuration;
    await setConfig(in_player_environment);
  };

  const defineFlow = async () => {
    const isAuthenticated = await checkAuthentication();
    setState({ isAuthenticated });

    const isPlayerHook = isVideoEntry(payload);
    const isTriggeredFromUAC = !isHook(navigator);
    const isAsset = inPlayerAssetId({ payload, configuration });

    if (isPlayerHook) {
      if (!isAsset) return successHook();
      return setState({ hookType: HookTypeData.PLAYER_HOOK });
    }
    if (isTriggeredFromUAC) {
      return setState({ hookType: HookTypeData.USER_ACCOUNT });
    }
    if (!isAuthenticated) {
      return setState({ hookType: HookTypeData.SCREEN_HOOK });
    }
    return successHook();
  };

  const checkAuthentication = async () => {
    try {
      const { in_player_client_id: clientId } = configuration;
      return InPlayerService.isAuthenticated(clientId);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const assetFlowCallback = ({ success, payload, error }) => {
    console.log("Asset Flow CallBack Anton", {
      success,
      payload,
      error,
      callback,
    });
    if (error) {
      Alert.alert("General Error!", error?.message);
    }
    callback &&
      callback({
        success,
        error,
        payload,
      });
  };

  const accountFlowCallback = ({ success, error }) => {
    console.log("Account Flow");
    if (error) {
      return setState({ error });
    }

    switch (state.hookType) {
      case HookTypeData.SCREEN_HOOK:
        success && successHook();
        break;
      case HookTypeData.PLAYER_HOOK:
        success ? setState({ isUserAuthenticated: true }) : closeHook();
        break;
      case HookTypeData.USER_ACCOUNT:
        goBackOrHome();
        break;
      default:
        callback && callback({ success, error: null, payload });
    }
  };

  const goBackOrHome = () => {
    if (skip && navigator.canGoBack()) {
      navigator.goBack();
    } else {
      navigator.goHome();
    }
  };

  const closeHook = () => {
    callback({ success: false, payload });
  };

  const successHook = () => {
    callback && callback({ success: true, error: null, payload });
  };

  const screenCallback = (error) => {
    if (error?.screen) {
      return setState({
        error: null,
        hookType: error.screen,
      });
    }
    if (navigator.canGoBack()) {
      return navigator.goBack();
    }
    return closeHook();
  };

  const remoteHandler = async (component, event) => {
    const isHome = isHomeScreen(navigator);
    const { eventType } = event;

    if (eventType === "menu" && isHome) return null;
    if (eventType === "menu" && navigator.canGoBack()) {
      navigator.goBack();
      return closeHook();
    }
  };

  const renderAssetFlow = () => {
    return (
      <PluginContext.Provider value={screenStyles}>
        <AssetFlow
          assetFlowCallback={assetFlowCallback}
          screenStyles={screenStyles}
          remoteHandler={remoteHandler}
          navigator={navigator}
        />
      </PluginContext.Provider>
    );
  };

  const renderScreenHook = () => {
    return (
      <PluginContext.Provider value={screenStyles}>
        <LoginScreen
          accountFlowCallback={accountFlowCallback}
          screenStyles={screenStyles}
          remoteHandler={remoteHandler}
          configuration={configuration}
          navigator={navigator}
        />
      </PluginContext.Provider>
    );
  };

  const renderLogoutScreen = () => {
    return (
      <PluginContext.Provider value={screenStyles}>
        <LogoutFlow
          accountFlowCallback={accountFlowCallback}
          navigator={navigator}
          remoteHandler={remoteHandler}
        />
      </PluginContext.Provider>
    );
  };

  const renderErrorFlow = () => {
    return (
      <PluginContext.Provider value={screenStyles}>
        <ErrorFlow
          error={state.error}
          screenCallback={screenCallback}
          navigator={navigator}
          remoteHandler={remoteHandler}
        />
      </PluginContext.Provider>
    );
  };

  const renderUACFlow = () => {
    return state.isAuthenticated ? renderLogoutScreen() : renderScreenHook();
  };

  const renderPlayerHook = () => {
    return state.isAuthenticated ? renderAssetFlow() : renderScreenHook();
  };

  const renderFlow = () => {
    switch (state.hookType) {
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

  return state.error ? renderErrorFlow() : renderFlow();
};

export default InPlayer;
