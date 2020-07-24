import React, { useState, useContext } from "react";
import { View } from "react-native";
import Layout from "../UIComponents/Layout";
import LogoutComponent from "../UIComponents/LogoutComponent";
import { PluginContext } from "../../Config/PluginData";

function LogoutScreen(props) {
  const { homeScreen, remoteHandler, navigator } = props;
  const customStyles = useContext(PluginContext);

  const {
    confirmation_background: logoutScreenBackground,
    enable_skip_functionality: skip,
  } = customStyles;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

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
      backgroundColor={logoutScreenBackground}
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
    marginTop: 50,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
};

export default LogoutScreen;
