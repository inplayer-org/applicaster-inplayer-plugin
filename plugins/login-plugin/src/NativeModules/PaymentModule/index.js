import InPlayer from "@inplayer-org/inplayer.js";
import { localStoragePolyfillSync } from "../../Utils/LocalStoragePolyfill";

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
