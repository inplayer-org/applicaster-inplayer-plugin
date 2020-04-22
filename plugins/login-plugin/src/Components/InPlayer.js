import React, { useState, useEffect } from "react";
import AccountFlow from "./AccountFlow";
import AssetFlow from "./AssetFlow";
import {
  isVideoEntry,
  inPlayerAssetId,
  mergeInPlayerData,
} from "../Utils/PayloadUtils";
import { showAlert } from "../Utils/Account";

const InPlayer = (props) => {
  const { payload } = props;

  const HookTypeData = {
    UNDEFINED: "Undefined",
    PLAYER_HOOK: "PlayerHook",
    SCREEN_HOOK: "ScreenHook",
  };

  const [hookType, setHookType] = useState(HookTypeData.UNDEFINED);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const { payload, callback } = props;

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

  const assetFlowCallback = ({ success, data, error }) => {
    const { callback, payload } = props;
    if (error) {
      showAlert("(Demo Only) Error!", error);
    }
    const newPayload = success
      ? mergeInPlayerData({
          payload,
          inPlayerData: data,
        })
      : payload;

    callback &&
      callback({
        success,
        error,
        payload: newPayload,
      });
  };

  const accountFlowCallback = ({ success }) => {
    const { callback, payload } = props;
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
        {...props}
      />
    );
  };

  const renderScreenHook = () => {
    return (
      <AccountFlow
        accountFlowCallback={accountFlowCallback}
        backButton={hookType === HookTypeData.PLAYER_HOOK}
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
