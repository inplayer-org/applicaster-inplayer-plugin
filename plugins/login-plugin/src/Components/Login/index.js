import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import LoginMobile from "./LoginMobile";
import LoginTvos from "./LoginTvos";

export default function Login(props) {
  const mobile = <LoginMobile {...props} />;
  const tvOs = <LoginTvos {...props} />;

  return platformSelect({
    tvos: tvOs,
    ios: mobile,
    android: mobile,
    android_tv: mobile,
    web: mobile,
    samsung_tv: mobile,
    lg_tv: mobile,
  });
}
