import R from "ramda";

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
    if (storeFee.title == null || storeFee.title.length === 0) {
      const inPlayerFee = R.find(
        R.propEq("productIdentifier", storeFee.productIdentifier)
      )(inPlayerFeesData);
      console.log({ inPlayerFeesData });
      if (inPlayerFee?.title) {
        storeFee.title = inPlayerFee.title;
      }
      storeFee.productType = inPlayerFee?.productType || "";
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
}) {
  const { item_type } = fee;
  console.log({ fee });
  if (item_type === "package") {
    return purchaseDataForPackageFee({
      fee,
      allPackagesData,
      purchaseKeysMapping,
    });
  } else {
    return purchaseDataForSingleFee({ fee, assetId, purchaseKeysMapping });
  }
}

function purchaseDataForSingleFee({ fee, assetId, purchaseKeysMapping }) {
  const { id, item_title, description } = fee;

  console.log({
    productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
    productIdentifier: `${assetId}_${id}`,
  });
  return {
    productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
    productIdentifier: `${assetId}_${id}`,
    title: item_title || description,
  };
}
function purchaseDataForPackageFee({
  fee,
  allPackagesData,
  purchaseKeysMapping,
}) {
  const { id, item_title, description } = fee;

  for (let i = 0; i < allPackagesData.length; i++) {
    const packageItem = allPackagesData[i];
    const packageId = packageItem?.id;
    const access_fees = packageItem?.access_fees;
    if (access_fees && packageId && R.find(R.propEq("id", id))(access_fees)) {
      console.log({
        productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
        productIdentifier: `${packageId}_${id}`,
      });
      return {
        productType: accessTypeToProducType({ fee, purchaseKeysMapping }),
        productIdentifier: `${packageId}_${id}`,
        title: item_title || description,
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
}) {
  let purchaseDataArray = [];

  for (let i = 0; i < feesToSearch.length; i++) {
    const fee = feesToSearch[i];
    const purchaseData = purchaseDataForFee({
      allPackagesData,
      fee,
      assetId,
      purchaseKeysMapping,
    });
    if (purchaseData) {
      console.log("Adding new Item:", { purchaseData });
      purchaseDataArray.push(purchaseData);
    }
  }
  console.log({ purchaseDataArray });
  return purchaseDataArray;
}
