import React, { useContext, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { Formik } from "formik";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";
import session from "../../globalSessionManager";
import validationSchema from "../../Utils/validation";
import Button from "./Button";
import Input from "./Input";
import { PluginContext, HookTypeData } from "../../Config/PluginData";
import { mapKeyToStyle, getInputStyle } from "../../Utils/customizationUtils";

const formStyleKeys = [
  "email_input",
  "password_input",
  "login_action_button",
  "skip_action_button",
];

const groupId = "my-inputs";

export default function LoginForm(props) {
  const { onLogin, isLoading, handleSkip, handleError } = props;

  const customStyles = useContext(PluginContext);

  const {
    email_input_placeholder: emailPlaceholder,
    password_input_placeholder: passwordPlaceholder,
    login_action_button_text: loginLabel,
    skip_action_button_text: skipLabel,
    login_action_button_background: loginButtonBackground,
    skip_action_button_background: skipButtonBackground,
    password_input_background: passwordBackground,
    email_input_background: emailBackground,
    enable_skip_functionality: skip,
    use_dark_keyboard: isDarkKeyboard,
  } = customStyles;

  const [
    emailInputStyle,
    passwordInputStyle,
    loginButtonStyle,
    skipButtonStyle,
  ] = formStyleKeys.map((key) => mapKeyToStyle(key, customStyles));

  const handleValidation = async (validateForm, handleSubmit) => {
    try {
      const errors = await validateForm();
      const error = {
        message: errors.email || errors.password,
        screen: HookTypeData.SCREEN_HOOK,
      };
      return Object.keys(errors).length > 0
        ? handleError({ error })
        : handleSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnLogin = async (values) => {
    const { email, password } = values;
    onLogin(email, password);
  };

  const renderSkipButton = () => {
    return (
      session.isHomeScreen &&
      session.appLaunch && (
        <Button
          label={skipLabel}
          buttonRef={skipButton}
          nextFocusUp={loginButton}
          onPress={handleSkip}
          buttonStyle={getInputStyle(skipButtonBackground)}
          textStyle={skipButtonStyle}
        />
      )
    );
  };

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const loginButton = useRef(null);
  const skipButton = useRef(null);

  if (Platform.OS === "android") {
    useInitialFocus(true, emailInput);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => handleOnLogin(values, actions)}
      validationSchema={validationSchema}
    >
      {({ handleChange, values, handleSubmit, validateForm }) => (
        <>
          <FocusableGroup id={groupId} isParallaxDisabled>
            <View style={styles.container}>
              <Input
                handleError={handleError}
                value={values.email}
                isDarkKeyboard={isDarkKeyboard}
                inputRef={emailInput}
                nextFocusDown={passwordInput}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                secureTextEntry={false}
                placeholder={emailPlaceholder}
                style={[getInputStyle(emailBackground), emailInputStyle]}
              />
              <Input
                handleError={handleError}
                value={values.password}
                isDarkKeyboard={isDarkKeyboard}
                inputRef={passwordInput}
                nextFocusUp={emailInput}
                nextFocusDown={loginButton}
                keyboardType="default"
                onChangeText={handleChange("password")}
                secureTextEntry={true}
                placeholder={passwordPlaceholder}
                style={[getInputStyle(passwordBackground), passwordInputStyle]}
              />
            </View>
          </FocusableGroup>
          <View style={styles.container}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <>
                <Button
                  label={loginLabel}
                  buttonRef={loginButton}
                  nextFocusUp={passwordInput}
                  nextFocusDown={skipButton}
                  buttonStyle={getInputStyle(loginButtonBackground)}
                  onPress={() => handleValidation(validateForm, handleSubmit)}
                  textStyle={loginButtonStyle}
                />
                {skip && renderSkipButton()}
              </>
            )}
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = {
  container: {
    flex: 1,
    maxHeight: 200,
    width: 600,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
};
