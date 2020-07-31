import React from "react";
import { View } from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";
import TextComponent from "./TextComponent";

export default function Button({
  label = "",
  onPress,
  preferredFocus,
  buttonRef,
  nextFocusDown,
  nextFocusUp,
  groupId,
  textStyle = {},
  buttonStyle: customButtonStyle = {},
}) {
  const buttonStyle = { ...customButtonStyle, ...styles.button };

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
          <View
            style={[
              buttonStyle,
              focused ? styles.focusedButton : styles.defaultButton,
            ]}
          >
            <TextComponent style={textStyle} lines={2}>
              {label}
            </TextComponent>
          </View>
        );
      }}
    </Focusable>
  );
}

const styles = {
  button: {
    justifyContent: "center",
  },
  focusedButton: {
    opacity: 1,
    shadowColor: "rgba(24,24,24, 0.4)",
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 10 },
  },
  defaultButton: {
    opacity: 0.9,
    shadowColor: "rgba(56,56,56, 0.4)",
    shadowOpacity: 1.5,
    elevation: 2,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 4 },
  },
};
