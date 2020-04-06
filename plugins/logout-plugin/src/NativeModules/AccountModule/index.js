import { NativeModules } from "react-native";

// eslint-disable-next-line prefer-promise-reject-errors
const nullPromise = () => Promise.reject("InPlayer account bridge is null");
const defaultAccount = {
  signOut: nullPromise,
};

const { InPlayerAccountBridge = defaultAccount } = NativeModules;

export const AccountModule = {
  /**
   * Sign our user from InPlayer account
   */
  async signOut(payload) {
    try {
      return InPlayerAccountBridge.signOut(payload);
    } catch (e) {
      throw e;
    }
  },
};
