import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

import colors from "../../../colors";

const styles = StyleSheet.create({
  button: {
    width: 556,
    height: 88,
    backgroundColor: colors.grayDark,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonActive: {
    backgroundColor: colors.buttonActive,
  },
});

const Button = ({ onPress, label, groupId }) => (
  <Focusable id={`${groupId}-${label}`} groupId={groupId} onPress={onPress}>
    {(focused) => (
      <View style={[styles.button, focused && styles.buttonActive]}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    )}
  </Focusable>
);

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  groupId: PropTypes.string,
};

Button.defaultProps = {
  onPress: identity,
};

export default Button;
