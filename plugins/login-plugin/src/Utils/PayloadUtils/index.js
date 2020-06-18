import R from "ramda";

export const inPlayerAssetId = (payload) => {
  const assetIdFromCustomKey = inPlayerAssetIdFromCustomKey({
    payload,
    configuration,
  });

  if (assetIdFromCustomKey) {
    return assetIdFromCustomKey;
  }

  const assetId = R.path(["extensions", "inplayer_asset_id"])(payload);
  if (assetId) {
    return assetId;
  }
  // Legacy keys, should not be used if future.
  // Remove at once we will make sure that not needed
  const assetIdFallback = R.compose(
    R.ifElse(Array.isArray, R.head, R.always(null)),
    R.path(["extensions", "ds_product_ids"])
  )(payload);
  return assetIdFallback;
};

const inPlayerAssetIdFromCustomKey = ({ payload, configuration }) => {
  const in_player_custom_asset_key = configuration?.in_player_custom_asset_key;
  if (in_player_custom_asset_key) {
    const devidedArray = R.split(".")(in_player_custom_asset_key);
    const assetId = R.path(devidedArray)(payload);
    return assetId;
  } else {
    return null;
  }
};

export const isVideoEntry = (payload) => {
  return R.compose(R.equals("video"), R.path(["type", "value"]))(payload);
};

export const assetPaymentRequired = R.compose(
  R.equals(402),
  R.path(["response", "status"])
);
