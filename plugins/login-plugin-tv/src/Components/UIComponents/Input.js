import React, { Component } from "react";
import { View, TextInput } from "react-native";
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

    return (
      <Focusable
        id={placeholder}
        groupId={groupId}
        onPress={() => {
          this.root.focus();
        }}
        onBlur={() => {
          this.root.blur();
        }}
        isParallaxDisabled
        preferredFocus
      >
        {(focused) => {
          return (
            <View
              style={focused ? { ...style, backgroundColor: "red" } : style}
            >
              <TextInput
                ref={(component) => (this.root = component)}
                value={value}
                keyboardAppearance={isDarkKeyboard ? "dark" : "light"}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={style}
                maxLength={50}
              />
            </View>
          );
        }}
      </Focusable>
    );
  }
}

export default Input;
