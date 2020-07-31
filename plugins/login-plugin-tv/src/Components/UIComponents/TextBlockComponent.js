import React, { useContext } from "react";
import { View } from "react-native";
import TextComponent from "./TextComponent";
import { PluginContext } from "../../Config/PluginData";
import { mapKeyToStyle } from "../../Utils/customizationUtils";

const textStyleKeys = [
  "login_title",
  "main_description",
  "optional_instructions_1",
  "optional_instructions_2",
];

export default function TextBlockComponent() {
  const customStyles = useContext(PluginContext);

  const {
    login_title_text: loginTitle,
    main_description_text: mainDescription,
    optional_instructions_1_text: instructions1,
    optional_instructions_2_text: instructions2,
  } = customStyles;

  const [
    loginTitleStyle,
    mainDescriptionStyle,
    instructions1Style,
    instructions2Style,
  ] = textStyleKeys.map((key) => mapKeyToStyle(key, customStyles));

  return (
    <View>
      <TextComponent style={[styles.title, loginTitleStyle]} lines={1}>
        {loginTitle}
      </TextComponent>
      <TextComponent
        style={[styles.mainDescription, mainDescriptionStyle]}
        lines={4}
      >
        {mainDescription}
      </TextComponent>
      <TextComponent
        style={[styles.instructions, instructions1Style]}
        lines={2}
      >
        {instructions1}
      </TextComponent>
      <TextComponent
        style={[styles.instructions, instructions2Style]}
        lines={2}
      >
        {instructions2}
      </TextComponent>
    </View>
  );
}

const styles = {
  title: {
    paddingTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainDescription: {
    marginVertical: 50,
    textAlign: "justify",
  },
  instructions: {
    marginBottom: 30,
    textAlign: "justify",
  },
};
