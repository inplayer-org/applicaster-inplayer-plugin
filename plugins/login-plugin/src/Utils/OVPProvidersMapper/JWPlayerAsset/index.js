import { Platform } from "react-native";

export const getSrcForJWPlayer = ({ inPlayerContent }) => {
  return inPlayerContent ? JWPlayerContent(inPlayerContent) : null;
};
const JWPlayerContent = (inPlayerContent) => {
  console.log("JWPlayerContent", { inPlayerContent });
  const { video_id = null } = inPlayerContent;
  
  return video_id
    ? `https://content.jwplatform.com/videos/${video_id}.m3u8`
    : null;
};
