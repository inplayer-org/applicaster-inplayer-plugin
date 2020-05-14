import { Platform } from "react-native";

import R from "ramda";

import InPlayer from "@inplayer-org/inplayer.js";
import {
  checkStatus,
  params,
  errorResponse,
  buildParams,
  parseJSON,
  buildURLwithQueryParams,
} from "./InPlayerUtils";
import { getSrcFromAsset } from "../Utils/OVPProvidersMapper";
import { initFromNativeLocalStorage, localStorage } from "../LocalStorageHack";
import {
  withRetry,
  withTimeout,
  DEFAULT_NETWORK_TIMEOUT,
  inspect,
} from "../Utils";

import {
  inPlayerAssetId,
  retrievePurchaseProductId,
  assetPaymentRequired,
} from "../Utils/PayloadUtils";

const IN_PLAYER_LAST_EMAIL_USED_KEY = "com.inplayer.lastEmailUsed";

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

export async function checkAccessForAsset({
  assetId,
  retryInCaseFail = false,
  interval = 1000,
  tries = 5,
}) {
  try {
    const asset = await checkAccessForAsset2(assetId);
    return { asset, src: getSrcFromAsset(asset) };
  } catch (error) {
    if (retryInCaseFail && tries > 0) {
      await new Promise((r) => setTimeout(r, interval));

      return await checkAccessForAsset({
        assetId,
        retryInCaseFail: true,
        interval: interval * 2,
        tries: tries - 1,
      });
    } else {
      if (assetPaymentRequired(error)) {
        throw { ...error, requestedToPurchase: assetPaymentRequired(error) };
      }
      throw error;
    }
  }
}

export function retrievePurchasableItems({ feesToSearch, allPackagesData }) {
  const searchedPackage = findPackageByAssetFees({
    feesToSearch,
    allPackagesData,
  });
  return searchedPackage?.purchase_data;
}

export function findPackageByAssetFees({ feesToSearch, allPackagesData }) {
  return allPackagesData.find((packageData) => {
    return R.equals(packageData.access_fees, feesToSearch);
  });
}

export function getAccessFees(assetId) {
  return InPlayer.Asset.getAssetAccessFees(assetId);
}

export function getAllPackages(clientId) {
  return InPlayer.Asset.getPackage(clientId)
    .then((packagesList) => {
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
      return { ...fee, package_id: id, purchase_id: `${id}_${fee.id}` };
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

function externalPurchaseValidationURL() {
  // URL Example: https://staging-v2.inplayer.com/v2/external-payments/apple/validate
  const platform = Platform.OS === "ios" ? "apple" : "android";
  return `${InPlayer.config.BASE_URL}/v2/external-payments/${platform}/validate`;
}

//TODO: This func not working with Web, implement proper way in future
export async function validateExternalPayment({
  receipt,
  item_id,
  access_fee_id,
}) {
  console.log("validateExternalPayment", { receipt, item_id, access_fee_id });
  if (!InPlayer.Account.isAuthenticated()) {
    errorResponse(401, {
      code: 401,
      message: "User is not authenticated",
    });
  }

  if (!receipt) {
    throw new Error("Payment receipt is a required parameter!");
  }
  if (!item_id) {
    throw new Error("Payment item_id is a required parameter!");
  }
  if (!access_fee_id) {
    throw new Error("Payment access_fee_id is a required parameter!");
  }

  let body = {
    receipt,
    item_id,
    access_fee_id,
  };

  const response = await fetch(externalPurchaseValidationURL(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${InPlayer.Account.getToken().token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: params(body),
  });

  checkStatus(response);

  return await response.json();
}
