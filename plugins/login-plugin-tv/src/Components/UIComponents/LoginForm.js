import React, { useContext } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import session from "../../globalSessionManager";
import validationSchema from "../../Utils/validation";
import Button from "./Button";
import Input from "./Input";
import { PluginContext } from "../../Config/PluginData";
import { mapKeyToStyle } from "../../Utils/customizationUtils";

const formStyleKeys = [
  "username_input",
  "password_input",
  "login_action_button",
  "skip_action_button",
];

const groupId = "my-inputs";

const getInputStyle = (backgroundColor) => {
  return {
    ...styles.input,
    backgroundColor: backgroundColor || "grey",
  };
};

export default function LoginForm(props) {
  const { onLogin, isLoading, handleSkip, handleError } = props;

  const customStyles = useContext(PluginContext);

  const {
    username_input_placeholder: usernamePlaceholder,
    password_input_placeholder: passwordPlaceholder,
    login_action_button_text: loginLabel,
    skip_action_button_text: skipLabel,
    login_action_button_background: loginButtonBackground,
    skip_action_button_background: skipButtonBackground,
    password_input_background: passwordBackground,
    username_input_background: usernameBackground,
    enable_skip_functionality: skip,
    use_dark_keyboard: isDarkKeyboard,
  } = customStyles;

  const [
    usernameInputStyle,
    passwordInputStyle,
    loginButtonStyle,
    skipButtonStyle,
  ] = formStyleKeys.map((key) => mapKeyToStyle(key, customStyles));

  const handleValidation = async (validateForm, handleSubmit) => {
    try {
      const errors = await validateForm();
      return Object.keys(errors).length > 0
        ? handleError({ message: errors.username || errors.password })
        : handleSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnLogin = async (values) => {
    const { username, password } = values;
    onLogin(username, password);
  };

  const renderSkipButton = () => (
    <Button
      label={skipLabel}
      onPress={handleSkip}
      buttonStyle={getInputStyle(skipButtonBackground)}
      textStyle={skipButtonStyle}
    />
  );

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, actions) => handleOnLogin(values, actions)}
      validationSchema={validationSchema}
    >
      {({ handleChange, values, handleSubmit, validateForm }) => (
        <>
          <FocusableGroup
            id={groupId}
            isParallaxDisabled
            style={styles.container}
          >
            <Input
              handleError={handleError}
              value={values.username}
              isDarkKeyboard={isDarkKeyboard}
              keyboardType="email-address"
              onChangeText={handleChange("username")}
              secureTextEntry={false}
              placeholder={usernamePlaceholder}
              style={[getInputStyle(usernameBackground), usernameInputStyle]}
            />
            <Input
              handleError={handleError}
              value={values.password}
              isDarkKeyboard={isDarkKeyboard}
              keyboardType="default"
              onChangeText={handleChange("password")}
              secureTextEntry={true}
              placeholder={passwordPlaceholder}
              style={[getInputStyle(passwordBackground), passwordInputStyle]}
            />
          </FocusableGroup>
          <View style={styles.container}>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <Button
                  label={loginLabel}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#787878",
    width: 600,
    height: 90,
  },
};
