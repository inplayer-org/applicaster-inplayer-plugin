import React, { useState, useEffect } from "react";
import * as R from "ramda";
import PropTypes from "prop-types";
import { View, BackHandler, Text, StyleSheet } from "react-native";
import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";

import ClientLogo from "../../UIComponents/ClientLogo";
import { mapKeyToStyle } from "../../../Utils/Customization";
import SignupControls from "./SignupControls";
import { validateSignUpData } from "../../../Utils/Account";
import BackButton from "../../UIComponents/Buttons/BackButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 214,
    borderColor: "red",
    borderWidth: 1,
  },
  title: {
    color: "rgba(33, 35, 36, 1)",
    fontSize: 60,
    marginBottom: 66,
  },
  clientLogoView: {
    height: 100,
    width: 350,
    position: "absolute",
    top: 0,
    left: 58,
  },
});

const SignUpMobile = (props) => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { width: screenWidth } = useDimensions("window");
  const { screenStyles } = props;

  const signUp = (registrationData) => {
    const { createAccount, onSignUpError } = props;

    const errorData = validateData(registrationData);

    if (errorData) {
      onSignUpError(errorData);
    } else {
      createAccount({ fullName, email, password });
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", hardwareBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", hardwareBack);
    };
  }, []);

  const hardwareBack = () => {
    props?.onBackButton();
    return true;
  };

  const validateData = ({ fullName, email, password }) => {
    const title = "Sign Up form issue";
    const signUpData = {
      fullName: fullName,
      email: email,
      password: password,
      passwordConfirmation: password,
    };
    const message = validateSignUpData(signUpData);
    return message ? { title, message } : null;
  };

  const signupTextStyles = React.useMemo(
    () => mapKeyToStyle("signup_title", screenStyles) || {},
    []
  );

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <View style={styles.clientLogoView}>
        <ClientLogo imageSrc={screenStyles.client_logo} />
      </View>
      <Text style={[styles.title, signupTextStyles]}>
        {screenStyles.signup_title_text || "Registration"}
      </Text>
      <BackButton screenStyles={screenStyles} onPress={props?.onBackButton} />
      <SignupControls
        {...{
          screenStyles,
          setFullName,
          setPassword,
          setEmail,
          onSignup: signUp,
        }}
      />
    </View>
  );
};

SignUpMobile.propTypes = {
  createAccount: PropTypes.func,
  onSignUpError: PropTypes.func,
  screenStyles: PropTypes.object,
  onBackButton: PropTypes.func,
};

SignUpMobile.defaultProps = {
  createAccount: R.identity,
  onSignUpError: R.identity,
  onBackButton: R.identity,
  screenStyles: {},
};

export default SignUpMobile;
