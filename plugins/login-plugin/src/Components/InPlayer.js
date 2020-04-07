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
    const { payload } = props;
    console.log("InPlayer", { props });

    //TODO figure out if it is player or screen
  }, []);

  const assetFlowCallback = ({ success, data }) => {
    const { callback, payload } = props;
    callback &&
      callback({ success, error: null, payload: { ...payload, ...data } });
  };

  const accountFlowCallback = ({ success }) => {
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
    return isAuthenticated ? (
      <AssetFlow callBack={assetFlowCallback} {...props} />
    ) : (
      <AccountFlow
        callBack={accountFlowCallback}
        {...props}
        backButton={hookType === HookTypeData.PLAYER_HOOK}
      />
    );
  };

  console.log({ props, AccountModule });
  return hookType !== HookTypeData.UNDEFINED ? renderFlow() : null;
};

export default InPlayer;
