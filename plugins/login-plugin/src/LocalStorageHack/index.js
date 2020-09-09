import {
  InPlayerLocalStorageHack,
  initFromNativeLocalStorage,
} from "./InPlayerLocalStorageHack";
import { Platform } from "react-native";

console.log(Platform.OS);

const localStorage = new InPlayerLocalStorageHack();
if (Platform.OS !== "web") {
  global.localStorage = localStorage;
}

export { initFromNativeLocalStorage, localStorage };
