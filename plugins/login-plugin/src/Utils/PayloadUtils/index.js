import R from "ramda";
import { mapOVPProviders } from "../OVPProvidersMapper";

export const inPlayerAssetId = (payload) => {
  const assetId = R.path(["extensions", "inplayer_asset_id"])(payload);

  // Legacy keys, should not be used if future.
  // Remove at once we will make sure that not needed
  const assetIdFallback = R.compose(
    R.ifElse(Array.isArray, R.head, R.always(null)),
    R.path(["extensions", "ds_product_ids"])
  )(payload);
  return assetId || assetIdFallback;
};

export const isVideoEntry = (payload) => {
  return R.compose(R.equals("video"), R.path(["type", "value"]))(payload);
};

export const mergeInPlayerData = ({ payload, inPlayerData }) => {
  const { content = null } = payload;
  const applicasterStreamUrl = findApplicasterStreamURL(inPlayerData);
  const newContent = applicasterStreamUrl
    ? { src: applicasterStreamUrl }
    : content;
  return {
    ...payload,
    extensions: {
      in_player_data: inPlayerData,
      ...mapOVPProviders(inPlayerData),
    },
    content: newContent,
  };
};

const findValueInInPlayerMetadataByName = (inPlayerData, value) => {
  return R.compose(
    R.prop("value"),
    R.ifElse(Array.isArray, R.find(R.propEq("name", value)), R.always(null)),
    R.path(["item", "metadata"])
  )(inPlayerData);
};

const findApplicasterStreamURL = (inPlayerData) => {
  if (inPlayerData) {
    const streamUrl = findValueInInPlayerMetadataByName(
      inPlayerData,
      "asset_zapp-stream-url"
    );

    const assetType = findValueInInPlayerMetadataByName(
      inPlayerData,
      "asset-type"
    );
    return assetType === "video" ? streamUrl : null;
  }
  return null;
};

export const retrievePurchaseProductId = ({ payload }) => {
  return R.compose(R.path(["extensions", "purchase_id"]))(payload);
};
