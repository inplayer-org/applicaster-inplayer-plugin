import React from "react";
import * as R from "ramda";

export const getScreenStyles = R.compose(
  R.prop("general"),
  R.find(R.propEq("type", "quick-brick-inplayer-tv")),
  R.values,
  R.prop("rivers")
);

export const HookTypeData = {
  UNDEFINED: "Undefined",
  PLAYER_HOOK: "PlayerHook",
  SCREEN_HOOK: "ScreenHook",
  USER_ACCOUNT: "UserAccount",
};

export const PluginContext = React.createContext();
