import { Platform } from 'react-native';

export const getSrcForJWPlayer = ({ inPlayerItemAccess, inPlayerContent }) => {
  return inPlayerContent ? JWPlayerContent(inPlayerContent) : null;
};
const JWPlayerContent = (inPlayerContent) => {
  console.log("JWPlayerContent", { inPlayerContent });

  const mobilePlatform = Platform.OS === 'ios' || Platform.OS === 'android';
  const webPlatform = Platform.OS === 'web';
  const { mobile_url = null, web_url = null} = inPlayerContent;
  if (mobile_url && mobilePlatform) {
    return mobile_url;
  }
  if (web_url && webPlatform) {
    return web_url;
  }

  const { video_id = null, stream_url = null } = inPlayerContent;
  return stream_url || JWPlayerContentFromMediaID(video_id);
};

const JWPlayerContentFromMediaID = (mediaId) => {
  return mediaId
    ? `https://content.jwplatform.com/videos/${mediaId}.m3u8`
    : null;
};
