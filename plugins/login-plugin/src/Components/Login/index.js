import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import LoginMobile from "./LoginMobile";

export default function Login(props) {
  const mobile = <LoginMobile {...props} />;

  return platformSelect({
    tvos: mobile,
    ios: mobile,
    android: mobile,
    android_tv: mobile,
    web: mobile,
    samsung_tv: mobile,
    lg_tv: mobile,
  });
}
