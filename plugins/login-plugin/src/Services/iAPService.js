import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import { validateExternalPayment } from "./inPlayerService";

import R from "ramda";

export function purchaseAnItem({ purchaseID, item_id, access_fee_id }) {
  console.log({ purchaseID, item_id, access_fee_id });

  if (purchaseID) {
    return ApplicasterIAPModule.purchase(purchaseID, false)
      .then((purchaseCompletion) =>
        extenralPaymentValidation({
          purchaseCompletion,
          purchaseID,
          item_id,
          access_fee_id,
        })
      )
      .then(ApplicasterIAPModule.finishPurchasedTransaction);
  } else {
    throw new Error(`PurchaseID: ${purchaseID}  not exist`);
  }
}

export function retrieveProducts(purchasableItems) {
  if (purchasableItems) {
    console.log({ purchasableItems });
    return ApplicasterIAPModule.products(purchasableItems).then(
      R.prop("products")
    );
  } else {
    throw new Error(`PurchaseID: ${purchasableItems}  not exist`);
  }
}

async function extenralPaymentValidation({
  purchaseCompletion,
  item_id,
  access_fee_id,
}) {
  const transactionIdentifier =
    purchaseCompletion?.purchase.transaction?.transactionIdentifier;
  const receipt = purchaseCompletion?.receipt;
  const result = await validateExternalPayment({
    receipt,
    item_id,
    access_fee_id,
  });
  console.log("Verification Result:", { result });
  return transactionIdentifier;
}
