import { Alert } from "react-native";

export function validateEmail(email) {
  if (!email) {
    return false;
  }
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function showAlert(title, message) {
  Alert.alert(title, message);
}

export function validatePassword(password) {
  if (!password) {
    return false;
  }
  var regex = /[A-Za-z0-9_]\w{7,20}$/;

  return password.match(regex) || false;
}
