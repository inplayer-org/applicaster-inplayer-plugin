import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  findNodeHandle,
  Keyboard,
} from "react-native";

import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { inputFieldStyle } from "../../Utils/Customization";
import { validateEmail } from "../../Utils/Account";
import { container } from "../Styles";
import ActionButton from "../UIComponents/Buttons/ActionButton.js";
import TitleLabel from "../UIComponents/TitleLabel";
import BackButton from "../UIComponents/Buttons/BackButton";

const styles = StyleSheet.create({
  newUserButton: {
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    alignSelf: "center",
  },
});

const forgotPasswordStyle = (screenStyles) => {
  return {
    fontFamily: platformSelect({
      ios: screenStyles?.forgot_password_font_ios,
      android: screenStyles?.forgot_password_font_android,
    }),
    fontSize: screenStyles?.forgot_password_font_size,
    color: screenStyles?.forgot_password_font_color,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 30,
    textDecorationLine: "underline",
  };
};

const newUserButtonStyle = (screenStyles) => {
  return {
    fontFamily: platformSelect({
      ios: screenStyles?.create_account_link_font_ios,
      android: screenStyles?.create_account_link_font_android,
    }),
    fontSize: screenStyles?.create_account_link_font_size,
    color: screenStyles?.create_account_link_font_color,
    textDecorationLine: "underline",
    alignSelf: "center",
    textAlign: "center",
  };
};

export const LoginMobile = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { initialEmail, backButton, screenStyles } = props;
  const textInputStyle = inputFieldStyle(screenStyles);
  const { width: screenWidth } = useDimensions("window");

  let stillMounted = true;

  useEffect(() => {
    return () => {
      stillMounted = false;
    };
  }, []);

  useEffect(() => {
    stillMounted && setEmail(initialEmail);
  }, [initialEmail]);

  const onPressLoginButton = () => {
    Keyboard.dismiss();
    const { login, onLoginError } = props;

    const title = "Login form issue";

    const validateEmailMsg = validateEmail(email);
    if (validateEmailMsg != null) {
      onLoginError({
        title,
        message: validateEmailMsg,
      });
      return;
    }
    login({ email, password });
  };

  const onBackButton = () => {
    const { accountFlowCallback } = props;
    accountFlowCallback && accountFlowCallback(false);
  };

  const forgotPasswordButton = () => {
    const { onPresentForgotPasswordScreen } = props;
    onPresentForgotPasswordScreen && onPresentForgotPasswordScreen();
  };

  const renderCreateAccountButton = () => {
    return (
      <TouchableOpacity onPress={props?.signUp}>
        <View style={styles.newUserButton}>
          <Text style={newUserButtonStyle(screenStyles)}>
            {screenStyles?.create_account_link_text || "No user? Sign Up!"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const scrollToInput = (reactNode) => {
    this.scroll.props.scrollToFocusedInput(reactNode, 150, 0);
  };

  return (
    <View style={{ ...container, width: screenWidth }}>
      <BackButton
        disabled={!backButton}
        screenStyles={screenStyles}
        onPress={onBackButton}
      />
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
          }}
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

        <TextInput
          ref={(input) => {
            this.passwordTextInput = input;
          }}
          onFocus={(event) => {
            scrollToInput(findNodeHandle(event.target));
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
          placeholder={screenStyles?.fields_password_text || "Password"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={password}
          onChangeText={stillMounted && setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={forgotPasswordButton}>
          <Text style={forgotPasswordStyle(screenStyles)}>
            {screenStyles?.forgot_password_text || "Forgot your password?"}
          </Text>
        </TouchableOpacity>
        <ActionButton
          screenStyles={screenStyles}
          title={screenStyles?.action_button_login_text || "LOG IN"}
          onPress={onPressLoginButton}
        />
        {renderCreateAccountButton()}
      </KeyboardAwareScrollView>
    </View>
  );
};
