import { Platform } from "react-native";
import * as R from "ramda";

export const isWebBasedPlatform =
  Platform.OS === "web" ||
  Platform.OS === "samsung_tv" ||
  Platform.OS === "lg_tv";

export function isAmazonPlatform(store) {
  return store && store === "amazon";
}
