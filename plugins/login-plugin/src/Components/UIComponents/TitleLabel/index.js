import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";

const TitleLabel = (props) => {
  const { screenStyles, title } = props;

  const style = {
    fontFamily: platformSelect({
      ios: screenStyles?.title_font_ios,
      android: screenStyles?.title_font_android,
    }),
    fontSize: screenStyles?.title_font_size,
    color: screenStyles?.title_font_color,
    marginTop: 100,
    marginBottom: 80,
    alignSelf: "center",
  };
  return <Text style={style}>{title || "InPlayer"}</Text>;
};

export default TitleLabel;
