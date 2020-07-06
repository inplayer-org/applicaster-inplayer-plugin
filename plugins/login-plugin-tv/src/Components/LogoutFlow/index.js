import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import session from "../../globalSessionManager";
import Layout from "../UIComponents/Layout";
import LogoutComponent from "../UIComponents/LogoutComponent";
import { logOut } from "../../pluginInterface";
import { PluginContext } from "../../Config/PluginData";

function LogoutScreen(props) {
  const { screenData, homeScreen, remoteHandler, navigator } = props;

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
    general: { login_screen_background_color: loginBackground = "" } = {},
  } = screenData || {};

  const { skip } = useContext(PluginContext);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logOut();

      setLoading(false);
      if (skip && navigator.canGoBack()) {
        navigator.goBack();
      } else {
        navigator.replace(homeScreen);
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const handleCancel = () => {
    try {
      if (navigator.canGoBack()) {
        navigator.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout
      backgroundColor={loginBackground}
      error={error}
      remoteHandler={remoteHandler}
    >
      <View style={styles.container}>
        <LogoutComponent
          loading={loading}
          handleCancel={handleCancel}
          handleLogout={handleLogout}
        />
      </View>
    </Layout>
  );
}

const styles = {
  container: {
    marginTop: "4%",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
};

export default LogoutScreen;
