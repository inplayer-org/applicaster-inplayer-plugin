import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import { validateExternalPayment } from "./inPlayerService";
import { localStorage } from "../LocalStorageHack";
import { parseJsonIfNeeded } from "@applicaster/zapp-react-native-utils/functionUtils";

import R from "ramda";

const IN_PLAYER_VALIDATING_PURCHASE = "com.inplayer.validating_purchase";

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
    return ApplicasterIAPModule.products(purchasableItems).then(
      R.prop("products")
    );
  } else {
    throw new Error(`PurchaseID: ${purchasableItems}  not exist`);
  }
}

async function extenralPaymentValidation({
  purchaseCompletion,
  purchaseID,
  item_id,
  access_fee_id,
}) {
  // const transactionIdentifier =
  //   purchaseCompletion?.purchase.transaction?.transactionIdentifier;
  const receipt = purchaseCompletion?.receipt;

  // let validatingPurchases = await localStorage.getItem(
  //   IN_PLAYER_VALIDATING_PURCHASE
  // );
  // validatingPurchases = (await parseJsonIfNeeded(validatingPurchases)) || {};
  // validatingPurchases[purchaseID] = transactionIdentifier;
  // await localStorage.setItem(
  //   IN_PLAYER_VALIDATING_PURCHASE,
  //   validatingPurchases
  // );
  const result = await validateExternalPayment({
    receipt,
    item_id,
    access_fee_id,
  });

  // await localStorage.removeItem(
  //   IN_PLAYER_VALIDATING_PURCHASE,
  // );

  return result;
}
