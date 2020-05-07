import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { View, Text, TouchableOpacity } from "react-native";

const actionButtnoContainerStyle = (screenStyles) => {
  return {
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: screenStyles?.action_button_background_color || "#F1AD12",
    borderRadius: 50,
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
  const { screenStyles, title, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={actionButtnoContainerStyle(screenStyles)}>
        <Text style={actionButtonTextStyle(screenStyles)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;
