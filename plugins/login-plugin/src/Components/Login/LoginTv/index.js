import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";

import { mapKeyToStyle } from "../../../Utils/Customization";
import { useBackHandler } from "../../../Utils/Hooks";

import FocusableElements from "./FocusableElements";
import Title from "./Title";
import Subtitle from "./Subtitle";
import Paragraph from "./Paragraph";
import ClientLogo from "../../UIComponents/ClientLogo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  loginControls: {
    position: "relative",
    width: 556,
    marginTop: 300,
    marginRight: 250,
  },
  singUpControls: {
    marginTop: 270,
    width: 556,
  },
  contentWrapper: {
    width: 687,
    marginTop: 310,
    marginLeft: 259,
    marginRight: 168,
  },
  clientLogoView: {
    height: 100,
    width: 350,
    position: "absolute",
    top: 58,
    left: 58,
  },
  paragraphContainer: {
    marginTop: 56,
  },
});

const LoginInterface = (props) => {
  const {
    login: onLogin,
    errorMessage,
    signUp: onSignup,
    accountFlowCallback,
    screenStyles,
    screenStyles: {
      client_logo,
      login_title_text,
      main_description_text,
      optional_instructions_1_text,
      optional_instructions_2_text,
    },
  } = props;

  useBackHandler(hardwareBack);

  const hardwareBack = () => {
    accountFlowCallback(false);
  };

  const titleStyles = React.useMemo(
    () => mapKeyToStyle("login_title", screenStyles),
    []
  );

  const subtitleStyles = React.useMemo(
    () => mapKeyToStyle("main_description", screenStyles),
    []
  );

  const paragraphOneStyles = React.useMemo(
    () => mapKeyToStyle("optional_instructions_1", screenStyles),
    []
  );

  const paragraphTwoStyles = React.useMemo(
    () => ({
      ...mapKeyToStyle("optional_instructions_2", screenStyles),
      marginTop: 26,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.clientLogoView}>
        <ClientLogo imageSrc={client_logo} />
      </View>
      <View style={styles.contentWrapper}>
        <Title label={login_title_text} styles={titleStyles} />
        <Subtitle label={main_description_text} styles={subtitleStyles} />
        <View style={styles.paragraphContainer}>
          <Paragraph
            label={optional_instructions_1_text}
            styles={paragraphOneStyles}
          />
          <Paragraph
            label={optional_instructions_2_text}
            styles={paragraphTwoStyles}
          />
        </View>
      </View>
      <FocusableElements
        {...{
          onLogin,
          errorMessage,
          onSignup,
          screenStyles,
          loginStyles: styles.loginControls,
          signupStyles: styles.singUpControls,
        }}
      />
    </View>
  );
};

LoginInterface.propTypes = {
  login: PropTypes.func,
  signUp: PropTypes.func,
  accountFlowCallback: PropTypes.func,
  errorMessage: PropTypes.string,
  screenStyles: PropTypes.object,
};

LoginInterface.defaultProps = {
  login: identity,
  signUp: identity,
  accountFlowCallback: identity,
  screenStyles: {},
};

export default LoginInterface;
