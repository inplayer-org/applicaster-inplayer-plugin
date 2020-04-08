import React, { useState, useEffect } from "react";
import R, { prop } from "ramda";
import { Keyboard } from "react-native";
import { container } from "./Styles";
import AccountFlow from "./AccountFlow";
import AssetFlow from "./AssetFlow";
import { AccountModule } from "../NativeModules/AccountModule";
import { StyleSheet } from "react-native";

// callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void,

const parseJSON = R.tryCatch(JSON.parse, () => null);
const styles = StyleSheet.create({
  container,
});
const InPlayer = (props) => {
  const { payload } = props;

  const requiresAuthentication = R.path([
    "extensions",
    "inplayer_requires_authentication",
  ])(payload);
  const inPlayerAssetId = R.path(["extensions", "inplayer_asset_id"])(payload);

  const riverScreen = Object.values(props.rivers).find(
    (river) => river.type === "my-plugin-identifier"
  );

  const HookTypeData = {
    UNDEFINED: "Undefined",
    PLAYER_HOOK: "PlayerHook",
    SCREEN_HOOK: "ScreenHook",
  };

  const [hookType, setHookType] = useState(HookTypeData.UNDEFINED);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const { payload, callback } = props;

    const value = R.path(["type", "value"])(payload);
    const src = R.path(["content", "src"])(payload);

    console.log("InPlayer", { props, value });
    if (value && value === "video") {
      if (inPlayerAssetId) {
        setHookType(HookTypeData.PLAYER_HOOK);
      } else {
        callback && callback({ success: true, error: null, payload });
      }
      console.log({ hook: HookTypeData.PLAYER_HOOK });
    } else if (!value) {
      console.log({ hook: HookTypeData.SCREEN_HOOK });
      setHookType(HookTypeData.SCREEN_HOOK);
    }
  }, []);

  const assetFlowCallback = ({ success, data }) => {
    console.log("assetFlowCallback", { success, data });
    const { callback, payload } = props;
    const src = R.path(["item", "content"])(data);
    callback &&
      callback({
        success,
        error: null,
        payload: { ...payload, content: { src } },
      });
  };

  const accountFlowCallback = ({ success }) => {
    console.log("accountFlowCallback", { success });
    const { callback, payload } = props;
    if (hookType === HookTypeData.SCREEN_HOOK && success) {
      const { callback } = props;
      callback && callback({ success, error: null, payload: payload });
    } else if (hookType === HookTypeData.PLAYER_HOOK) {
      success
        ? setAuthenticated(true)
        : callback && callback({ success, error: null, payload: payload });
    }
  };

  const renderFlow = () => {
    return (!requiresAuthentication && hookType === HookTypeData.PLAYER_HOOK) ||
      isAuthenticated ? (
      <AssetFlow assetFlowCallback={assetFlowCallback} {...props} />
    ) : (
      <AccountFlow
        accountFlowCallback={accountFlowCallback}
        {...props}
        backButton={hookType === HookTypeData.PLAYER_HOOK}
      />
    );
  };

  console.log({ props, AccountModule });
  return hookType !== HookTypeData.UNDEFINED ? renderFlow() : null;
};

export default InPlayer;
