import * as R from "ramda";

import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { populateConfigurationValues } from "@applicaster/zapp-react-native-utils/stylesUtils";
import MESSAGES from "../../Components/AssetFlow/Config";

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
  styles.import_parent_lock = screenStyles.import_parent_lock
    ? screenStyles.import_parent_lock
    : false;
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
      tvos: obj?.[`${key}_font_tvos`],
      android_tv: obj?.[`${key}_font_android_tv`],
      web: obj?.[`${key}_font_web`],
      samsung_tv: obj?.[`${key}_font_samsung_tv`],
      lg_tv: obj?.[`${key}_font_lg_tv`],
    }),
    fontSize: obj?.[`${key}_fontsize`],
    color: obj?.[`${key}_fontcolor`],
  };
};

export const withEndSpace = (str) => {
  return `${str}\xa0`; // explicitly add space after string
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

export function getMessageOrDefault(error, screenStyles) {
  const message = error?.message;
  const defaultMessage = screenStyles.general_error_message;

  const isStreamException = isStreamExceptionError(message, screenStyles);
  if (isStreamException) return message;

  const isUserFriendlyMessage = findInObject(MESSAGES, message);
  return isUserFriendlyMessage ? message : defaultMessage;
}

function isStreamExceptionError(message, screenStyles) {
  const streamExceptionMessage = screenStyles.video_stream_exception_message;
  return message === streamExceptionMessage;
}

function findInObject(obj, condition) {
  return Object.values(obj).some((value) => {
    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      return findInObject(value, condition);
    }
    return value === condition;
  });
}
