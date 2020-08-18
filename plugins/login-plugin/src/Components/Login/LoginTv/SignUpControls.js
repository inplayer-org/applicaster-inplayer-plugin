import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import Button from "../../UIComponents/Buttons/FocusableButton";

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 23,
  },
});

const SignUpControls = (props) => (
  <View style={props.style}>
    <Text style={styles.text}>New User?</Text>

    <Button label="SIGN UP" onPress={props.onPress} />
  </View>
);

SignUpControls.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
};

export default SignUpControls;
