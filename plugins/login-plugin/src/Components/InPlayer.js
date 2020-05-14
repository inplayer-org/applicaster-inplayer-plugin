import React, { useState, useEffect } from "react";
import AccountFlow from "./AccountFlow";
import AssetFlow from "./AssetFlow";
import R from "ramda";

import { initFromNativeLocalStorage } from "../LocalStorageHack";

import { getInPlayerAssetType } from "../Utils/InPlayerResponse";
import { isVideoEntry, inPlayerAssetId } from "../Utils/PayloadUtils";
import { showAlert } from "../Utils/Account";
import { getAllPackages, setConfig } from "../Services/inPlayerService";

const getScreenStyles = R.compose(
  R.prop("styles"),
  R.find(R.propEq("type", "quick-brick-inplayer")),
  R.values,
  R.prop("rivers")
);

console.disableYellowBox = true;

const InPlayer = (props) => {
  const HookTypeData = {
    UNDEFINED: "Undefined",
    PLAYER_HOOK: "PlayerHook",
    SCREEN_HOOK: "ScreenHook",
  };

  const [hookType, setHookType] = useState(HookTypeData.UNDEFINED);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const screenStyles = getScreenStyles(props);

  const { callback, payload } = props;

  useEffect(() => {
    initFromNativeLocalStorage();
    setConfig("develop");

    if (isVideoEntry(payload)) {
      if (inPlayerAssetId(payload)) {
        setHookType(HookTypeData.PLAYER_HOOK);
      } else {
        callback && callback({ success: true, error: null, payload });
      }
    } else {
      setHookType(HookTypeData.SCREEN_HOOK);
    }
  }, []);

  const assetFlowCallback = ({ success, payload, error }) => {
    console.log("Asset Flow CallBack", { success, payload, error });
    if (error) {
      showAlert("General Error!", error?.message);
    }
    callback &&
      callback({
        success,
        error,
        payload,
      });
  };

  const accountFlowCallback = ({ success }) => {
    if (hookType === HookTypeData.SCREEN_HOOK && success) {
      const { callback } = props;
      callback && callback({ success, error: null, payload: payload });
    } else if (hookType === HookTypeData.PLAYER_HOOK) {
      success
        ? setIsUserAuthenticated(true)
        : callback && callback({ success, error: null, payload: payload });
    } else {
      callback && callback({ success: success, error: null, payload: payload });
    }
  };

  const renderPlayerHook = () => {
    return isUserAuthenticated ? (
      <AssetFlow assetFlowCallback={assetFlowCallback} {...props} />
    ) : (
      <AccountFlow
        accountFlowCallback={accountFlowCallback}
        backButton={hookType === HookTypeData.PLAYER_HOOK}
        screenStyles={screenStyles}
        {...props}
      />
    );
  };

  const renderScreenHook = () => {
    return (
      <AccountFlow
        accountFlowCallback={accountFlowCallback}
        backButton={hookType === HookTypeData.PLAYER_HOOK}
        screenStyles={screenStyles}
        {...props}
      />
    );
  };

  const renderFlow = () => {
    return hookType === HookTypeData.PLAYER_HOOK
      ? renderPlayerHook()
      : renderScreenHook();
  };

  return hookType !== HookTypeData.UNDEFINED ? renderFlow() : null;
};

export default InPlayer;
