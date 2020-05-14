import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import { validateExternalPayment } from "./inPlayerService";
import R from "ramda";

const productIdentifierFromProducts = R.compose(
  R.prop("productIdentifier"),
  R.head,
  R.prop("products")
);

export function purchaseAnItem({ purchaseID, item_id, access_fee_id }) {
  console.log({ purchaseID, item_id, access_fee_id });

  if (purchaseID) {
    return retrieveProducts({ purchaseID })
      .then(ApplicasterIAPModule.purchase)
      .then((purchaseCompletion) => {
        return purchaseCompletion?.reciept;
      })
      .then((receipt) =>
        validateExternalPayment({ receipt, item_id, access_fee_id })
      )
      .then((result) => {
        console.log("Verification Result", { result });
      });
  } else {
    throw {
      Error: {
        message: `PurchaseID: ${purchaseID}  not exist`,
      },
    };
  }
}

export function retrieveProducts({ purchaseID }) {
  return ApplicasterIAPModule.products([purchaseID]).then(
    productIdentifierFromProducts
  );
}
