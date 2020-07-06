import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { Formik } from "formik";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import session from "../../globalSessionManager";
import validationSchema from "../../Utils/validation";
import Button from "./Button";
import Input from "./Input";
import { PluginContext } from "../../Config/PluginData";

export default function LoginForm(props) {
  const { onLogin, isLoading, handleSkip, handleError } = props;

  const {
    customText,
    skipButtonStyle,
    usernameInputStyle,
    passwordInputStyle,
    loginButtonStyle,
    skip,
    isDarkKeyboard,
  } = useContext(PluginContext);

  const groupId = "my-inputs";

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

  const renderSkipButton = () =>
    session.isHomeScreen &&
    session.appLaunch && (
      <Button
        label={customText.skipLabel}
        onPress={handleSkip}
        buttonStyle={styles.input}
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
          <View style={styles.container}>
            <FocusableGroup id={groupId} isParallaxDisabled>
              <Input
                handleError={handleError}
                value={values.username}
                isDarkKeyboard={isDarkKeyboard}
                keyboardType="email-address"
                onChangeText={handleChange("username")}
                secureTextEntry={false}
                placeholder={customText.usernamePlaceholder}
                style={{ ...styles.input, ...usernameInputStyle }}
              />
              <Input
                handleError={handleError}
                value={values.password}
                isDarkKeyboard={isDarkKeyboard}
                keyboardType="default"
                onChangeText={handleChange("password")}
                secureTextEntry
                placeholder={customText.passwordPlaceholder}
                style={{
                  ...styles.input,
                  ...passwordInputStyle,
                  marginBottom: 0,
                }}
              />
            </FocusableGroup>
          </View>
          <View style={styles.container}>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <Button
                  label={customText.loginLabel}
                  buttonStyle={styles.input}
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
    minWidth: 600,
    minHeight: "6%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "7%",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "grey",
    borderColor: "white",
    width: 600,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1.5%",
  },
};
