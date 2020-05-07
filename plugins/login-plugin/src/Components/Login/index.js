import React, { useState, useEffect } from "react";
import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { inputFieldStyle } from "../../Utils/Customization";
import { validateEmail } from "../../Utils/Account";
import { container } from "../Styles";
import ActionButton from "../UIComponents/ActionButton";
import TitleLabel from "../UIComponents/TitleLabel";
import BackButton from "../UIComponents/BackButton";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const styles = StyleSheet.create({
  newUserButton: {
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
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
    marginBottom: 30,
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
  };
};

export const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { initialEmail, backButton, screenStyles } = props;
  const textInputStyle = inputFieldStyle(screenStyles);
  const { width: screenWidth } = useDimensions("window");

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const onPressLoginButton = () => {
    const { login, onLoginError } = props;

    const title = "Login form issue";

    if (validateEmail(email) == false) {
      onLoginError({
        title,
        message: "Email is not valid",
      });
      return;
    }
    login({ email, password });
  };

  const onBackButton = () => {
    const { accountFlowCallback } = props;
    accountFlowCallback && accountFlowCallback(false);
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

  return (
    <View style={{ ...container, width: screenWidth }}>
      <BackButton
        disabled={!backButton}
        screenStyles={screenStyles}
        onPress={onBackButton}
      />
      <TitleLabel
        screenStyles={screenStyles}
        title={screenStyles?.title_font_text}
      />
      <TextInput
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
      <Text style={forgotPasswordStyle(screenStyles)}>
        {screenStyles?.forgot_password_text || "Forgot your password?"}
      </Text>
      <ActionButton
        screenStyles={screenStyles}
        title={screenStyles?.action_button_login_text || "LOG IN"}
        onPress={onPressLoginButton}
      />
      {renderCreateAccountButton()}
    </View>
  );
};
