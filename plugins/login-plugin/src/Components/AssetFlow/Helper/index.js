import R from "ramda";
import { externalIdForPlatform } from "../../../Services/InPlayerServiceHelper";
export function invokeCallBack(
  props,
  { success = true, newPayload = null, error = null }
) {
  const { payload, assetFlowCallback } = props;
  assetFlowCallback &&
    assetFlowCallback({
      success,
      payload: newPayload || payload,
      error,
    });
}

export function mergeFeesTitlesAndAddType({ storeFeesData, inPlayerFeesData }) {
  for (let i = 0; i < storeFeesData.length; i++) {
    const storeFee = storeFeesData[i];
    console.log({ storeFee });

    const inPlayerFee = R.find(
      R.propEq("productIdentifier", storeFee.productIdentifier)
    )(inPlayerFeesData);
    console.log({ inPlayerFeesData });

    storeFee.productType = inPlayerFee?.productType || "";
    if (inPlayerFee?.title && !storeFee.title) {
      storeFee.title = inPlayerFee.title;
    }
  }
}

function accessTypeToProducType({ fee, purchaseKeysMapping }) {
  console.log({ purchaseKeysMapping });
  const {
    consumable_type_mapper,
    non_consumable_type_mapper,
    subscription_type_mapper,
  } = purchaseKeysMapping;
  const accessType = fee?.access_type?.name;

  if (accessType == consumable_type_mapper) {
    return "consumable";
  } else if (
    accessType == non_consumable_type_mapper ||
    accessType === "ppv_custom"
  ) {
    return "nonConsumable";
  } else if (accessType == subscription_type_mapper) {
    return "subscription";
  }
  return null;
}

function purchaseDataForFee({
  fee,
  allPackagesData,
  assetId,
  purchaseKeysMapping,
  in_player_environment,
}) {
  const { item_type } = fee;
  console.log({ fee, in_player_environment });
  if (item_type === "package") {
    return purchaseDataForPackageFee({
      fee,
      allPackagesData,
      purchaseKeysMapping,
      in_player_environment,
    });
  } else {
    return purchaseDataForSingleFee({
      fee,
      assetId,
      purchaseKeysMapping,
      in_player_environment,
    });
  }
}

function purchaseDataForSingleFee({
  fee,
  assetId,
  purchaseKeysMapping,
  in_player_environment,
}) {
  const { id, item_title, description } = fee;
  const externalFeeId = externalIdForPlatform({ fee, in_player_environment });

  console.log({
    productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
    productIdentifier: `${assetId}_${id}`,
  });
  return {
    productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
    productIdentifier: `${assetId}_${id}`,
    title: item_title || description,
    externalFeeId,
  };
}
function purchaseDataForPackageFee({
  fee,
  allPackagesData,
  purchaseKeysMapping,
  in_player_environment,
}) {
  const { id, item_title, description } = fee;

  for (let i = 0; i < allPackagesData.length; i++) {
    const packageItem = allPackagesData[i];
    const packageId = packageItem?.id;
    const access_fees = packageItem?.access_fees;
    const externalFeeId = externalIdForPlatform({ fee, in_player_environment });

    if (access_fees && packageId && R.find(R.propEq("id", id))(access_fees)) {
      console.log({
        productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
        productIdentifier: `${packageId}_${id}`,
      });
      return {
        productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
        productIdentifier: `${packageId}_${id}`,
        title: item_title || description,
        externalFeeId,
      };
    }
  }
  return null;
}

export function retrieveInPlayerFeesData({
  allPackagesData,
  feesToSearch,
  assetId,
  purchaseKeysMapping,
  in_player_environment,
}) {
  let purchaseDataArray = [];

  for (let i = 0; i < feesToSearch.length; i++) {
    const fee = feesToSearch[i];
    const purchaseData = purchaseDataForFee({
      allPackagesData,
      fee,
      assetId,
      purchaseKeysMapping,
      in_player_environment,
    });
    if (purchaseData) {
      console.log("Adding new Item:", { purchaseData });
      purchaseDataArray.push(purchaseData);
    }
  }
  console.log({ purchaseDataArray });
  return purchaseDataArray;
}

export const isRequirePurchaseError = (status) => {
  return status.toString() === "402";
};
