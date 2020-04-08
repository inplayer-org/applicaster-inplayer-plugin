import R from "ramda";

export const isAuthenticationRequied = (payload) => {
  const requiresAuthentication = R.path([
    "extensions",
    "inplayer_requires_authentication",
  ])(payload);

  // Legacy keys, should not be used if future
  const requiresAuthenticationFallback = R.path([
    "extensions",
    "requires_authentication",
  ])(payload);
  return requiresAuthentication || requiresAuthenticationFallback
    ? true
    : false;
};

export const assetId = (payload) => {
  const inPlayerAssetId = R.path(["extensions", "inplayer_asset_id"])(payload);

  // Legacy keys, should not be used if future
  const inPlayerAssetIdFallback = R.prop("ds_product_ids")(payload)[0];
  return inPlayerAssetId || inPlayerAssetIdFallback;
};

export const isVideoEntry = (payload) => {
  return R.compose(R.equals("video"), R.path(["type", "value"]))(payload);
};

export const isNotEntry = (payload) => {
  return R.path(["type", "value"]);
};
