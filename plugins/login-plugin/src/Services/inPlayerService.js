import { ApplicasterIAPModule } from "@applicaster/applicaster-iap";
import InPlayer from "@inplayer-org/inplayer.js";

import { getSrcFromProvider } from "../Utils/OVPProvidersMapper";
import { initFromNativeLocalStorage, localStorage } from "../LocalStorageHack";
import { withTimeout, DEFAULT_NETWORK_TIMEOUT, inspect } from "../Utils";

import {
  inPlayerAssetId,
  retrievePurchaseProductId,
} from "../Utils/PayloadUtils";

const IN_PLAYER_LAST_EMAIL_USED_KEY = "com.inplayer.lastEmailUsed"

export async function setConfig() {
  console.log('InPlayer.setConfig("develop")')
  InPlayer.setConfig("develop")
}

export async function checkAccessForAsset2(assetId) {
  const assetData = await withTimeout(
    InPlayer.Asset.checkAccessForAsset(assetId),
    DEFAULT_NETWORK_TIMEOUT,
    "InPlayer.Asset.checkAccessForAsset"
  );
  return assetData;
}

export async function checkAccessOrPurchaseWorkflow({assetId: assetId}) {
  const workflowPromise = checkAccessForAsset2(assetId)
    .then((asset) => ({asset, src: getSrcFromAsset(asset)}))
    .then(inspect('checkAccessOrPurchaseWorkflow:'))
  return workflowPromise;

}

export async function isAuthenticated() {
  await initFromNativeLocalStorage()
  return InPlayer.Account.isAuthenticated()
}

export async function login({ email, password, clientId, referrer}) {
  console.log("InPlayerService.login")
  await initFromNativeLocalStorage()
  await localStorage.setItem(IN_PLAYER_LAST_EMAIL_USED_KEY, email)
  try {
    return await InPlayer.Account.authenticate({
      email,
      password,
      clientId,
      referrer,
    })
  } catch (e) {
    const { response } = e;
    if (response && response.status == 403) {
      console.log("Fetching with refreshToken");
      const refreshToken = response.headers.get("x-inplayer-token")
      console.log("Fetching with refreshToken", refreshToken);
      return await InPlayer.Account.authenticate({
        refreshToken,
        clientId,
        referrer,
      })
    } else {
      throw e
    }
  }

}

export async function signUp(params) {
  const {
    fullName,
    email,
    password,
    clientId,
    referrer,
  } = params;
  await initFromNativeLocalStorage()
  return await InPlayer.Account.signUp({
    fullName,
    email,
    password,
    passwordConfirmation: password,
    clientId,
    referrer,
    metadata: ["Dummy"],
    type: "consumer"
  })
}

export async function signOut() {
  await initFromNativeLocalStorage()
  return await InPlayer.Account.signOut();
}

export async function getLastEmailUsed() {
  await initFromNativeLocalStorage()
  return localStorage.getItem(IN_PLAYER_LAST_EMAIL_USED_KEY)
}
