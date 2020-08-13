import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import StoreFrontMobile from "./StoreFrontMobile";
export default function Storefront(props) {
  const mobile = <StoreFrontMobile {...props} />;

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
