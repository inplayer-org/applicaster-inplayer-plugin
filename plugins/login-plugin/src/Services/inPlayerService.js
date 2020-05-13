import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import R from "ramda";

import InPlayer from "@inplayer-org/inplayer.js";

import { getSrcFromAsset } from "../Utils/OVPProvidersMapper";
import { initFromNativeLocalStorage, localStorage } from "../LocalStorageHack";
import { withTimeout, DEFAULT_NETWORK_TIMEOUT, inspect } from "../Utils";

import {
  inPlayerAssetId,
  retrievePurchaseProductId,
  assetPaymentRequired,
} from "../Utils/PayloadUtils";

const IN_PLAYER_LAST_EMAIL_USED_KEY = "com.inplayer.lastEmailUsed";
var isAllPackagesLoading = false;
var allPackagesData = [];

export async function setConfig() {
  console.log('InPlayer.setConfig("develop")');
  InPlayer.setConfig("develop");
}

export async function checkAccessForAsset2(assetId) {
  const assetData = await withTimeout(
    InPlayer.Asset.checkAccessForAsset(assetId),
    DEFAULT_NETWORK_TIMEOUT,
    "InPlayer.Asset.checkAccessForAsset"
  );
  return assetData;
}

export function checkAccessForAsset({ assetId }) {
  return checkAccessForAsset2(assetId)
    .then((asset) => ({ data: { asset, src: getSrcFromAsset(asset) } }))
    .catch((error) => {
      console.log("checkAccessForAsset2", {
        error,
        assetPaymentRequired: assetPaymentRequired(error),
      });
      if (assetPaymentRequired(error)) {
        return { requesetedToPurchase: assetPaymentRequired(error) };
      }
      throw error;
    });
}

export function retrievePurchasableItems({ feesToSearch, allPackagesData }) {
  console.log("retrievePurchasableItems", { findPackageByAssetFees });
  const searchedPackage = findPackageByAssetFees({
    feesToSearch,
    allPackagesData,
  });
  console.log("searchedPackage", { searchedPackage });
  return searchedPackage?.purchase_data;
}

export function findPackageByAssetFees({ feesToSearch, allPackagesData }) {
  console.log("findPackageByAssetFees", { feesToSearch, allPackagesData });

  return allPackagesData.find((packageData) => {
    return R.equals(packageData.access_fees, feesToSearch);
  });
}

// export function checkAccessOrPurchaseWorkflow({ assetId }) {
//   console.log({ assetId });
//   return checkAccessForAsset2(assetId)
//     .then((asset) => ({ asset, src: getSrcFromAsset(asset) }))
//     .then(inspect("checkAccessOrPurchaseWorkflow:"))
//     .catch((error) => {
//       if (assetPaymentRequired(error)) {
//         return;
//       } else {
//         throw console.error();
//       }
//     })
//     .then(() => getAccessFees(assetId))
//     .then(findPackageByAssetFees)
//     .then((packageData) => {
//       return packageData.purchase_data;
//     });
// }

export function getAccessFees(assetId) {
  return InPlayer.Asset.getAssetAccessFees(assetId);
}

export function getAllPackages(clientId) {
  console.log("getAllPackages", clientId);
  return InPlayer.Asset.getPackage(clientId)
    .then((packagesList) => {
      console.log("packagesList", { packagesList });
      return packagesList.collection;
    })
    .then(loadAllPackages)
    .then(retrieveMappedAccessFees)
    .catch((error) => {
      console.log({ error });
    });
}

export function loadAllPackages(collection) {
  const promises = collection.map((item) => {
    return InPlayer.Asset.getPackage(item.id);
  });

  return Promise.all(promises);
}

export function retrieveMappedAccessFees(packages) {
  return packages.map((packageData) => {
    const { access_fees, id } = packageData;
    const purchaseData = access_fees.map((fee) => {
      return { ...fee, purchase_id: `${id}_${fee.id}` };
    });
    return { ...packageData, purchase_data: purchaseData };
  });
}

export async function isAuthenticated() {
  await initFromNativeLocalStorage();
  return InPlayer.Account.isAuthenticated();
}

export async function login({ email, password, clientId, referrer }) {
  console.log("InPlayerService.login");
  await initFromNativeLocalStorage();
  await localStorage.setItem(IN_PLAYER_LAST_EMAIL_USED_KEY, email);
  try {
    return await InPlayer.Account.authenticate({
      email,
      password,
      clientId,
      referrer,
    });
  } catch (e) {
    const { response } = e;
    if (response && response.status == 403) {
      console.log("Fetching with refreshToken");
      const refreshToken = response.headers.get("x-inplayer-token");
      console.log("Fetching with refreshToken", refreshToken);
      return await InPlayer.Account.authenticate({
        refreshToken,
        clientId,
        referrer,
      });
    } else {
      throw e;
    }
  }
}

export async function signUp(params) {
  const { fullName, email, password, clientId, referrer } = params;
  await initFromNativeLocalStorage();
  return await InPlayer.Account.signUp({
    fullName,
    email,
    password,
    passwordConfirmation: password,
    clientId,
    referrer,
    metadata: ["Dummy"],
    type: "consumer",
  });
}

export async function signOut() {
  await initFromNativeLocalStorage();
  return await InPlayer.Account.signOut();
}

export async function getLastEmailUsed() {
  await initFromNativeLocalStorage();
  return localStorage.getItem(IN_PLAYER_LAST_EMAIL_USED_KEY);
}
