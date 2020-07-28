
import { InPlayerLocalStorageHack, initFromNativeLocalStorage } from "./InPlayerLocalStorageHack";

const localStorage = new InPlayerLocalStorageHack();
global.localStorage = localStorage;

export { initFromNativeLocalStorage, localStorage };
