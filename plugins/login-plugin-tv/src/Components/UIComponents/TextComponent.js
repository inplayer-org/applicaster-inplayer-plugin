import React, { useContext } from "react";
import { Text } from "react-native";
import { PluginContext } from "../../Config/PluginData";

export default function TextComponent(props) {
  const {
    loginTitleStyle,
    mainDescriptionStyle,
    optionalInstructions1Style,
    optionalInstructions2Style,
    customText,
  } = useContext(PluginContext);

  return (
    <>
      <Text
        style={{ ...styles.title, ...loginTitleStyle }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {customText.loginTitle}
      </Text>
      <Text
        style={{ ...styles.mainDescription, ...mainDescriptionStyle }}
        numberOfLines={4}
        ellipsizeMode="tail"
      >
        {customText.mainDescription}
      </Text>
      <Text
        style={{ ...styles.instructions, ...optionalInstructions1Style }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {customText.instructions1}
      </Text>
      <Text
        style={{ ...styles.instructions, ...optionalInstructions2Style }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {customText.instructions2}
      </Text>
    </>
  );
}

const styles = {
  title: {
    fontWeight: "bold",
    paddingTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainDescription: {
    marginTop: "7%",
    marginBottom: "7%",
  },
  instructions: {
    marginBottom: "3.3%",
  },
};
