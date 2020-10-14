import React from "react";
import * as R from "ramda";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";

import ClientLogo from "../../UIComponents/ClientLogo";
import { mapKeyToStyle } from "../../../Utils/Customization";
import { useBackHandler, useToggleNavBar } from "../../../Utils/Hooks";
import SignupControls from "./SignupControls";
import { validateSignUpData } from "../../../Utils/Account";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 214,
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
    top: 58,
    left: 58,
  },
});

const SignUpMobile = (props) => {
  const { width: screenWidth } = useDimensions("window");
  const { screenStyles } = props;

  const signUp = (registrationData) => {
    const { createAccount, onSignUpError } = props;

    const errorData = validateData(registrationData);

    if (errorData) {
      onSignUpError(errorData);
    } else {
      createAccount(registrationData);
    }
  };

  const hardwareBack = () => {
    props?.onBackButton();
  };

  useBackHandler(hardwareBack);
  useToggleNavBar();

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
    <View style={[styles.container, { width: screenWidth || 1920 }]}>
      <View style={styles.clientLogoView}>
        <ClientLogo imageSrc={screenStyles.client_logo} />
      </View>
      <Text style={[styles.title, signupTextStyles]}>
        {screenStyles.signup_title_text || "Registration"}
      </Text>
      <SignupControls
        {...{
          screenStyles,
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
