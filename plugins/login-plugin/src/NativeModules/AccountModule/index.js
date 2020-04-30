import InPlayer from "@inplayer-org/inplayer.js";
import {
  localStoragePolyfillInitialize,
  localStoragePolyfillSync,
} from "../../Utils/LocalStoragePolyfill";

export const AccountModule = {
  setConfigEnvironment() {
    InPlayer.setConfig("develop");
  },
  /**
   * Sign Up InPlayer user's account
   * @param {Dictionary} payload Dictionary with user data
   */
  async signUp(payload) {
    const {
      in_player_client_id,
      in_player_referrer,
      password,
      username,
      fullName,
    } = payload;
    try {
      const data = await InPlayer.Account.signUp({
        fullName: fullName,
        email: username,
        password: password,
        passwordConfirmation: password,
        clientId: in_player_client_id,
        type: "consumer",
        referrer: in_player_referrer,
        metadata: ["Dummy"],
      });
      await localStoragePolyfillSync();
      return data;
    } catch (e) {
      throw e;
    }
  },

  /**
   * Login to InPlayer user's account
   * @param {Dictionary} payload Dictionary with user data
   */
  async authenticate(payload) {
    const { in_player_client_id, password, username } = payload;

    try {
      const data = await InPlayer.Account.authenticate({
        email: username,
        password: password,
        clientId: in_player_client_id,
      });
      await localStoragePolyfillSync();
      return data;
    } catch (e) {
      throw e;
    }
  },

  /**
   * Check if user currently authenticated
   */
  async isAuthenticated(payload) {
    try {
      AccountModule.setConfigEnvironment();
      await localStoragePolyfillInitialize();
      return await InPlayer.Account.isAuthenticated();
    } catch (e) {
      throw e;
    }
  },

  /**
   * Sign our user from InPlayer account
   */
  async signOut(payload) {
    console.log("SIGNING_OUT");
    try {
      const data = await InPlayer.Account.signOut();
      await localStoragePolyfillSync();

      return data;
    } catch (e) {
      throw e;
    }
  },
};
