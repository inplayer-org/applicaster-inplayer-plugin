import { Alert } from "react-native";

export function showAlert(title, message) {
  Alert.alert(title, message);
}

function validateEmail(email) {
  const message = "Email is not valid";
  if (!email) return message;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false)
    return message;
  return null;
}

function validateUserName(name) {
  if (!name || name.length == 0) {
    return "Name can not be empty";
  }
  return null;
}

function validateConfirmationPassword(password, passwordConfirmation) {
  if (!password || !passwordConfirmation) {
    return "Password or Password confirmation fields shouldn't be empty";
  }
  if (password !== passwordConfirmation) {
    return "Password not equal confirmation password";
  }
  return null;
}

function validatePasswordLength(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return null;
}

function validatePasswordCharacters(password) {
  let regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  if (regex.test(password) === false) {
    return "Password should contain at least one lower case, one upper case, one special character and one number";
  }
  return null;
}

function validatePassword(password) {
  if (!password) return "Password shouldn't be empty";
  const validatePwdLengthMsg = validatePasswordLength(password);
  if (validatePwdLengthMsg != null) return validatePwdLengthMsg;
  const validatePwdCharsMsg  = validatePasswordCharacters(password);
  if (validatePwdCharsMsg != null) return validatePwdCharsMsg;
  return null;
}

function validateToken(token) {
  if (!token || token.length == 0) {
    return "Token should not be empty";
  }
  return null;
}

export function validateSignUpData(signUpData) {
  const { fullName, email, password, passwordConfirmation } = signUpData;
  const validateUserNameMsg = validateUserName(fullName);
  if (validateUserNameMsg != null) return validateUserNameMsg;
  const validateEmailMsg = validateEmail(email);
  if (validateEmailMsg != null) return validateEmailMsg;
  const validatePwdMsg = validatePassword(password);
  if (validatePwdMsg != null) return validatePwdMsg;
  const validateConfirmationPwdMsg = validateConfirmationPassword(password, passwordConfirmation);
  if (validateConfirmationPwdMsg != null) return validateConfirmationPwdMsg;
  return null;
}

export function validateNewPassword(newPwdData) {
  const { token, password, passwordConfirmation } = newPwdData;
  const validateTokenMsg = validateToken(token);
  if (validateTokenMsg != null) return validateTokenMsg;
  const validatePwdMsg = validatePassword(password);
  if (validatePwdMsg != null) return validatePwdMsg;
  const validateConfirmationPwdMsg = validateConfirmationPassword(password, passwordConfirmation);
  if (validateConfirmationPwdMsg != null) return validateConfirmationPwdMsg;
  return null;
}
