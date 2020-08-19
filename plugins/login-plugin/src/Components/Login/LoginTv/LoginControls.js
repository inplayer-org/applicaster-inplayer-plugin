import React, { useState } from "react";
import { View, ViewPropTypes, StyleSheet, Text, Platform } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { focusManager } from "@applicaster/zapp-react-native-utils/appUtils";

import FocusableTextInput from "../../UIComponents/FocusableTextInput";
import Button from "../../UIComponents/Buttons/FocusableButton";
import colors from "../../../colors";
import { mapKeyToStyle } from "../../../Utils/Customization";

const styles = StyleSheet.create({
  errorMessage: {
    position: "absolute",
    height: 32,
    color: colors.grayLighter,
    fontSize: 24,
    lineHeight: 32,
    width: "100%",
    textAlign: "center",
    fontWeight: "500",
    transform: [{ translateY: -115 }],
  },
});

const LoginControls = ({ style, errorMessage, onLogin, screenStyles }) => {
  const [usernameValue, setUsername] = useState("");
  const [passwordValue, setPassword] = useState("");

  const groupId = "login-form";

  const onPress = () => {
    onLogin({ email: usernameValue, password: passwordValue });
  };

  const handleInputChange = (setter) => (text) => {
    setter(text);
  };

  const handleEditingEnd = (label) => () => {
    // TODO: implement focus switching on Samsung TV
    if (Platform.OS === "samsung_tv") return null;
    /**
     * Wait for the focus manager to finish previous focusing job
     * (Bit of the hack but it works well from the UX point of view)
     */
    setTimeout(() => {
      const usernameInputId = "login-input";
      const passwordInputId = "password-input";
      const loginButtonId = `${groupId}-LOGIN`;
      const focusOnItem = (item) =>
        focusManager.forceFocusOnFocusable({ itemId: item });

      if (label === "login-input") {
        if (passwordValue === "") {
          focusOnItem(passwordInputId);
        } else {
          if (usernameValue !== "") {
            focusOnItem(loginButtonId);
          }
          // else, stay on username field
        }
      }
      if (label === "password-input") {
        if (usernameValue === "") {
          focusOnItem(usernameInputId);
        } else {
          if (passwordValue !== "") {
            focusOnItem(loginButtonId);
          }
          // else stay on password field
        }
      }
    }, 1000);
  };

  const buttonTextStyles = React.useMemo(
    () => mapKeyToStyle("login_action_button", screenStyles),
    []
  );

  return (
    <View style={style}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <FocusableGroup id={groupId} shouldUsePreferredFocus isParallaxDisabled>
        <FocusableTextInput
          groupId={groupId}
          placeholder={screenStyles.email_input_placeholder}
          value={usernameValue}
          onChangeText={handleInputChange(setUsername)}
          label="login-input"
          onEndEditing={handleEditingEnd("login-input")}
          preferredFocus
        />
        <FocusableTextInput
          groupId={groupId}
          placeholder={screenStyles.password_input_placeholder}
          secureTextEntry={true}
          value={passwordValue}
          onChangeText={handleInputChange(setPassword)}
          onEndEditing={handleEditingEnd("password-input")}
          label="password-input"
        />
        <Button
          {...{
            label: screenStyles.login_action_button_text,
            onPress,
            groupId,
            backgroundColor: screenStyles.login_action_button_background,
            backgroundColorFocused:
              screenStyles.login_action_button_background_focused,
            textColorFocused:
              screenStyles.login_action_button_fontcolor_focused,
            textStyles: buttonTextStyles,
          }}
        />
      </FocusableGroup>
    </View>
  );
};

LoginControls.propTypes = {
  style: ViewPropTypes.style,
  onLogin: PropTypes.func,
  errorMessage: PropTypes.string,
  screenStyles: PropTypes.object,
};

LoginControls.defaultProps = {
  onLogin: identity,
  screenStyles: {},
};

export default LoginControls;
