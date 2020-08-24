import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { signOut } from "../../Services/inPlayerService";
import { removeFromLocalStorage } from "../../Utils/UserAccount";
import PropTypes from "prop-types";

const LogoutFlow = (props) => {
  const [loading, setLoading] = useState(true);
  const navigator = useNavigation();
  const {
    configuration: { logout_completion_action = "go_back" },
  } = props;
  const { screenStyles } = props;
  var infoText = screenStyles?.logout_title_succeed_text;

  useEffect(() => {
    navigator.hideNavBar();
    performSignOut();
    return () => {
      navigator.showNavBar();
    };
  }, []);

  const invokeCompleteAction = () => {
    if (logout_completion_action === "go_home") {
      navigator.goHome();
    } else {
      navigator.goBack();
    }
  };

  const removeIdToken = async () => {
    await removeFromLocalStorage("idToken");
  };

  const performSignOut = () => {
    signOut()
      .then(async (didLogout) => {
        if (didLogout) {
          await removeIdToken();
        } else {
          navigator.goBack();
        }
      })
      .catch(() => {
        infoText = screenStyles?.logout_title_fail_text;
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          invokeCompleteAction();
        }, 1000);
      });
  };

  const textStyle = {
    fontFamily: platformSelect({
      ios: screenStyles?.logout_title_font_ios,
      android: screenStyles?.logout_title_font_android,
      tvos: screenStyles?.logout_title_font_tvos,
      android_tv: screenStyles?.logout_title_font_android_tv,
    }),
    fontSize: screenStyles?.logout_title_font_size,
    color: screenStyles?.logout_title_font_color,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: screenStyles?.logout_background_color,
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {loading === true ? (
        <ActivityIndicator color={"white"} size={"large"} />
      ) : (
        <Text style={textStyle}>{infoText}</Text>
      )}
    </View>
  );
};

export default LogoutFlow;

LogoutFlow.propTypes = {
  configuration: PropTypes.object,
  screenStyles: PropTypes.object,
};

LogoutFlow.defaultProps = {
  configuration: {},
  screenStyles: {},
};
