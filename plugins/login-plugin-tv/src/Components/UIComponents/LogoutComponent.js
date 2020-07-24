import React, { useContext, useRef } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";
import Button from "./Button";
import { PluginContext } from "../../Config/PluginData";
import { mapKeyToStyle, getInputStyle } from "../../Utils/customizationUtils";
import TextComponent from "./TextComponent";

const logoutScreenStyleKeys = [
  "confirmation_message",
  "confirm_action_button",
  "cancel_action_button",
];

export default function LogoutComponent(props) {
  const { handleLogout, handleCancel, loading = false } = props;
  const customStyles = useContext(PluginContext);

  const {
    confirm_action_button_background: confirmButtonBackground,
    cancel_action_button_background: cancelButtonBackground,
    confirmation_message_text: message,
    confirm_action_button_text: confirmButtonLabel,
    cancel_action_button_text: cancelButtonLabel,
  } = customStyles;

  const [
    messageStyle,
    confirmTextStyle,
    cancelTextStyle,
  ] = logoutScreenStyleKeys.map((key) => mapKeyToStyle(key, customStyles));

  const confirmButton = useRef(null);
  const cancelButton = useRef(null);

  if (Platform.OS === "android") {
    useInitialFocus(true, confirmButton);
  }

  const confirmButtonStyle = getInputStyle(confirmButtonBackground);
  const cancelButtonStyle = getInputStyle(cancelButtonBackground);

  return (
    <View style={styles.container}>
      <TextComponent style={messageStyle} lines={4}>
        {message}
      </TextComponent>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <>
            <Button
              label={confirmButtonLabel}
              onPress={handleLogout}
              buttonRef={confirmButton}
              nextFocusDown={cancelButton}
              textStyle={confirmTextStyle}
              buttonStyle={confirmButtonStyle}
            />
            <Button
              label={cancelButtonLabel}
              onPress={handleCancel}
              buttonRef={cancelButton}
              nextFocusUp={confirmButton}
              textStyle={cancelTextStyle}
              buttonStyle={cancelButtonStyle}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = {
  container: {
    paddingTop: 70,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    height: 200,
    justifyContent: "space-between",
    marginTop: 95,
  },
};
