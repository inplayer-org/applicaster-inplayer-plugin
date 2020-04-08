import R from "ramda";

export default PayloadUtils = {
  ignoreAuthenticationFlow: (payload) => {
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
      ? false
      : true;
  },

  inPlayerAssetId: (payload) => {
    const assetId = R.path(["extensions", "inplayer_asset_id"])(payload);

    // Legacy keys, should not be used if future
    const assetIdFallback = R.compose(
      R.ifElse(Array.isArray, R.head, R.always(null)),
      R.path(["extensions", "ds_product_ids"])
    )(payload);
    return assetId || assetIdFallback;
  },

  isVideoEntry: (payload) => {
    return R.compose(R.equals("video"), R.path(["type", "value"]))(payload);
  },

  isNotEntry: (payload) => {
    return R.path(["type", "value"]);
  },

  payloadWithCombinedInPlayerData: ({ inPlayerData }) => {
    const findValueInInPlayerMetadataByName = (inPlayerData, value) => {
      return R.compose(
        R.prop("value"),
        R.ifElse(
          Array.isArray,
          R.find(R.propEq("name", value)),
          R.always(null)
        ),
        R.path(["item", "metadata"])
      )(inPlayerData);
    };

    const findApplicasterStreamURL = (inPlayerData) => {
      const streamUrl = findValueInInPlayerMetadataByName(
        inPlayerData,
        "asset_zapp-stream-url"
      );

      const assetType = findValueInInPlayerMetadataByName(
        inPlayerData,
        "asset_type"
      );
      return assetType === "video" ? streamUrl : null;
    };

    const applicasterStreamUrl = findApplicasterStreamURL(inPlayerData);

    return applicasterStreamUrl
      ? {
          extensions: {
            inPlayerData,
          },
          content: { src: applicasterStreamUrl },
        }
      : null;
  },
};
