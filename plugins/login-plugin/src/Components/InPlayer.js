import React, { useState, useEffect } from "react";
import {} from "react-native";
import R, { prop } from "ramda";
import { container } from "./Styles";
import AccountFlow from "./AccountFlow";
import AssetFlow from "./AssetFlow";
import { AccountModule } from "../NativeModules/AccountModule";
import { PayloadUtils } from "../Utils";

const {
  isVideoEntry,
  isNotEntry,
  inPlayerAssetId,
  ignoreAuthenticationFlow,
  payloadWithCombinedInPlayerData,
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

    const value = R.path(["type", "value"])(payload);
    const src = R.path(["content", "src"])(payload);

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

  const assetFlowCallback = ({ success, data }) => {
    const { callback, payload } = props;
    const src = R.path(["item", "content"])(data);
    const inPlayerMappedData = payloadWithCombinedInPlayerData({
      payload,
      inPlayerData: data,
    });
    if (inPlayerMappedData) {
      callback &&
        callback({
          success,
          error: null,
          payload: {
            ...payload,
            ...inPlayerMappedData,
          },
        });
    } else {
      callback &&
        callback({
          success: false,
          error: null,
          payload,
        });
    }
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
