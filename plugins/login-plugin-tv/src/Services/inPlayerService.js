import InPlayer from "@inplayer-org/inplayer.js";
import { checkStatus, params, errorResponse } from "./InPlayerUtils";
import { initFromNativeLocalStorage, localStorage } from "../LocalStorageHack";
import { localStorage as zappStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import { getSrcFromAsset } from "../Utils/OVPProvidersMapper";
import { withTimeout, DEFAULT_NETWORK_TIMEOUT } from "../Utils/networkUtils";

import { assetPaymentRequired } from "../Utils/payloadUtils";
import { externalPurchaseValidationURL } from "./InPlayerServiceHelper";

const IN_PLAYER_LAST_EMAIL_USED_KEY = "com.inplayer.lastEmailUsed";

export async function setConfig(environment = "prod") {
  console.log(`InPlayer.setConfig(${environment})`);
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

export async function isAuthenticated() {
  try {
    await initFromNativeLocalStorage();
    return InPlayer.Account.isAuthenticated();
  } catch (err) {
    console.log(err);
  }
}

async function authWithRefreshToken(response, clientId, referrer) {
  console.log("result", response);
  const status = response?.status && response?.status.toString();

  if (status !== 403) throw new Error(response.message);

  try {
    const refreshToken = response.headers.get("x-inplayer-token");
    const authBody = { refreshToken, clientId, referrer };
    console.log("Fetching with refreshToken", refreshToken);
    const data = await InPlayer.Account.authenticate(authBody);
    console.log("TOKEN AFTER REFRESH:", data);
    // if (data) await zappStorage.setItem("data", data);
  } catch (err) {
    console.log(console.log("ERR AFTER REFRESH:", err));
  }
}

export async function login({ email, password, clientId, referrer }) {
  try {
    const authBody = { email, password, clientId, referrer };
    await initFromNativeLocalStorage();
    await localStorage.setItem(IN_PLAYER_LAST_EMAIL_USED_KEY, email);

    const { access_token: token } = await InPlayer.Account.authenticate(
      authBody
    );
    if (token) await zappStorage.setItem("idToken", token);
  } catch (error) {
    const { response } = error;
    const result = await response.json();
    throw new Error(result.message);
    //return authWithRefreshToken(result, clientId, referrer);
  }
}

export async function signOut() {
  await initFromNativeLocalStorage();
  const { code } = await InPlayer.Account.signOut();

  if (code !== 200) throw new Error("Signing out failed");
  return zappStorage.setItem("idToken", {});
}

// export async function getLastEmailUsed() {
//   return localStorage.getItem(IN_PLAYER_LAST_EMAIL_USED_KEY);
// }

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
