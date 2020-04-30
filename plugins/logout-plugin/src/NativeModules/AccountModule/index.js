import InPlayer from "@inplayer-org/inplayer.js";

export const AccountModule = {
  /**
   * Sign our user from InPlayer account
   */
  async signOut(payload) {
    console.log("signOut", {
      getAll: localStorage.getAll(),
      inplayer_token: localStorage.getItem("inplayer_token"),
    });

    try {
      return await InPlayer.Account.signOut();
    } catch (e) {
      throw e;
    }
  },
};
