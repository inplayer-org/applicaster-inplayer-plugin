import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import LoginMobile from "./LoginMobile";
import LoginTv from "./LoginTv";

export default function Login(props) {
  const mobile = <LoginMobile {...props} />;
  const tvOs = <LoginTv {...props} />;

  return platformSelect({
    tvos: LoginTv,
    ios: mobile,
    android: mobile,
    android_tv: LoginTv,
    web: LoginTv,
    samsung_tv: LoginTv,
    lg_tv: LoginTv,
  });
}
