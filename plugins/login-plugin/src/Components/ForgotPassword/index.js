import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  findNodeHandle,
  Keyboard,
  BackHandler,
} from "react-native";

import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { inputFieldStyle } from "../../Utils/Customization";
import { validateEmail } from "../../Utils/Account";
import { container } from "../Styles";
import ActionButton from "../UIComponents/Buttons/ActionButton.js";
import TitleLabel from "../UIComponents/TitleLabel";
import BackButton from "../UIComponents/Buttons/BackButton";

export const ForgotPassword = (props) => {
  const [email, setEmail] = useState(null);
  const { screenStyles } = props;
  const textInputStyle = inputFieldStyle(screenStyles);
  const { width: screenWidth } = useDimensions("window");
  let stillMounted = true;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", hardwareBack);
    return () => {
      stillMounted = false;
      BackHandler.removeEventListener("hardwareBackPress", hardwareBack);
    };
  }, []);

  const hardwareBack = () => {
    props?.onBackButton();
    return true;
  };

  const onPressRequestPasswordButton = () => {
    Keyboard.dismiss();
    const { forgotPasswordFlowCallback, onError } = props;
    const title = "Login form issue";
    const validateEmailMsg = validateEmail(email);
    if (validateEmailMsg != null) {
      onError({
        title,
        message: validateEmailMsg,
      });
      return;
    }
    forgotPasswordFlowCallback({ email });
  };

  const scrollToInput = (reactNode) => {
    this.scroll.props.scrollToFocusedInput(reactNode, 150, 0);
  };

  return (
    <View style={{ ...container, width: screenWidth }}>
      <BackButton screenStyles={screenStyles} onPress={props?.onBackButton} />
      <KeyboardAwareScrollView
        innerRef={(ref) => {
          this.scroll = ref;
        }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={65}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <TitleLabel
          screenStyles={screenStyles}
          title={screenStyles?.title_font_text}
        />
        <TextInput
          onFocus={(event) => {
            scrollToInput(findNodeHandle(event.target));
          }}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder={screenStyles?.fields_email_text || "E-mail"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={email}
          onChangeText={stillMounted && setEmail}
        />

        <ActionButton
          screenStyles={screenStyles}
          paddingTop={25}
          title={
            screenStyles?.action_button_forgot_password_text ||
            "REQUEST NEW PASSWORD"
          }
          onPress={onPressRequestPasswordButton}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
