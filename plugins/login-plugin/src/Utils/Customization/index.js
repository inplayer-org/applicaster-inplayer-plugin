import * as R from "ramda";

import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { populateConfigurationValues } from "@applicaster/zapp-react-native-utils/stylesUtils";

const manifestJson = platformSelect({
  ios: require("../../../manifests/ios.json"),
  android: require("../../../manifests/android.json"),
  default: require("../../../manifests/android.json"),
});

export function pluginIdentifier() {
  return manifestJson.identifier;
}

export let styles = null;
export function getStyles(screenStyles) {
  return styles ? styles : prepareStyles(screenStyles);
}

export function prepareStyles(screenStyles) {
  styles = populateConfigurationValues(manifestJson.styles.fields)(
    screenStyles
  );

  return styles;
}

export const isHomeScreen = (navigator) => {
  return R.pathOr(false, ["payload", "home"], navigator.routeData());
};

export const mapKeyToStyle = (key, obj) => {
  return {
    fontFamily: platformSelect({
      ios: obj?.[`${key}_font_ios`],
      android: obj?.[`${key}_font_android`],
    }),
    fontSize: obj?.[`${key}_fontsize`],
    color: obj?.[`${key}_fontcolor`],
  };
};

export function inputFieldStyle(screenStyles) {
  return {
    fontFamily: platformSelect({
      ios: screenStyles?.fields_font_ios,
      android: screenStyles?.fields_font_android,
    }),
    fontSize: screenStyles?.fields_font_size,
    color: screenStyles?.fields_font_color,
    backgroundColor: "transparent",
    width: 250,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: screenStyles?.fields_separator_color || "#A9A9A9",
    marginBottom: 10,
    paddingHorizontal: 15,
    alignSelf: "center",
  };
}
