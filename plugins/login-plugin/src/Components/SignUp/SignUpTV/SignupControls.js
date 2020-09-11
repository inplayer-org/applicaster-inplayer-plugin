import React, { useState } from "react";
import * as R from "ramda";
import { View, ViewPropTypes, StyleSheet, Text, Platform } from "react-native";
import PropTypes from "prop-types";
import { identity } from "ramda";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { focusManager } from "@applicaster/zapp-react-native-utils/appUtils";

import FocusableTextInput from "../../UIComponents/FocusableTextInput";
import { findNextEmptyLabel } from "../../../Utils/Forms";
import { isWebBasedPlatform } from "../../../Utils/Platform";
import Button from "../../UIComponents/Buttons/FocusableButton";
import colors from "../../../colors";
import {
  mapKeyToStyle,
  splitInputTypeStyles,
} from "../../../Utils/Customization";

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

const SignupControls = ({ style, errorMessage, onSignup, screenStyles }) => {
  const [emailValue, setEmailValue] = useState("");
  const [fullNameValue, setFullNameValue] = useState("");
  const [passwordValue, setPassword] = useState("");

  const groupId = "signup-form";

  const onPress = () => {
    onSignup({
      email: emailValue,
      password: passwordValue,
      fullName: fullNameValue,
    });
  };

  const handleInputChange = (setter) => (text) => {
    setter(text);
  };

  const handleEditingEnd = (label) => () => {
    // TODO: implement focus switching on Samsung TV
    if (isWebBasedPlatform) return null;
    const labels = [
      { label: "full-name-input", value: fullNameValue },
      { label: "email-input", value: emailValue },
      { label: "password-input", value: passwordValue },
    ];
    /**
     * Wait for the focus manager to finish previous focusing job
     * (Bit of the hack but it works well from the UX point of view)
     */
    setTimeout(() => {
      const signupButtonId = `${groupId}-${screenStyles.signup_action_button_text}`;
      const focusOnItem = (item) =>
        focusManager.forceFocusOnFocusable({ itemId: item });

      const nextEmpty = findNextEmptyLabel(label, labels);

      if (nextEmpty) {
        focusOnItem(nextEmpty);
      } else {
        focusOnItem(signupButtonId);
      }
    }, 1000);
  };

  const buttonTextStyles = React.useMemo(
    () => mapKeyToStyle("signup_action_button", screenStyles),
    []
  );

  const fullNameInputStyles = React.useMemo(
    () =>
      R.compose(
        splitInputTypeStyles,
        mapKeyToStyle("signup_full_name_input")
      )(screenStyles),
    []
  );

  const emailInputStyles = React.useMemo(
    () =>
      R.compose(
        splitInputTypeStyles,
        mapKeyToStyle("signup_email_input")
      )(screenStyles),
    []
  );

  const passwordInputStyles = React.useMemo(
    () =>
      R.compose(
        splitInputTypeStyles,
        mapKeyToStyle("signup_password_input")
      )(screenStyles),
    []
  );

  return (
    <View style={style}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <FocusableGroup id={groupId} shouldUsePreferredFocus isParallaxDisabled>
        <FocusableTextInput
          groupId={groupId}
          placeholder={
            screenStyles.signup_full_name_input_placeholder || "Full Name"
          }
          value={fullNameValue}
          onChangeText={handleInputChange(setFullNameValue)}
          label="full-name-input"
          onEndEditing={handleEditingEnd("full-name-input")}
          preferredFocus
          textInputStyles={fullNameInputStyles}
        />
        <FocusableTextInput
          groupId={groupId}
          placeholder={screenStyles.signup_email_input_placeholder || "Email"}
          value={emailValue}
          onChangeText={handleInputChange(setEmailValue)}
          label="email-input"
          onEndEditing={handleEditingEnd("email-input")}
          preferredFocus
          textInputStyles={emailInputStyles}
        />
        <FocusableTextInput
          groupId={groupId}
          placeholder={
            screenStyles.signup_password_input_placeholder || "Password"
          }
          secureTextEntry={true}
          value={passwordValue}
          onChangeText={handleInputChange(setPassword)}
          onEndEditing={handleEditingEnd("password-input")}
          label="password-input"
          textInputStyles={passwordInputStyles}
        />
        <Button
          {...{
            label: screenStyles.signup_action_button_text,
            onPress,
            groupId,
            backgroundColor: screenStyles.signup_action_button_background,
            backgroundColorFocused:
              screenStyles.signup_action_button_background_focused,
            textColorFocused:
              screenStyles.signup_action_button_fontcolor_focused,
            textStyles: buttonTextStyles,
            borderRadius: screenStyles.signup_action_button_border_radius,
          }}
        />
      </FocusableGroup>
    </View>
  );
};

SignupControls.propTypes = {
  style: ViewPropTypes.style,
  onLogin: PropTypes.func,
  errorMessage: PropTypes.string,
  screenStyles: PropTypes.object,
};

SignupControls.defaultProps = {
  onLogin: identity,
  screenStyles: {},
};

export default SignupControls;
