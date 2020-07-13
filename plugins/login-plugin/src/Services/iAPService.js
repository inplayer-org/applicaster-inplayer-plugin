import { Platform } from "react-native";
import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import { validateExternalPayment } from "./inPlayerService";
import R from "ramda";

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
  console.log(purchaseCompletion, item_id, access_fee_id);
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

function restoreAnItem(purchaseID, restoreResult) {
  let purchaseCompletion = restoreResult;

  if (Array.isArray(restoreResult)) {
    purchaseCompletion = restoreResult.find(
      ({ productIdentifier }) => productIdentifier === purchaseID
    );
  }

  const [item_id, access_fee_id] = purchaseID.split("_");
  return externalPaymentValidation({
    purchaseCompletion,
    item_id,
    access_fee_id,
    purchaseID,
  });
}

export async function restore(data) {
  const restoreResult = await ApplicasterIAPModule.restore();

  console.log("Restore Result:", { restoreResult });

  if (Array.isArray(restoreResult) && restoreResult.length === 0) {
    throw new Error("No items to restore");
  }

  return data.forEach(({ productIdentifier: purchaseID }) => {
    if (!purchaseID) throw new Error(`PurchaseID: ${purchaseID} not exist`);

    return restoreAnItem(purchaseID, restoreResult);
  });
}
