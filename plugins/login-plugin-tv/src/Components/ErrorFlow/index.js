import React, { useContext, useRef } from "react";
import { View, Platform } from "react-native";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";
import { PluginContext } from "../../Config/PluginData";
import Layout from "../UIComponents/Layout";
import Button from "../UIComponents/Button";
import { getInputStyle, mapKeyToStyle } from "../../Utils/customizationUtils";
import { useToggleNavBar } from "../../Utils/reactHooks";
import TextComponent from "../UIComponents/TextComponent";

const errorScreenStyleKeys = ["error_description", "close_action_button"];

function ErrorScreen(props) {
  const { error, remoteHandler, navigator, screenCallback } = props;
  const customStyles = useContext(PluginContext);

  const {
    close_action_button_text: closeLabel,
    close_action_button_background: closeButtonBackground,
  } = customStyles;

  const [
    errorDescriptionStyle,
    closeButtonStyle,
  ] = errorScreenStyleKeys.map((key) => mapKeyToStyle(key, customStyles));

  useToggleNavBar(navigator);

  const onClose = () => {
    return screenCallback(error);
  };

  const closeButton = useRef(null);

  if (Platform.OS === "android") {
    useInitialFocus(true, closeButton);
  }

  const buttonStyle = getInputStyle(closeButtonBackground);

  return (
    <Layout isErrorScreen={true} remoteHandler={remoteHandler}>
      <View style={styles.container}>
        <TextComponent
          style={[styles.errorText, errorDescriptionStyle]}
          lines={3}
        >
          {error.message}
        </TextComponent>
        <Button
          label={closeLabel}
          onPress={onClose}
          buttonRef={closeButton}
          textStyle={closeButtonStyle}
          buttonStyle={buttonStyle}
        />
      </View>
    </Layout>
  );
}

const styles = {
  container: {
    paddingTop: 70,
    paddingHorizontal: 200,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  errorText: {
    marginBottom: 95,
  },
};

export default ErrorScreen;
