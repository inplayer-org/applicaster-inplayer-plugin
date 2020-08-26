import InPlayer from "@inplayer-org/inplayer.js";
import { checkStatus, params, errorResponse } from "./InPlayerUtils";
import { getSrcFromAsset } from "../Utils/OVPProvidersMapper";
import { initFromNativeLocalStorage, localStorage } from "../LocalStorageHack";
import { withTimeout, DEFAULT_NETWORK_TIMEOUT } from "../Utils";

import { assetPaymentRequired, externalAssetData } from "../Utils/PayloadUtils";
import { externalPurchaseValidationURL } from "./InPlayerServiceHelper";

const IN_PLAYER_LAST_EMAIL_USED_KEY = "com.inplayer.lastEmailUsed";

export async function setConfig(environment = "prod") {
  InPlayer.setConfig(environment);
}

export async function checkAccessForAsset2(assetId) {
  const assetData = await withTimeout(
    InPlayer.Asset.checkAccessForAsset(assetId),
    DEFAULT_NETWORK_TIMEOUT,
    "InPlayer.Asset.checkAccessForAsset"
  );
  return assetData;
}
export async function getAssetByExternalId(payload) {
  const assetData = externalAssetData({ payload });
  if (assetData) {
    const { externalAssetId, inplayerAssetType } = assetData;
    const result = await InPlayer.Asset.getExternalAsset(
      inplayerAssetType,
      externalAssetId
    );
    return result?.id || null;
  } else {
    return null;
  }
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

export function getAccessFees(assetId) {
  return InPlayer.Asset.getAssetAccessFees(assetId);
}

export function getAllPackages({ clientId, purchaseKeysMapping }) {
  console.log({ clientId, purchaseKeysMapping });
  return InPlayer.Asset.getPackage(clientId)
    .then((packagesList) => {
      return packagesList.collection;
    })
    .then(loadAllPackages)
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

export async function isAuthenticated(clientId) {
  try {
    await initFromNativeLocalStorage();
    // InPlayer.Account.isAuthenticated() returns true even if token expired
    // To handle this case InPlayer.Account.getAccount() was used
    await InPlayer.Account.getAccount();
    return true;
  } catch (err) {
    const res = await err.response.json();
    if (res?.code === 403) {
      await InPlayer.Account.refreshToken(clientId);
      return true;
    }
    return false;
  }
}

export async function login({ email, password, clientId, referrer }) {
  console.log("InPlayerService.login");
  await initFromNativeLocalStorage();
  email && (await localStorage.setItem(IN_PLAYER_LAST_EMAIL_USED_KEY, email));
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

  console.log({ clientId });
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

export async function requestPassword({ email, clientId }) {
  const result = await InPlayer.Account.requestNewPassword({
    email,
    merchantUuid: clientId,
    branding_id: null,
  });
  return result;
}

export async function setNewPassword({ password, token }) {
  await InPlayer.Account.setNewPassword(
    {
      password,
      passwordConfirmation: password,
    },
    token
  );
}

export async function signOut() {
  await initFromNativeLocalStorage();
  if (!InPlayer.Account.isAuthenticated()) {
    return false;
  } else {
    const result = await InPlayer.Account.signOut();
    return true;
  }
}

export async function getLastEmailUsed() {
  await initFromNativeLocalStorage();
  return localStorage.getItem(IN_PLAYER_LAST_EMAIL_USED_KEY);
}

//TODO: This func not working with Web, implement proper way in future
export async function validateExternalPayment({
  receipt,
  item_id,
  access_fee_id,
}) {
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
  console.log({ receipt });
  const response = await fetch(externalPurchaseValidationURL(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${InPlayer.Account.getToken().token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: params(body),
  });
  console.log({
    request: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${InPlayer.Account.getToken().token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: params(body),
    },
  });
  checkStatus(response);

  return await response.json();
}

// Currently is not working
export function unsubscribeNotifications() {
  InPlayer.unsubscribe();
}

// Currently is not working
export async function subscribeNotifications({ clientId, callbacks }) {
  console.log({ clientId: clientId });
  const iotData = await InPlayer.Notifications.getIotToken();

  return await InPlayer.Notifications.handleSubscribe(
    iotData,
    callbacks,
    clientId
  );
}
