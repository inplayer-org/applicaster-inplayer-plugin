import { NativeModules } from "react-native";

// eslint-disable-next-line prefer-promise-reject-errors
const nullPromise = () => Promise.reject("InPlayer asset bridge is null");
const defaultAsset = {
  checkAccessForAsset: nullPromise,
};

const { InPlayerAssetBridge = defaultAsset } = NativeModules;

export const AssetModule = {
  /**
   * This method checks and retrieves a customer’s entitlement to an asset
   * @param {Dictionary} payload Dictionary with user data
   */
  async checkAccessForAsset(payload) {
    try {
      return InPlayerAssetBridge.checkAccessForAsset(payload);
    } catch (e) {
      throw e;
    }
  },
};
