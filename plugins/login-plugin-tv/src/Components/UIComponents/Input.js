import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

class Input extends Component {
  render() {
    const {
      value = "",
      onChangeText,
      secureTextEntry = false,
      placeholder = "",
      style = {},
      isDarkKeyboard,
      keyboardType,
      groupId,
    } = this.props;

    const [inputStyle, textStyle] = style;

    return (
      <Focusable
        id={placeholder}
        groupId={groupId}
        onPress={() => {
          this.root.focus();
        }}
        isParallaxDisabled
        preferredFocus
      >
        {(focused) => {
          return (
            <View style={getInputStyles(focused, inputStyle)}>
              <TextInput
                ref={(component) => (this.root = component)}
                value={value}
                keyboardAppearance={isDarkKeyboard ? "dark" : "light"}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={textStyle.color}
                style={[textStyle, { flex: 1 }]}
                maxLength={50}
              />
            </View>
          );
        }}
      </Focusable>
    );
  }
}

const getInputStyles = (focused, customStyles) => {
  return {
    ...customStyles,
    ...(focused ? styles.focusedView : styles.defaultView),
  };
};

const styles = {
  focusedView: {
    borderColor: "#b3b3b3",
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 1,
  },
  defaultView: {
    opacity: 0.9,
  },
};

export default Input;
