import { NativeModules } from "react-native";

// eslint-disable-next-line prefer-promise-reject-errors
const nullPromise = () => Promise.reject("InPlayer payment bridge is null");
const defaultPayment = {
  checkAccessForAsset: nullPromise,
};

const { InPlayerPaymentBridge = defaultPayment } = NativeModules;

export const PaymentModule = {
  /**
   * Contact InPlayer server and validate if purchase was successfull.
   * @param {Dictionary} payload Dictionary with user data
   */
  async validate(payload) {
    try {
      return InPlayerPaymentBridge.validate(payload);
    } catch (e) {
      throw e;
    }
  },
};
