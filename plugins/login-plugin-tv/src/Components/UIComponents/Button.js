import React from "react";
import { Text, View } from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

export default function Button({
  label = "",
  onPress,
  preferredFocus,
  buttonRef,
  nextFocusDown,
  nextFocusUp,
  groupId,
  textStyle = {},
  backgroundColor = "",
}) {
  const buttonStyle = { ...styles.input, backgroundColor };

  return (
    <Focusable
      id={`tv-button-${label}`}
      onPress={onPress}
      groupId={groupId}
      preferredFocus={preferredFocus}
      ref={buttonRef}
      nextFocusDown={nextFocusDown}
      nextFocusUp={nextFocusUp}
    >
      {(focused) => {
        return (
          <View style={[buttonStyle, { opacity: focused ? 1 : 0.9 }]}>
            <Text
              style={focused ? { ...textStyle, color: "#5F5F5F" } : textStyle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {label}
            </Text>
          </View>
        );
      }}
    </Focusable>
  );
}

const styles = {
  input: {
    width: 600,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
};
