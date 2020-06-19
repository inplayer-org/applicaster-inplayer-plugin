export const getSrcForJWPlayer = ({ inPlayerItemAccess, inPlayerContent }) => {
  return inPlayerContent ? JWPlayerContent(inPlayerContent) : null;
};
const JWPlayerContent = (inPlayerContent) => {
  console.log("JWPlayerContent", { inPlayerContent });
  const { video_id = null, stream_url = null } = inPlayerContent;
  return stream_url || JWPlayerContentFromMediaID(video_id);
};

const JWPlayerContentFromMediaID = (mediaId) => {
  return mediaId
    ? `https://content.jwplatform.com/videos/${mediaId}.m3u8`
    : null;
};
