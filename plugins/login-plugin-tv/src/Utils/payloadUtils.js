import R from "ramda";

const inPlayerAssetId = ({ payload, configuration }) => {
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
  console.log({ payload, assetIdFallback });

  return assetIdFallback;
};

const inPlayerAssetIdFromCustomKey = ({ payload, configuration }) => {
  const in_player_custom_asset_key = configuration?.in_player_custom_asset_key;
  if (in_player_custom_asset_key) {
    const devidedArray = R.split(".")(in_player_custom_asset_key);
    const assetId = R.path(devidedArray)(payload);
    console.log("MytestItem", { assetId });
    return assetId;
  } else {
    return null;
  }
};

const isVideoEntry = (payload) =>
  R.pathSatisfies(
    (value) => value === "video" || value === "channel",
    ["type", "value"],
    payload
  );

const assetPaymentRequired = R.compose(
  R.equals(402),
  R.path(["response", "status"])
);

const isHomeScreen = (navigator) => {
  return R.pathOr(false, ["payload", "home"], navigator.routeData());
};

const isHook = (navigator) => {
  return !!R.propOr(false, 'hookPlugin')(navigator.routeData());
};

export {
  isHomeScreen,
  assetPaymentRequired,
  isVideoEntry,
  inPlayerAssetId,
  isHook,
};
