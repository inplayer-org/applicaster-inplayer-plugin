import * as R from "ramda";
import { localStorage as storage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import { parseJsonIfNeeded } from "@applicaster/zapp-react-native-utils/functionUtils";

async function setToLocalStorage(key, value, namespace) {
  return storage.setItem(key, value, namespace);
}

async function getFromLocalStorage(key, namespace) {
  return storage.getItem(key, namespace);
}

async function removeFromLocalStorage(key, namespace) {
  return storage.setItem(key, JSON.stringify({}), namespace);
}

async function isValueInStorage(key, namespace) {
  try {
    let token = await getFromLocalStorage(key, namespace);

    if (token === null) return false;

    if (typeof token === "string") {
      token = parseJsonIfNeeded(token);
    }

    if (Array.isArray(token)) return !!token.length;
    if (typeof token === "object") return !R.isEmpty(token);

    return !!token;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export {
  setToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  isValueInStorage,
};
