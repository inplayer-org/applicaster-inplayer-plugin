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

export async function restore(data) {
  try {
    const purchaseCompletion = await ApplicasterIAPModule.restore();
    return data.forEach((itemToRestore) => {
      const { productIdentifier: purchaseID } = itemToRestore;

      if (!purchaseID) throw new Error(`PurchaseID: ${purchaseID} not exist`);

      const [item_id, access_fee_id] = purchaseID.split("_");
      return externalPaymentValidation({
        purchaseCompletion,
        item_id,
        access_fee_id,
        purchaseID,
      });
    });
  } catch (err) {
    throw err;
  }
}
