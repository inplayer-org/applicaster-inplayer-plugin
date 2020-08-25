import React, { useState } from "react";
import * as R from "ramda";
import { View, ViewPropTypes, StyleSheet, Text, Platform } from "react-native";
import { usePrevious } from "@applicaster/zapp-react-native-utils/reactHooks/utils";

import PropTypes from "prop-types";
import { identity } from "ramda";
import {
  useInitialFocus,
  useFocusManager,
  useFocusRefs,
} from "@applicaster/zapp-react-native-utils/focusManager";

import FocusableTextInput from "../../UIComponents/FocusableTextInput";
import Button from "../../UIComponents/Buttons/FocusableButton";
import colors from "../../../colors";
import {
  mapKeyToStyle,
  splitInputTypeStyles,
} from "../../../Utils/Customization";

const groupId = "login-controls";

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

const LoginControls = ({
  style,
  errorMessage,
  onLogin,
  screenStyles,
  focused,
  parentFocus,
}) => {
  const [usernameValue, setUsername] = useState("");
  const [passwordValue, setPassword] = useState("");
  const loginInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);
  const loginButtonRef = React.useRef(null);
  const [initialFocusable, setInitialFocusable] = useState(loginInputRef);

  React.useEffect(() => {
    focused && setInitialFocusable(loginButtonRef);
  }, [focused]);

  useInitialFocus(focused, initialFocusable);

  const onPress = () => {
    onLogin({ email: usernameValue, password: passwordValue });
  };

  const handleInputChange = (setter) => (text) => {
    setter(text);
  };

  const handleEditingEnd = (label) => () => {
    console.log("handleEditingEnd", { label });
    /**
     * Wait for the focus manager to finish previous focusing job
     * (Bit of the hack but it works well from the UX point of view)
     */
    // setTimeout(() => {
    //   const usernameInputId = "login-input";
    //   const passwordInputId = "password-input";
    //   const loginButtonId = `${groupId}-LOGIN`;
    //   const focusOnItem = (item) =>
    //     focusManager.forceFocusOnFocusable({ itemId: item });

    //   if (label === "login-input") {
    //     if (passwordValue === "") {
    //       focusOnItem(passwordInputId);
    //     } else {
    //       if (usernameValue !== "") {
    //         focusOnItem(loginButtonId);
    //       }
    //       // else, stay on username field
    //     }
    //   }
    //   if (label === "password-input") {
    //     if (usernameValue === "") {
    //       focusOnItem(usernameInputId);
    //     } else {
    //       if (passwordValue !== "") {
    //         focusOnItem(loginButtonId);
    //       }
    //       // else stay on password field
    //     }
    //   }
    // }, 1000);
  };

  const buttonTextStyles = React.useMemo(
    () => mapKeyToStyle("login_action_button", screenStyles),
    []
  );

  const loginInputStyles = React.useMemo(
    () =>
      R.compose(
        splitInputTypeStyles,
        mapKeyToStyle("email_input")
      )(screenStyles),
    []
  );

  const passwordInputStyles = React.useMemo(
    () =>
      R.compose(
        splitInputTypeStyles,
        mapKeyToStyle("password_input")
      )(screenStyles),
    []
  );
  return (
    <View style={style}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <FocusableTextInput
        ref={loginInputRef}
        placeholder={screenStyles.email_input_placeholder}
        value={usernameValue}
        onChangeText={handleInputChange(setUsername)}
        label="login-input"
        onEndEditing={handleEditingEnd("login-input")}
        preferredFocus
        nextFocusUp={parentFocus.nextFocusUp}
        nextFocusDown={passwordInputRef}
        textInputStyles={loginInputStyles}
        groupId={groupId}
      />
      <FocusableTextInput
        groupId={groupId}
        ref={passwordInputRef}
        placeholder={screenStyles.password_input_placeholder}
        secureTextEntry={true}
        value={passwordValue}
        onChangeText={handleInputChange(setPassword)}
        onEndEditing={handleEditingEnd("password-input")}
        label="password-input"
        textInputStyles={passwordInputStyles}
        nextFocusUp={loginInputRef}
        nextFocusDown={loginButtonRef}
      />
      <Button
        ref={loginButtonRef}
        nextFocusUp={passwordInputRef}
        nextFocusDown={parentFocus.nextFocusDown}
        {...{
          label: screenStyles.login_action_button_text,
          onPress,
          groupId: groupId,
          backgroundColor: screenStyles.login_action_button_background,
          backgroundColorFocused:
            screenStyles.login_action_button_background_focused,
          textColorFocused: screenStyles.login_action_button_fontcolor_focused,
          textStyles: buttonTextStyles,
          borderRadius: screenStyles.login_action_button_border_radius,
        }}
      />
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
