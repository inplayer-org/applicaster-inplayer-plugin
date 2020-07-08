import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { View, Text, TouchableOpacity } from "react-native";

const actionButtonContainerStyle = (backgroundColor, borderRadius) => {
  return {
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor,
    borderRadius,
    alignSelf: "center",
  };
};

const actionButtonTextStyle = (screenStyles) => {
  return {
    fontFamily: platformSelect({
      ios: screenStyles?.action_button_font_ios,
      android: screenStyles?.action_button_font_android,
    }),
    fontSize: screenStyles?.action_button_font_size,
    color: screenStyles?.action_button_font_color,
  };
};

const ActionButton = (props) => {
  const {
    screenStyles,
    labelStyle,
    buttonStyle,
    title,
    onPress,
    paddingTop = null,
  } = props;

  const textStyle = labelStyle || actionButtonTextStyle(screenStyles);
  const background =
    buttonStyle?.backgroundColor ||
    screenStyles?.action_button_background_color ||
    "#F1AD12";
  const radius = buttonStyle?.borderRadius || 50;

  return (
    <TouchableOpacity onPress={onPress} style={{ paddingTop: paddingTop }}>
      <View style={actionButtonContainerStyle(background, radius)}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;
