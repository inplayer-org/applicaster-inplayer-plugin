import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Platform } from "react-native";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";
import { PluginContext } from "../../Config/PluginData";
import Layout from "../UIComponents/Layout";
import Button from "../UIComponents/Button";

function ErrorScreen(props) {
  const { error, remoteHandler, navigator, skipLoginflow } = props;

  // useEffect(() => {
  //   hideMenu(navigator);
  //   return () => showMenu(navigator);
  // }, []);

  const {
    errorDescriptionStyle,
    closeButtonStyle,
    customText: { closeLabel },
    background: { errorScreenBackground, closeButtonBackground },
  } = useContext(PluginContext);

  const onClose = () => {
    if (navigator.canGoBack()) {
      navigator.goBack();
    } else {
      return skipLoginflow();
    }
  };

  const closeButton = useRef(null);

  if (Platform.OS === "android") {
    useInitialFocus(true, closeButton);
  }

  return (
    <Layout
      backgroundColor={errorScreenBackground}
      remoteHandler={remoteHandler}
    >
      <View style={styles.container}>
        <Text
          style={[styles.errorText, errorDescriptionStyle]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {error.message}
        </Text>
        <Button
          label={closeLabel}
          onPress={onClose}
          buttonRef={closeButton}
          textStyle={closeButtonStyle}
          backgroundColor={closeButtonBackground}
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
    textAlign: "center",
    marginBottom: 95,
  },
};

export default ErrorScreen;
