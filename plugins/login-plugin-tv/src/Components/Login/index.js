import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import session from "../../globalSessionManager";
import Layout from "../UIComponents/Layout";
import TextBlockComponent from "../UIComponents/TextBlockComponent";
import LoginForm from "../UIComponents/LoginForm";
import * as InPlayerService from "../../Services/inPlayerService";
import { HookTypeData } from "../../Config/PluginData";
import { useToggleNavBar } from "../../Utils/reactHooks";

const { height } = Dimensions.get("window");

function LoginScreen(props) {
  const {
    configuration,
    remoteHandler,
    accountFlowCallback,
    navigator,
  } = props;

  const {
    in_player_client_id: clientId,
    in_player_referrer: referrer,
  } = configuration;

  const [loading, setLoading] = useState(false);
  let stillMounted = true;

  useToggleNavBar(navigator);

  useEffect(() => {
    return () => {
      stillMounted = false;
    };
  }, []);

  useEffect(
    () => () => {
      session.appLaunch = false;
    },
    [session.isSkipped]
  );

  const onLogin = async (email, password) => {
    stillMounted && setLoading(true);
    try {
      await InPlayerService.login({ email, password, clientId, referrer });
      accountFlowCallback({ success: true });
    } catch (error) {
      stillMounted && setLoading(false);
      error.screen = HookTypeData.SCREEN_HOOK;
      accountFlowCallback({ error });
    }
  };

  const handleSkip = async () => {
    session.isSkipped = true;

    accountFlowCallback({ success: true });
  };

  return (
    <Layout remoteHandler={remoteHandler}>
      <View style={styles.loginContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TextBlockComponent />
          </View>
          <View style={styles.formContainer}>
            <LoginForm
              onLogin={onLogin}
              isLoading={loading}
              handleSkip={handleSkip}
              handleError={accountFlowCallback}
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
