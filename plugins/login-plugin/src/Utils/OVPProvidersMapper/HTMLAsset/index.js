import { findInPlayerMetadata } from "../../InPlayerResponse";

export const getSrcForHTML = ({ inPlayerItemAccess, inPlayerContent }) => {
  const applicasterAssetType = findInPlayerMetadata({
    inPlayerItemAccess,
    value: "asset_type",
  });
  console.log({ applicasterAssetType, inPlayerContent });
  return inPlayerContent && applicasterAssetType === "video"
    ? inPlayerContent
    : null;
};
