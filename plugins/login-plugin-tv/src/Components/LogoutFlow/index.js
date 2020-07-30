import React, { useState } from "react";
import { View } from "react-native";
import Layout from "../UIComponents/Layout";
import LogoutComponent from "../UIComponents/LogoutComponent";
import { HookTypeData } from "../../Config/PluginData";
import { signOut } from "../../Services/inPlayerService";
import { useToggleNavBar } from "../../Utils/reactHooks";

function LogoutScreen(props) {
  const { accountFlowCallback, remoteHandler, navigator } = props;

  const [loading, setLoading] = useState(false);

  useToggleNavBar(navigator);

  const handleError = (error) => {
    console.log(error);
    error.screen = HookTypeData.USER_ACCOUNT;
    return accountFlowCallback({ error });
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      await signOut();

      setLoading(false);
      accountFlowCallback({ success: true });
    } catch (err) {
      handleError(err);
    }
  };

  const handleCancel = () => {
    try {
      if (navigator.canGoBack()) {
        navigator.goBack();
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Layout remoteHandler={remoteHandler}>
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
