import React, { useState } from "react";
import { View, ViewPropTypes, StyleSheet, Text, Platform } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { focusManager } from "@applicaster/zapp-react-native-utils/appUtils";
import FocusableTextInput from "../../UIComponents/FocusableTextInput";
import Button from "../../UIComponents/Buttons/FocusableButton";
import colors from "../../../colors";

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

const LoginControls = ({ style, errorMessage, onLogin }) => {
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

  return (
    <View style={style}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <FocusableGroup id={groupId} shouldUsePreferredFocus isParallaxDisabled>
        <FocusableTextInput
          groupId={groupId}
          placeholder="Email"
          value={usernameValue}
          onChangeText={handleInputChange(setUsername)}
          label="login-input"
          onEndEditing={handleEditingEnd("login-input")}
          preferredFocus
        />
        <FocusableTextInput
          groupId={groupId}
          placeholder="Password"
          secureTextEntry={true}
          value={passwordValue}
          onChangeText={handleInputChange(setPassword)}
          onEndEditing={handleEditingEnd("password-input")}
          label="password-input"
        />
        <Button {...{ label: "LOGIN", onPress, groupId }} />
      </FocusableGroup>
    </View>
  );
};

LoginControls.propTypes = {
  style: ViewPropTypes.style,
  onLogin: PropTypes.func,
  errorMessage: PropTypes.string,
};

LoginControls.defaultProps = {
  onLogin: identity,
};

export default LoginControls;
