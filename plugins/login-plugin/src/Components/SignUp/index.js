import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { container, input, button, buttonText } from "../Styles";
import { validateEmail, validatePassword } from "../../Utils/Account";

const styles = StyleSheet.create({
  container: {
    ...container,
    width: Dimensions.get("window").width,
  },

  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    color: "white",
    marginTop: 62,
    marginBottom: 80,
  },

  input,
  button,
  buttonText,
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 35,
    marginTop: 20,
  },
  backButtonText: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
  },
});

const SignUp = (props) => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [password, setPassword] = useState(null);

  const signUp = () => {
    const { createAccount, onSignUpError } = props;
    const title = "Sign Up form issue";
    if (!fullName || fullName.length == 0) {
      onSignUpError({
        title,
        message: "Name can not be empty",
      });
      return;
    } else if (validateEmail(email) == false) {
      onSignUpError({ title, message: "Email is not valid" });
      return;
    } else if (validatePassword(password) == false) {
      onSignUpError({
        title,
        message: "Password must be at least 8 characters",
      });
      return;
    } else if (password !== passwordConfirmation) {
      onSignUpError({
        title,
        message: "Password not equal confirmation password",
      });
      return;
    }
    createAccount({ fullName, email, password });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={props?.onSiginUpBack}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>InPlayer Demo</Text>
      <TextInput
        autoCapitalize="words"
        placeholder="Enter your name"
        placeholderTextColor={"white"}
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        placeholderTextColor={"white"}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        placeholderTextColor={"white"}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password Confirmation"
        placeholderTextColor={"white"}
        style={styles.input}
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />

      <TouchableOpacity onPress={signUp}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
