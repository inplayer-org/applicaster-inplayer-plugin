import R from "ramda";
import { getInPlayerContent, getInPlayerAssetType } from "../InPlayerResponse";
import { getSrcForJWPlayer } from "./JWPlayerAsset";
import { getSrcForHTML } from "./HTMLAsset";

const SUPPORTED_ASSET_TYPES = {
  JW_ASSET: "jw_asset",
  HTML: "html_asset",
};

export const getSrcFromProvider = (inPlayerItemAccess) => {
  if (!inPlayerItemAccess) {
    return {};
  }
  const inPlayerContent = getInPlayerContent(inPlayerItemAccess);
  const inPlayerAssetType = getInPlayerAssetType(inPlayerItemAccess);
  console.log("mapOVPProviders", {
    inPlayerItemAccess,
    inPlayerContent,
    inPlayerAssetType,
  });

  if (inPlayerContent) {
    switch (inPlayerAssetType) {
      case SUPPORTED_ASSET_TYPES.JW_ASSET:
        return getSrcForJWPlayer({ inPlayerItemAccess, inPlayerContent });
      case SUPPORTED_ASSET_TYPES.HTML:
        return getSrcForHTML({ inPlayerItemAccess, inPlayerContent });
      default:
        break;
    }
  }
  return null;
};
