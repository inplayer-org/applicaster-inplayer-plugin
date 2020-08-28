import React, { useState } from "react";

import { View, TextInput, findNodeHandle, Keyboard } from "react-native";
import { inputFieldStyle } from "../../../Utils/Customization";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";

import { container } from "../../Styles";
import { validateSignUpData } from "../../../Utils/Account";
import { useBackHandler } from "../../../Utils/hooks";
import ActionButton from "../../UIComponents/Buttons/ActionButton.js";
import TitleLabel from "../../UIComponents/TitleLabel";
import BackButton from "../../UIComponents/Buttons/BackButton";

const SignUpMobile = (props) => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [password, setPassword] = useState(null);
  const { screenStyles } = props;
  const textInputStyle = inputFieldStyle(screenStyles);
  const { width: screenWidth } = useDimensions("window");

  const signUp = () => {
    Keyboard.dismiss();
    const { createAccount, onSignUpError } = props;
    const errorData = validateData();
    if (errorData) {
      onSignUpError(errorData);
    } else {
      createAccount({ fullName, email, password });
    }
  };

  useBackHandler(hardwareBack);

  const hardwareBack = () => {
    props?.onBackButton();
    return true;
  };

  const validateData = () => {
    const title = "Sign Up form issue";
    const signUpData = {
      fullName: fullName,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    const message = validateSignUpData(signUpData);
    return message ? { title, message } : null;
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
            this.emailTextInput.focus();
            scrollToInput(findNodeHandle(this.emailTextInput));
          }}
          onFocus={(event) => {
            scrollToInput(findNodeHandle(event.target));
          }}
          blurOnSubmit={false}
          autoCapitalize="words"
          placeholder={screenStyles?.fields_name_text || "Enter your name"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          ref={(input) => {
            this.emailTextInput = input;
          }}
          onFocus={(event) => {
            scrollToInput(findNodeHandle(event.target));
          }}
          onSubmitEditing={() => {
            this.passwordTextInput.focus();
          }}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder={screenStyles?.fields_email_text || "E-mail"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={email}
          onChangeText={setEmail}
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
          placeholder={screenStyles?.fields_password_text || "Password"}
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
          title={screenStyles?.action_button_signup_text || "SIGN UP"}
          onPress={signUp}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUpMobile;
