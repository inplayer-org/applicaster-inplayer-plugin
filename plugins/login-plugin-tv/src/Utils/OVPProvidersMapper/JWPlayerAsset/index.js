import { Platform } from "react-native";

export const getSrcForJWPlayer = ({ inPlayerContent }) => {
  return inPlayerContent ? JWPlayerContent(inPlayerContent) : null;
};
const JWPlayerContent = (inPlayerContent) => {
  console.log("JWPlayerContent", { inPlayerContent });

  const {
    mobile_url = null,
    web_url = null,
    video_id = null,
  } = inPlayerContent;

  if (isMobileURLValid({ mobile_url, video_id })) {
    return mobile_url;
  }
  if (isWebURLValid({ web_url, video_id })) {
    return web_url;
  }

  return video_id || fallbackURL({ video_id });
};

const fallbackURL = ({ video_id }) => {
  return video_id
    ? `https://content.jwplatform.com/videos/${video_id}.m3u8`
    : null;
};

const isMobileURLValid = ({ mobile_url, video_id }) => {
  const mobilePlatform = Platform.OS === "ios" || Platform.OS === "android";

  return mobilePlatform && isUrlValidForPlatform({ video_id, url: mobile_url });
};

const isWebURLValid = ({ web_url, video_id }) => {
  const webPlatform = Platform.OS === "web";
  return webPlatform && isUrlValidForPlatform({ video_id, url: web_url });
};

const isUrlValidForPlatform = ({ video_id, url }) => {
  return video_id && video_id.length > 0 && url && url.length > 0;
};
