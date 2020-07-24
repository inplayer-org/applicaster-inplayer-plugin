import React from "react";
import { Text } from "react-native";

export default function TextComponent(props) {
  const { children, lines, style: customStyle } = props;

  return (
    <Text
      numberOfLines={lines}
      elipsizeMode="tail"
      style={[customStyle, defaultStyle]}
    >
      {children}
    </Text>
  );
}

const defaultStyle = {
  textAlign: "center",
  textAlignVertical: "center",
};
