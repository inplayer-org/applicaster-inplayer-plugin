const valuesMap = new Map();
var initialized = false;
const localStorageNameSpace = "inPlayerLocalStoragePolyfill";
import { localStorage as LocalStorageNative } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";

export const localStoragePolyfillSync = async () => {
  console.log("localStoragePolyfillSync");
  valuesMap.forEach(async (value, key) => {
    await LocalStorageNative.setItem(key, value, localStorageNameSpace);
  });
  // const allValue = await LocalStorageNative.getAllItems(localStorageNameSpace);
  console.log("localStoragePolyfillSync1", { valuesMap });
};

export const localStoragePolyfillInitialize = async () => {
  if (!initialized) {
    global.localStorage;
    // console.log("localStoragePolyfillInitialize");
    // const allValue = await LocalStorageNative.getAllItems(
    //   localStorageNameSpace
    // );

    // initialized = true;
    // console.log("localStoragePolyfillInitialize2");
    // if (allValue) {
    //   for (let [key, value] of Object.entries(allValue)) {
    //     var newValue = value.substring(1, value.length - 1);
    //     newValue = newValue.replace(/\\/g, "");
    //     console.log({ value, key, value2: newValue });

    //     localStorage.setItem(key, newValue);
    //   }
    //   console.log("localStoragePolyfillInitialize1: Initialized", {
    //     valuesMap,
    //   });
    // }
  }
};

class LocalStorage {
  getItem(key) {
    const stringKey = String(key);
    if (valuesMap.has(key)) {
      return String(valuesMap.get(stringKey));
    }
    return null;
  }

  setItem(key, val) {
    valuesMap.set(String(key), String(val));
  }

  removeItem(key) {
    valuesMap.delete(key);
  }

  getAll() {
    return valuesMap.entries();
  }

  //   setAll(newData) {
  //     for (var i in newData) valuesMap[i] = newData[i];
  //   }

  clear() {
    valuesMap.clear();
  }

  key(i) {
    if (arguments.length === 0) {
      throw new TypeError(
        "Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      ); // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
    }
    var arr = Array.from(valuesMap.keys());
    return arr[i];
  }

  get length() {
    return valuesMap.size;
  }
}
const instance = new LocalStorage();

global.localStorage = new Proxy(instance, {
  set: function (obj, prop, value) {
    if (LocalStorage.prototype.hasOwnProperty(prop)) {
      instance[prop] = value;
    } else {
      instance.setItem(prop, value);
    }
    return true;
  },
  get: function (target, name) {
    if (LocalStorage.prototype.hasOwnProperty(name)) {
      return instance[name];
    }
    if (valuesMap.has(name)) {
      return instance.getItem(name);
    }
  },
});
