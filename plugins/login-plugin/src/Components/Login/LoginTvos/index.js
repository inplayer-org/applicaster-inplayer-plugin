import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";

import LoginControls from "./LoginControls";
import Title from "./Title";
import Subtitle from "./Subtitle";
import Paragraph from "./Paragraph";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", width: "100%" },
  loginControls: {
    position: "relative",
    width: 556,
    marginTop: 384,
    marginRight: 250,
  },
  contentWrapper: {
    width: 687,
    marginTop: 232,
    marginLeft: 259,
    marginRight: 168,
  },
});

const LoginInterface = ({ login: onLogin, errorMessage }) => (
  <View style={styles.container}>
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

LoginInterface.propTypes = {
  onLogin: PropTypes.func,
  errorMessage: PropTypes.string,
};

LoginInterface.defaultProps = {
  onLogin: identity,
};

export default LoginInterface;
