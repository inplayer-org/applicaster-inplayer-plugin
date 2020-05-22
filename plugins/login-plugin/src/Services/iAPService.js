import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import { validateExternalPayment } from "./inPlayerService";
import R from "ramda";

export function purchaseAnItem({ purchaseID, item_id, access_fee_id }) {
  console.log({ purchaseID, item_id, access_fee_id });

  if (purchaseID) {
    return ApplicasterIAPModule.purchase(purchaseID)
      .then((purchaseCompletion) => {
        return purchaseCompletion?.receipt;
      })
      .then((receipt) =>
        validateExternalPayment({ receipt, item_id, access_fee_id })
      )
      .then((result) => {
        console.log("Verification Result", { result });
      });
  } else {
    throw new Error(`PurchaseID: ${purchaseID}  not exist`);
  }
}

export function retrieveProducts(purchasableItems) {
  if (purchasableItems) {
    console.log({ purchasableItems });
    return ApplicasterIAPModule.products(purchasableItems)
    .then(R.prop("products"));
  } else {
    throw new Error(`PurchaseID: ${purchasableItems}  not exist`);
  }
}
