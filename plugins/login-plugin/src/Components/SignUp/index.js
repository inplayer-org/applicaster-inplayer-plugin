import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import SignUpMobile from "./SignUpMobile";

export default function SignUp(props) {
  const mobile = <SignUpMobile {...props} />;

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
