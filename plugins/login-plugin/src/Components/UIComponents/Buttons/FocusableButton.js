import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

import colors from "../../../colors";

const localStyles = StyleSheet.create({
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

const Button = ({
  onPress,
  label,
  groupId,
  backgroundColor,
  backgroundColorFocused,
  textColorFocused,
  textStyles,
}) => {
  const getBackgroundColor = React.useCallback(
    (focused) => ({
      backgroundColor: focused ? backgroundColorFocused : backgroundColor,
    }),
    []
  );

  const getTextColor = React.useCallback(
    (focused) => ({
      color: focused ? textColorFocused : textStyles.color,
    }),
    []
  );

  return (
    <Focusable id={`${groupId}-${label}`} groupId={groupId} onPress={onPress}>
      {(focused) => (
        <View style={[localStyles.button, getBackgroundColor(focused)]}>
          <Text style={[textStyles, getTextColor(focused)]}>{label}</Text>
        </View>
      )}
    </Focusable>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  groupId: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundColorFocused: PropTypes.string,
  textColor: PropTypes.string,
  textColorFocused: PropTypes.string,
  textStyles: PropTypes.object,
};

Button.defaultProps = {
  onPress: identity,
  backgroundColor: colors.grayDark,
  backgroundColorFocused: colors.buttonActive,
  textColor: colors.white,
  textColorFocused: colors.white,
  textStyles: {},
};

export default Button;
