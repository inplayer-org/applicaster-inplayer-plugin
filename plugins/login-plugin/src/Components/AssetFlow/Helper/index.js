import * as R from "ramda";
import { externalIdForPlatform } from "../../../Services/InPlayerServiceHelper";
import { Alert } from "react-native";
import MESSAGES from "../Config";

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

export function addInPlayerProductId({ storeFeesData, inPlayerFeesData }) {
  var retVal = [];
  for (let i = 0; i < inPlayerFeesData.length; i++) {
    const inPlayerFee = inPlayerFeesData[i];

    const storeFee = findStoreFee(inPlayerFee, storeFeesData);
    if (storeFee) {
      storeFee.productType = inPlayerFee?.productType || "";
      storeFee.inPlayerProductId = inPlayerFee.productIdentifier;
      if (inPlayerFee?.title && !storeFee.title) {
        storeFee.title = inPlayerFee.title;
      }

      if (inPlayerFee?.price && !storeFee.amount) {
        storeFee.price = inPlayerFee.amount;
      }

      retVal.push(storeFee);
    }
  }
  if (retVal.length == 0) throw new Error(MESSAGES.validation.emptyStore);
  return retVal;
}

function findStoreFee(inPlayerFee, storeFeesData) {
  let storeFee = R.find(
    R.propEq("productIdentifier", inPlayerFee.externalFeeId)
  )(storeFeesData);

  if (!storeFee) {
    storeFee = R.find(
      R.propEq("productIdentifier", inPlayerFee.productIdentifier)
    )(storeFeesData);
  }

  return storeFee ? { ...storeFee } : null;
}

function accessTypeToProducType({ fee, purchaseKeysMapping }) {
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
  store,
}) {
  const { item_type } = fee;
  if (item_type === "package") {
    return purchaseDataForPackageFee({
      fee,
      allPackagesData,
      purchaseKeysMapping,
      in_player_environment,
      store,
    });
  } else {
    return purchaseDataForSingleFee({
      fee,
      assetId,
      purchaseKeysMapping,
      in_player_environment,
      store,
    });
  }
}

function purchaseDataForSingleFee({
  fee,
  assetId,
  purchaseKeysMapping,
  in_player_environment,
  store,
}) {
  const { id, item_title, description } = fee;
  const externalFeeId = externalIdForPlatform({
    fee,
    in_player_environment,
    store,
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
  store,
}) {
  const { id, item_title, description } = fee;

  for (let i = 0; i < allPackagesData.length; i++) {
    const packageItem = allPackagesData[i];
    const packageId = packageItem?.id;
    const access_fees = packageItem?.access_fees;
    const externalFeeId = externalIdForPlatform({
      fee,
      in_player_environment,
      store,
    });

    if (access_fees && packageId && R.find(R.propEq("id", id))(access_fees)) {
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
  store,
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
      store,
    });
    if (purchaseData) {
      purchaseDataArray.push(purchaseData);
    }
  }
  return purchaseDataArray;
}

export const isRequirePurchaseError = (status) => {
  return status.toString() === "402";
};

export const showAlert = (title, message, action) => {
  Alert.alert(title, message, [
    {
      text: "OK",
      onPress: action,
    },
  ]);
};
