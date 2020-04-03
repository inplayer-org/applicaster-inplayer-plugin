import { NativeModules } from "react-native";

// eslint-disable-next-line prefer-promise-reject-errors
const nullPromise = () => Promise.reject("InPlayer account bridge is null");
const defaultAccount = {
  signUp: nullPromise,
  authenticate: nullPromise,
  isAuthenticated: nullPromise,
  signOut: nullPromise,
};

const { InPlayerAccount = defaultAccount } = NativeModules;

export const AccountModule = {
  /**
   * Sign Up InPlayer user's account
   * @param {Array} payload Dictionary with user data
   */
  async signUp(payload) {
    try {
      return InPlayerAccount.signUp(payload);
    } catch (e) {
      throw e;
    }
  },

  /**
   * Login to InPlayer user's account
   * @param {Array} payload Dictionary with user data
   */
  async authenticate(payload) {
    try {
      return InPlayerAccount.signUp(payload);
    } catch (e) {
      throw e;
    }
  },

  /**
   * Check if user currently authenticated
   */
  async isAuthenticated() {
    try {
      return InPlayerAccount.signUp(payload);
    } catch (e) {
      throw e;
    }
  },

  /**
   * Sign our user from InPlayer account
   */
  async signOut() {
    try {
      return InPlayerAccount.signUp(payload);
    } catch (e) {
      throw e;
    }
  },
};
