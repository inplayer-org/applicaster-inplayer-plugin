import R from "ramda";

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

export const retrievePurchaseProductId = ({ payload }) => {
  return R.compose(R.path(["extensions", "purchase_id"]))(payload);
};

export const assetPaymentRequired = R.compose(
  R.equals(402),
  R.path(["response", "status"])
);
