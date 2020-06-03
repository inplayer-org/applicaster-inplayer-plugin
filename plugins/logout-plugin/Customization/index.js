import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { populateConfigurationValues } from "@applicaster/zapp-react-native-utils/stylesUtils";

const manifestJson = platformSelect({
  ios: require("../manifests/ios.json"),
  android: require("../manifests/android.json"),
  default: require("../manifests/android.json"),
});

export function pluginIdentifier() {
  return manifestJson.identifier;
}

export let styles = null;
export function getStyles(screenStyles) {
  console.log({ screenStyles });
  return styles ? styles : prepareStyles(screenStyles);
}

export function prepareStyles(screenStyles) {
  styles = populateConfigurationValues(manifestJson.styles.fields)(
    screenStyles
  );

  return styles;
}
