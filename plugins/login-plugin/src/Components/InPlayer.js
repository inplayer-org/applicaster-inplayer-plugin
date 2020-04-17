import React, { useState, useEffect } from "react";
import {} from "react-native";
import R, { prop } from "ramda";

import AccountFlow from "./AccountFlow";
import AssetFlow from "./AssetFlow";
import { PayloadUtils } from "../Utils";
import { showAlert } from "./Utils";

const {
  isVideoEntry,
  isNotEntry,
  inPlayerAssetId,
  ignoreAuthenticationFlow,
  payloadWithCombinedInPlayerData,
  isJwPlayerAsset,
} = PayloadUtils;
// callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void,

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
    } else if (isNotEntry(payload)) {
      setHookType(HookTypeData.SCREEN_HOOK);
    }
  }, []);

  const assetFlowCallback = ({ success, data, error }) => {
    const { callback, payload } = props;

    //TODO: This behaviour should be removed:
    // when QuickBrick will support JWPlayer and/or option two enable two player at once
    // if (isJwPlayerAsset({ inPlayerData: data })) {
    //   showAlert("(Demo Only) Error!", "JWPLayer not yet supported");
    //   callback &&
    //     callback({
    //       success: false,
    //       error: null,
    //       payload: payloadWithCombinedInPlayerData({
    //         payload,
    //         inPlayerData: data,
    //       }),
    //     });
    // } else {
    if (error) {
      showAlert("(Demo Only) Error!", error.message);
    }
    callback &&
      callback({
        success,
        error: null,
        payload: payloadWithCombinedInPlayerData({
          payload,
          inPlayerData: data,
        }),
      });
    // }
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
    }
  };

  const renderPlayerHook = () => {
    return ignoreAuthenticationFlow(payload) || isUserAuthenticated ? (
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
