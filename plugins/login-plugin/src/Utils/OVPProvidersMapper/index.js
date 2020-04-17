import R from "ramda";
import { parseJsonIfNeeded } from "@applicaster/zapp-react-native-utils/functionUtils";

export const mapOVPProviders = (inPlayerData) => {
  console.log("mapOVPProviders", { inPlayerData });
  if (!inPlayerData) {
    return {};
  }
  const inPlayerContent = getInPlayerContent(inPlayerData);
  if (inPlayerContent) {
    return isJWPlayerAsset(inPlayerData) && JWPlayerContent(inPlayerContent);
  }
  return {};
};

export const isJWPlayerAsset = (inPlayerData) => {
  if (inPlayerData) {
    const itemType = R.path(["item", "item_type"])(inPlayerData);
    if (itemType) {
      const { name } = itemType;
      if (name === "jw_asset") {
        return true;
      }
    }
  }
  return false;
};

export const JWPlayerContent = (inPlayerContent) => {
  console.log({ inPlayerContent });
  const { video_id, player_id } = inPlayerContent;
  return {
    jwplayer_content_id: video_id || null,
    jwplayer_player_id: player_id || null,
  };
};

export const getInPlayerContent = (inPlayerData) => {
  return R.compose(
    parseJsonIfNeeded,
    R.path(["item", "content"])
  )(inPlayerData);
};
