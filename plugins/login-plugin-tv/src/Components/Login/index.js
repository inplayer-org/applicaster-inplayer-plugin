import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import session from "../../globalSessionManager";
import Layout from "../UIComponents/Layout";
import TextComponent from "../UIComponents/TextComponent";
import { getAccessToken } from "../../pluginInterface";
import { setToLocalStorage } from "../../Utils/storageUtils";
import LoginForm from "../UIComponents/LoginForm";

const { height } = Dimensions.get("window");

function LoginScreen(props) {
  const { closeHook, navigator, screenData, remoteHandler } = props;

  useEffect(
    () => () => {
      session.appLaunch = false;
    },
    [session.isSkipped]
  );

  useEffect(() => {
    return () => {
      if (session.navBarHidden) {
        navigator.showNavBar();
      }
    };
  }, []);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    general: {
      login_screen_background_color: loginBackground = "",
      aws_configuration_json: configFileUrl = "",
    } = {},
  } = screenData || {};

  const onLogin = async (username, password) => {
    setLoading(true);
    setError(null);

    return getSignInStatus(username, password);
  };

  const getSignInStatus = async (username, password) => {
    try {
      const [accessToken, idToken] = await getAccessToken(
        username,
        password,
        configFileUrl
      );

      if (accessToken && idToken) {
        await setToLocalStorage("accessToken", accessToken);
        await setToLocalStorage("idToken", idToken);

        return closeHook ? closeHook({ success: true }) : navigator.goBack();
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const handleError = (err = null) => {
    setError(err);
  };

  const handleSkip = async () => {
    session.isSkipped = true;

    closeHook({ success: true });
  };

  return (
    <Layout
      backgroundColor={loginBackground}
      error={error}
      remoteHandler={remoteHandler}
    >
      <View style={styles.loginContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TextComponent />
          </View>
          <View style={styles.formContainer}>
            <LoginForm
              onLogin={onLogin}
              isLoading={loading}
              handleSkip={handleSkip}
              handleError={handleError}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = {
  loginContainer: {
    flex: 1,
    width: "100%",
    height,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    paddingRight: "2%",
    alignItems: "flex-start",
  },
  formContainer: {
    flex: 1,
    paddingLeft: "2%",
    alignItems: "flex-end",
  },
};

export default LoginScreen;
