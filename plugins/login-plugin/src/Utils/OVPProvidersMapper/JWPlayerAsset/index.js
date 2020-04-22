import R from "ramda";

export const getSrcForJWPlayer = ({ inPlayerItemAccess, content }) => {
  return content ? JWPlayerContent(content) : null;
};
const JWPlayerContent = (content) => {
  console.log({ content });
  const { video_id = null, stream_url = null } = content;
  return stream_url || JWPlayerContentFromMediaID(video_id);
};

const JWPlayerContentFromMediaID = (mediaId) => {
  return mediaId ? `https://content.jwplatform.com/videos/${mediaId}` : null;
};
