import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";

import LoginControls from "./LoginControls";
import Title from "./Title";
import Subtitle from "./Subtitle";
import Paragraph from "./Paragraph";
import ClientLogo from "./ClientLogo";

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
    screenStyles: { client_logo } = {},
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.clientLogoView}>
        <ClientLogo imageSrc={client_logo} />
      </View>
      <View style={styles.contentWrapper}>
        <Title />
        <Subtitle />
        <Paragraph />
      </View>
      <LoginControls
        {...{ style: styles.loginControls, onLogin, errorMessage }}
      />
    </View>
  );
};

LoginInterface.propTypes = {
  login: PropTypes.func,
  errorMessage: PropTypes.string,
  screenStyles: PropTypes.object,
};

LoginInterface.defaultProps = {
  login: identity,
  screenStyles: {},
};

export default LoginInterface;
