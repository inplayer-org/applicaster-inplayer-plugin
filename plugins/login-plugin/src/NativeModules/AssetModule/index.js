import InPlayer from "@inplayer-org/inplayer.js";
import { localStoragePolyfillSync } from "../../Utils/LocalStoragePolyfill";

export const AssetModule = {
  /**
   * This method checks and retrieves a customer’s entitlement to an asset
   * @param {Dictionary} payload Dictionary with user data
   */
  async checkAccessForAsset(payload) {
    const { id } = payload;
    console.log({ id });
    try {
      const data = await InPlayer.Asset.checkAccessForAsset(id);
      await localStoragePolyfillSync();
      // const payloadData = AssetModule.getAssetAccessFees(id);
      // await localStoragePolyfillSync();
      // console.log({ payloadData });
      return data;
    } catch (e) {
      console.log("Error", { e });
      throw e;
    }
  },
  async getAssetAccessFees(id) {
    console.log({ id });
    try {
      const data = await InPlayer.Asset.getAssetAccessFees(id);
      await localStoragePolyfillSync();
      return data;
    } catch (e) {
      console.log("Error", { e });
      throw e;
    }
  },
};
