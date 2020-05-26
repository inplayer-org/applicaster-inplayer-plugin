import { NativeModules } from "react-native";

// eslint-disable-next-line prefer-promise-reject-errors
const nullPromise = () => Promise.reject("InPlayer account bridge is null");
const defaultJWPlalyer = {
  setLicenseKey: nullPromise,
};

const { JWPlayerLicenceContext = defaultJWPlalyer } = NativeModules;

export const JWPlayerAndroidLicenceModule = {
  /**
   * Setting licence key to android JWPlayer
   * @param {String} licenceKey android licence key
   */
  async setLicenseKey(licenceKey) {
    try {
      return JWPlayerLicenceContext.setLicenseKey(licenceKey);
    } catch (e) {
      throw e;
    }
  },
};
