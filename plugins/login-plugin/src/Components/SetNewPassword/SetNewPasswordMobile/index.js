import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  findNodeHandle,
  Keyboard,
  BackHandler,
} from "react-native";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";

import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { inputFieldStyle } from "../../../Utils/Customization";
import { validateNewPassword } from "../../../Utils/Account";
import { container } from "../../Styles";
import ActionButton from "../../UIComponents/Buttons/ActionButton.js";
import TitleLabel from "../../UIComponents/TitleLabel";
import BackButton from "../../UIComponents/Buttons/BackButton";

const SetNewPasswordMobile = (props) => {
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);

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

  const validateData = () => {
    const title = "Set New Password form issue";
    const newPwdData = {
      token: token,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    const message = validateNewPassword(newPwdData);
    return message ? { title, message } : null;
  };

  const onPressSetNewPasswordButton = () => {
    Keyboard.dismiss();
    const { setNewPasswordCallback, onError } = props;

    const errorData = validateData();
    if (errorData) {
      onError(errorData);
      return;
    }
    setNewPasswordCallback({ token, password });
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
          onSubmitEditing={() => {
            this.passwordTextInput.focus();
            scrollToInput(findNodeHandle(this.passwordTextInput));
          }}
          onFocus={(event) => {
            scrollToInput(findNodeHandle(event.target));
          }}
          blurOnSubmit={false}
          autoCapitalize="words"
          placeholder={screenStyles?.fields_token_text || "Token"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={token}
          onChangeText={setToken}
        />
        <TextInput
          ref={(input) => {
            this.passwordTextInput = input;
          }}
          onFocus={(event) => {
            scrollToInput(findNodeHandle(event.target));
          }}
          onSubmitEditing={() => {
            this.passwordConfirmationTextInput.focus();
            scrollToInput(findNodeHandle(this.passwordConfirmationTextInput));
          }}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder={
            screenStyles?.fields_set_new_password_text || "New password"
          }
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          ref={(input) => {
            this.passwordConfirmationTextInput = input;
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          returnKeyType={platformSelect({
            ios: "done",
            android: "none",
          })}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder={
            screenStyles?.fields_password_confirmation_text ||
            "Password Confirmation"
          }
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          onFocus={(event) => {
            scrollToInput(findNodeHandle(event.target));
          }}
          style={textInputStyle}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          secureTextEntry
        />

        <ActionButton
          screenStyles={screenStyles}
          paddingTop={25}
          title={
            screenStyles?.action_button_set_new_password_text ||
            "SET NEW PASSWORD"
          }
          onPress={onPressSetNewPasswordButton}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SetNewPasswordMobile;
