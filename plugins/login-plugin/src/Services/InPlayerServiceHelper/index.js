import { Platform } from "react-native";
import InPlayer from "@inplayer-org/inplayer.js";
import * as R from "ramda";

export function externalPurchaseValidationURL() {
  // URL Example: https://staging-v2.inplayer.com/v2/external-payments/apple/validate
  const platform = Platform.OS === "ios" ? "apple" : "google-play";
  return `${InPlayer.config.BASE_URL}/v2/external-payments/${platform}/validate`;
}

export function externalIdProviderId({ in_player_environment }) {
  if (Platform.OS === "ios") {
    if (in_player_environment == "prod") {
      return 13;
    } else if (in_player_environment == "develop") {
      return 12;
    }
  } else if (Platform.OS === "android") {
    if (in_player_environment == "prod") {
      return 15;
    } else if (in_player_environment == "develop") {
      return 14;
    }
  }
  return null;
}

export function externalIdForPlatform({ fee, in_player_environment }) {
  const { external_fees } = fee;
  const externalProviderID = externalIdProviderId({ in_player_environment });
  if (!external_fees || externalProviderID === null) {
    return null;
  }
  const retVal = R.compose(
    R.prop("external_id"),
    R.find(R.propEq("payment_provider_id", externalProviderID))
  )(external_fees);
  return retVal || null;
}
