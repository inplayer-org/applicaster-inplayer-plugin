import React from "react";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";

const BackButton = (props) => {
  const { screenStyles, onPress, disabled } = props;

  const constainerStyle = {
    alignSelf: "flex-start",
    marginLeft: 35,
    marginTop: 20,
    zIndex: 100,
    position: "absolute",
  };

  const TextStyle = {
    fontFamily: platformSelect({
      ios: screenStyles?.back_button_font_ios,
      android: screenStyles?.back_button_font_android,
    }),
    fontSize: screenStyles?.back_button_font_size,
    color: screenStyles?.back_button_font_color,
  };

  return disabled === true ? null : (
    <TouchableOpacity style={constainerStyle} onPress={onPress}>
      <Text style={TextStyle}>{screenStyles?.back_button_text}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
