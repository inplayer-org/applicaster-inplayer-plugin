import React from "react";
import * as R from "ramda";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";

import { mapKeyToStyle } from "../../../Utils/Customization";

import LoginControls from "./LoginControls";
import Title from "./Title";
import Subtitle from "./Subtitle";
import Paragraph from "./Paragraph";
import ClientLogo from "../../UIComponents/ClientLogo";
import SignUpControls from "./SignUpControls";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  loginControls: {
    position: "relative",
    width: 556,
    marginTop: 232,
    marginRight: 250,
  },
  singUpControls: {
    marginTop: 232,
    width: 556,
  },
  contentWrapper: {
    width: 687,
    marginTop: 232,
    marginLeft: 259,
    marginRight: 168,
  },
  clientLogoView: {
    height: 100,
    width: 350,
    position: "absolute",
    top: 0,
    left: 58,
  },
});

const LoginInterface = (props) => {
  const {
    login: onLogin,
    errorMessage,
    signUp: onSignup,
    screenStyles,
    screenStyles: { client_logo, login_title_text, main_description_text },
  } = props;

  console.log({ props });

  const titleStyles = React.useMemo(
    () => mapKeyToStyle("login_title", screenStyles),
    []
  );

  const subtitleStyles = React.useMemo(
    () => mapKeyToStyle("main_description", screenStyles),
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
        <Paragraph />
      </View>
      <View>
        <LoginControls
          {...{ style: styles.loginControls, onLogin, errorMessage }}
        />
        <SignUpControls style={styles.singUpControls} onPress={onSignup} />
      </View>
    </View>
  );
};

LoginInterface.propTypes = {
  login: PropTypes.func,
  signUp: PropTypes.func,
  errorMessage: PropTypes.string,
  screenStyles: PropTypes.object,
};

LoginInterface.defaultProps = {
  login: identity,
  signUp: identity,
  screenStyles: {},
};

export default LoginInterface;
