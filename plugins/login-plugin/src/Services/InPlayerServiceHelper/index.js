import { Platform } from "react-native";

export function externalPurchaseValidationURL() {
  // URL Example: https://staging-v2.inplayer.com/v2/external-payments/apple/validate
  const platform = Platform.OS === "ios" ? "apple" : "google-play";
  return `${InPlayer.config.BASE_URL}/v2/external-payments/${platform}/validate`;
}
