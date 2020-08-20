import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

import colors from "../../../colors";

const localStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
    textDecorationLine: "underline",
  },
});

const Button = ({ onPress, label, groupId, textColorFocused, textStyles }) => {
  console.log({
    onPress,
    label,
    groupId,
    textColorFocused,
    textStyles,
  });

  const getTextColor = React.useCallback(
    (focused) => ({
      color: focused ? textColorFocused : textStyles.color,
    }),
    []
  );
  console.log({
    onPress,
    label,
    groupId,
    textColorFocused,
    textStyles,
  });
  return (
    <Focusable id={`${groupId}-${label}`} groupId={groupId} onPress={onPress}>
      {(focused) => (
        <View style={localStyles.button}>
          <Text
            style={[localStyles.buttonText, textStyles, getTextColor(focused)]}
          >
            {label}
          </Text>
        </View>
      )}
    </Focusable>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  groupId: PropTypes.string,
  textColor: PropTypes.string,
  textColorFocused: PropTypes.string,
  textStyles: PropTypes.object,
};

Button.defaultProps = {
  onPress: identity,
  textColor: colors.white,
  textColorFocused: colors.white,
  textStyles: {},
};

export default Button;
