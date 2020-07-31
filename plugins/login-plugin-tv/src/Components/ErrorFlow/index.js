import React, { useContext, useRef, useState } from "react";
import { View, Platform, findNodeHandle, Image } from "react-native";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";
import { PluginContext } from "../../Config/PluginData";
import Button from "../UIComponents/Button";
import { getInputStyle, mapKeyToStyle } from "../../Utils/customizationUtils";
import { useToggleNavBar } from "../../Utils/reactHooks";
import TextComponent from "../UIComponents/TextComponent";
import TVRemoteHandlerComponent from "../UIComponents/TVRemoteHandlerComponent";
import { BlurView } from "@react-native-community/blur";
import ASSETS from "../../Config/Assets";

const errorScreenStyleKeys = ["error_description", "close_action_button"];
const isAndroid = Platform.OS === "android";

function ErrorScreen(props) {
  const { error, remoteHandler, navigator, screenCallback } = props;
  const customStyles = useContext(PluginContext);

  const {
    close_action_button_text: closeLabel,
    close_action_button_background: closeButtonBackground,
    error_background: errorBackground,
  } = customStyles;

  const [
    errorDescriptionStyle,
    closeButtonStyle,
  ] = errorScreenStyleKeys.map((key) => mapKeyToStyle(key, customStyles));

  const buttonStyle = getInputStyle(closeButtonBackground);

  const [viewRef, setViewRef] = useState(null);
  const imgRef = useRef(null);
  const closeButton = useRef(null);

  useToggleNavBar(navigator);

  if (isAndroid) {
    useInitialFocus(true, closeButton);
  }

  const onClose = () => {
    return screenCallback(error);
  };

  const imageLoaded = () => {
    setViewRef(findNodeHandle(imgRef.current));
  };

  return (
    <TVRemoteHandlerComponent tvEventHandler={remoteHandler}>
      <Image
        source={{ uri: ASSETS.screenBackground }}
        style={styles.backgroundImage}
        ref={(n) => (imgRef.current = n)}
        onLayout={imageLoaded}
        blurRadius={isAndroid ? 10 : 0}
      />
      <BlurView
        style={[
          styles.blurView,
          !isAndroid && { backgroundColor: errorBackground },
        ]}
        blurType="light"
        blurAmount={5}
        viewRef={viewRef}
        blurRadius={5}
        overlayColor={errorBackground}
      />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={{ uri: ASSETS.logo }}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.innerContainer}>
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
      </View>
    </TVRemoteHandlerComponent>
  );
}

const styles = {
  innerContainer: {
    paddingTop: 70,
    paddingHorizontal: 200,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  errorText: {
    marginBottom: 95,
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  logoContainer: {
    alignSelf: "flex-start",
    margin: 58,
  },
  subContainer: {
    marginTop: 100,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 230,
  },
  logo: {
    width: 350,
    height: 100,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
};

export default ErrorScreen;
