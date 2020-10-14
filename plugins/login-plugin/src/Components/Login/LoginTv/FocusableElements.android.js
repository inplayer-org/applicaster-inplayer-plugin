import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";
import { useFocusManager } from "@applicaster/zapp-react-native-utils/focusManager";

import LoginControls from "./LoginControls";
import SignUpControls from "./SignUpControls";

const FocusableElements = ({
  onLogin,
  errorMessage,
  screenStyles,
  loginStyles,
  signupStyles,
  onSignup,
}) => {
  const loginControlsRef = React.useRef(null);
  const signupButtonRef = React.useRef(null);

  const { setFocus } = useFocusManager();

  React.useEffect(() => {
    setFocus(loginControlsRef);
  }, []);

  return (
    <View>
      <Focusable
        id="login-controls"
        ref={loginControlsRef}
        nextFocusDown={signupButtonRef}
      >
        {(focused, parentFocus) => (
          <LoginControls
            {...{
              style: loginStyles,
              onLogin,
              errorMessage,
              screenStyles,
              focused,
              parentFocus,
            }}
          />
        )}
      </Focusable>
      <Focusable
        id="signup-button"
        ref={signupButtonRef}
        nextFocusUp={loginControlsRef}
      >
        {(focused, parentFocus) => (
          <SignUpControls
            {...{
              style: signupStyles,
              onPress: onSignup,
              screenStyles,
              focused,
              parentFocus,
            }}
          />
        )}
      </Focusable>
    </View>
  );
};

FocusableElements.propTypes = {
  onLogin: PropTypes.func,
  errorMessage: PropTypes.string,
  loginStyles: PropTypes.object,
  signupStyles: PropTypes.object,
  onSignup: PropTypes.func,
  screenStyles: PropTypes.object,
};

FocusableElements.defaultProps = {
  onLogin: () => {},
  loginStyles: {},
  signupStyles: {},
  onSignup: () => {},
  screenStyles: {},
};

export default FocusableElements;
