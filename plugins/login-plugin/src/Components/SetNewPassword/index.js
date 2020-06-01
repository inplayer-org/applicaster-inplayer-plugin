import React, { useState, useEffect } from "react";
import { View, TextInput, findNodeHandle, Keyboard } from "react-native";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";

import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { inputFieldStyle } from "../../Utils/Customization";
import { validatePassword } from "../../Utils/Account";
import { container } from "../Styles";
import ActionButton from "../UIComponents/ActionButton";
import TitleLabel from "../UIComponents/TitleLabel";
import BackButton from "../UIComponents/BackButton";

export const SetNewPassword = (props) => {
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);

  const { screenStyles } = props;
  const textInputStyle = inputFieldStyle(screenStyles);
  const { width: screenWidth } = useDimensions("window");
  let stillMounted = true;

  useEffect(() => {
    return () => {
      stillMounted = false;
    };
  }, []);

  const validateData = () => {
    const title = "Set New Password form issue";
    let message = null;
    if (!token || token.length == 0) {
      message = "Token can not be empty";
    } else if (validatePassword(password) == false) {
      message = "Password must be at least 8 characters";
    } else if (password !== passwordConfirmation) {
      message = "Password not equal confirmation password";
    }
    return message ? { title, message } : null;
  };

  const onPressSetNewPasswordButton = () => {
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
