import { Platform } from "react-native";
import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import { validateExternalPayment } from "./inPlayerService";
import { findAsync } from "./InPlayerUtils";
import * as R from "ramda";
import MESSAGES from "../Components/AssetFlow/Config";

export function purchaseAnItem({ purchaseID, item_id, access_fee_id }) {
  console.log({ purchaseID, item_id, access_fee_id });
  if (purchaseID) {
    return ApplicasterIAPModule.purchase({
      productIdentifier: purchaseID,
      finishing: true,
    }).then((purchaseCompletion) =>
      externalPaymentValidation({
        purchaseCompletion,
        purchaseID,
        item_id,
        access_fee_id,
      })
    );
  } else {
    throw new Error(`PurchaseID: ${purchaseID} not exist`);
  }
}

export function retrieveProducts(purchasableItems) {
  if (purchasableItems) {
    return ApplicasterIAPModule.products(purchasableItems).then(
      R.prop("products")
    );
  } else {
    throw new Error(`PurchaseID: ${purchasableItems}  not exist`);
  }
}

async function externalPaymentValidation({
  purchaseCompletion,
  item_id,
  access_fee_id,
}) {
  const transactionIdentifier = purchaseCompletion?.transactionIdentifier;
  const productIdentifier = purchaseCompletion?.productIdentifier;

  const receipt = purchaseCompletion?.receipt;
  const result = await validateExternalPayment({
    receipt,
    item_id,
    access_fee_id,
  });
  console.log("Verification Result:", { result });
  return { transactionIdentifier, productIdentifier };
}

async function findItemInRestoreAndroid(
  purchaseIdInPlayer,
  restoreResultFromStore
) {
  if (R.isEmpty(restoreResultFromStore)) return false;

  const itemFromRestore = await findAsync(
    restoreResultFromStore,
    async ({ productIdentifier }) => {
      return productIdentifier === purchaseIdInPlayer;
    }
  );
  return itemFromRestore?.receipt ? itemFromRestore : false;
}

async function findItemInRestoreIos(
  purchaseIdInPlayer,
  restoreResultFromStore
) {
  const restoredProductsIdArr = restoreResultFromStore?.restoredProducts;
  if (R.isEmpty(restoredProductsIdArr)) return false;

  const productIdFromRestore = await findAsync(
    restoredProductsIdArr,
    async (productIdentifier) => {
      return productIdentifier === purchaseIdInPlayer;
    }
  );

  const itemInRestore = {
    productIdentifier: productIdFromRestore,
    receipt: restoreResultFromStore.receipt,
  };
  return productIdFromRestore ? itemInRestore : false;
}

async function restoreAnItem(purchaseID, restoreResultFromStore) {
  const purchaseIdStr = purchaseID.toString();

  const itemFromStoreResult =
    Platform.OS === "android"
      ? await findItemInRestoreAndroid(purchaseIdStr, restoreResultFromStore)
      : await findItemInRestoreIos(purchaseIdStr, restoreResultFromStore);

  if (!itemFromStoreResult) return false;

  const [item_id, access_fee_id] = purchaseIdStr.split("_");
  try {
    const result = await externalPaymentValidation({
      purchaseCompletion: itemFromStoreResult,
      item_id,
      access_fee_id,
    });
    return result;
  } catch (err) {
    return {
      code: err?.response?.status,
      success: false,
      message: MESSAGES.restore.failDescription,
    };
  }
}

export async function restore(dataFromInPlayer) {
  const restoreResultFromStore = await ApplicasterIAPModule.restore();

  const promises = dataFromInPlayer.map(
    async ({ productIdentifier }) =>
      await restoreAnItem(productIdentifier, restoreResultFromStore)
  );

  const restoreCompletionsArr = await Promise.all(promises);

  const restoreProcessedArr = restoreCompletionsArr.filter(Boolean);

  const isRestoreFailed = R.isEmpty(restoreProcessedArr);
  const isErrorOnAllRestores = restoreProcessedArr.every(
    ({ success }) => success === false
  );

  if (isRestoreFailed) throw new Error(MESSAGES.restore.empty);
  if (isErrorOnAllRestores) throw new Error(restoreProcessedArr[0].message);
}
