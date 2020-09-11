import {
  InPlayerLocalStorageHack,
  initFromNativeLocalStorage,
} from "./InPlayerLocalStorageHack";
import { Platform } from "react-native";

const isSamsung = Platform.OS === "samsung_tv" || Platform.OS === "web";
const localStorage = new InPlayerLocalStorageHack();
if (!isSamsung) {
  global.localStorage = localStorage;
}

export { initFromNativeLocalStorage, localStorage };
