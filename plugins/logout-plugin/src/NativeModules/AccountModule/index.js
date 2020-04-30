import InPlayer from "@inplayer-org/inplayer.js";

export const AccountModule = {
  /**
   * Sign our user from InPlayer account
   */
  async signOut(payload) {
    try {
      const data = await InPlayer.Account.signOut();
      await localStoragePolyfillSync();

      return data;
    } catch (e) {
      throw e;
    }
  },
};
