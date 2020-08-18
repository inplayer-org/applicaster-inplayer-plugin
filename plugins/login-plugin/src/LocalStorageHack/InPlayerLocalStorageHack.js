import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";

const IN_PLAYER_LOCAL_STORAGE_NATIVE_KEY = "com.inplayer.localStorage";
let inMemoryStore = null;
let initPromise = null;
let isInitialized = false;

export function initFromNativeLocalStorage() {
  if (!initPromise) {
    console.debug("InPlayerLocalStorageHack: calling AsyncStorage.getItem");

    initPromise = localStorage
      .getItem("base", IN_PLAYER_LOCAL_STORAGE_NATIVE_KEY)
      .then((json) => {
        console.debug("AsyncStorage.getItem returned:", json);
        inMemoryStore = new Map(JSON.parse(json));
        console.debug("inMemoryStore is invitialized:", inMemoryStore);
        return inMemoryStore;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        isInitialized = true;
      });
  }
  return initPromise;
}

function persistInMemoryStoreInBackground() {
  const serializedStore = JSON.stringify(Array.from(inMemoryStore.entries()));
  return localStorage
    .setItem("base", serializedStore, IN_PLAYER_LOCAL_STORAGE_NATIVE_KEY)
    .then(
      () => {
        console.debug(
          "localStorage persisted to AsyncStorage",
          serializedStore
        );
      },
      (error) => {
        console.error("error persisting to AsyncStorage", error);
      }
    );
}

function assertInitialized() {
  if (!isInitialized) {
    throw new Error(
      "Trying to use InPlayerLocalStorageHack before it was initialized"
    );
  }
}

function safeMemoryStore() {
  assertInitialized();
  return inMemoryStore;
}

export class InPlayerLocalStorageHack {
  get initPromise() {
    return initPromise;
  }
  get isInitialized() {
    return isInitialized;
  }
  get inMemoryStore() {
    return safeMemoryStore();
  }

  get length() {
    return safeMemoryStore().size;
  }

  getItem(key) {
    return safeMemoryStore().get(String(key));
  }

  setItem(key, val) {
    console.log("SetItem", { key, val, stringify: JSON.stringify(val) });
    if (safeMemoryStore().get(String(key)) !== String(val)) {
      safeMemoryStore().set(String(key), String(val));
      return persistInMemoryStoreInBackground();
    }
    return Promise.resolve();
  }

  removeItem(key) {
    safeMemoryStore().delete(key);
    return persistInMemoryStoreInBackground();
  }

  getAll() {
    return safeMemoryStore().entries();
  }

  clear() {
    safeMemoryStore().clear();
    return persistInMemoryStoreInBackground();
  }

  key(keyIndex) {
    if (!Number.isInteger(keyIndex)) {
      throw new TypeError(
        `argument 1 to InPlayerLocalStorageHack.key must be integer but got ${keyIndex}`
      );
    }
    var orderedKeys = Array.from(safeMemoryStore().keys());

    return orderedKeys[i];
  }
}
