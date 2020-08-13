import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import LoginMobile from "./LoginMobile";
import LoginTvOS from "./LoginTvOS";
export default function Login(props) {
  const mobile = <LoginMobile {...props} />;
  const tvos = <LoginTvOS {...props} />;

  return platformSelect({
    tvos: tvos,
    ios: mobile,
    android: mobile,
    android_tv: mobile,
    web: mobile,
    samsung_tv: mobile,
    lg_tv: mobile,
  });
}
