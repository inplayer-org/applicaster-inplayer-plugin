import React from "react";
import * as R from "ramda";
import { View } from "react-native";
import PropTypes from "prop-types";

import { mapKeyToStyle } from "../../../Utils/Customization";
import Button from "../../UIComponents/Buttons/FocusableButton";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";

const SignUpControls = ({
  screenStyles,
  onPress,
  style,
  focused,
  parentFocus,
}) => {
  const buttonRef = React.useRef(null);

  useInitialFocus(focused, buttonRef);

  const buttonTextStyles = React.useMemo(
    () => mapKeyToStyle("signup_action_button", screenStyles),
    []
  );

  return (
    <View style={style}>
      <Button
        ref={buttonRef}
        {...{
          focused,
          ...parentFocus,
          label: screenStyles.signup_action_button_text || "SIGN UP",
          onPress,
          backgroundColor: screenStyles.signup_action_button_background,
          backgroundColorFocused:
            screenStyles.signup_action_button_background_focused,
          textColorFocused: screenStyles.signup_action_button_fontcolor_focused,
          textStyles: buttonTextStyles,
          borderRadius: screenStyles.signup_action_button_border_radius,
        }}
      />
    </View>
  );
};
SignUpControls.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
  screenStyles: PropTypes.object,
  focused: PropTypes.bool,
  parentFocus: PropTypes.object,
};

SignUpControls.defaultProps = {
  style: {},
  screenStyles: {},
  onPress: R.identity,
  parentFocus: {},
};

export default SignUpControls;
