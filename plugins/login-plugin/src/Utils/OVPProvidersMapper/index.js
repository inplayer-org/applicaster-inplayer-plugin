import { getInPlayerContent, getInPlayerAssetType } from "../InPlayerResponse";
import { getSrcForJWPlayer } from "./JWPlayerAsset";
import { getSrcForHTML } from "./HTMLAsset";

const SUPPORTED_ASSET_TYPES = {
  JW_ASSET: "jw_asset",
  HTML: "html_asset",
};

export const getSrcFromAsset = (inPlayerItemAccess) => {
  const inPlayerContent =
    inPlayerItemAccess && getInPlayerContent(inPlayerItemAccess);
  if (inPlayerContent) {
    const src = retrieveSrcFromDefault({ inPlayerContent });

    if (src) {
      return src;
    } else {
      const fallbackSrc = tryFallBackLogicFromMapping({
        inPlayerContent,
        inPlayerItemAccess,
      });
      return fallbackSrc;
    }
  }
  return null;
};

const retrieveSrcFromDefault = ({ inPlayerContent }) => {
  const { mobile_url = null, web_url = null } = inPlayerContent;

  if (isMobileURLValid({ mobile_url })) {
    return mobile_url;
  }
  if (isWebURLValid({ web_url })) {
    return web_url;
  }

  return null;
};

const isMobileURLValid = ({ mobile_url }) => {
  const mobilePlatform = Platform.OS === "ios" || Platform.OS === "android";

  return mobilePlatform && isUrlValidForPlatform({ url: mobile_url });
};

const isWebURLValid = ({ web_url }) => {
  const webPlatform =
    Platform.OS === "web" ||
    Platform.OS === "samsung_tv" ||
    Platform.OS === "lg_tv";
  return webPlatform && isUrlValidForPlatform({ url: web_url });
};

const isUrlValidForPlatform = ({ url }) => {
  return url && url.length > 0;
};

const tryFallBackLogicFromMapping = ({
  inPlayerContent,
  inPlayerItemAccess,
}) => {
  const inPlayerAssetType = getInPlayerAssetType(inPlayerItemAccess);
  if (inPlayerAssetType) {
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
