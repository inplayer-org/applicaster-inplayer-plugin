import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import R from "ramda";

import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { signOut } from "@applicaster/quick-brick-inplayer/src/Services/inPlayerService";
import { getStyles } from "./Customization";

const getScreenStyles = R.compose(
  R.prop("styles"),
  R.find(R.propEq("type", "quick-brick-inplayer-logout")),
  R.values,
  R.prop("rivers")
);

const InPlayerLogout = (props) => {
  const [loading, setLoading] = useState(true);
  const navigator = useNavigation();
  const {
    configuration: { completion_action = "go_back" },
  } = props;
  const screenStyles = getStyles(getScreenStyles(props));

  var infoText = screenStyles?.title_succeed_text;

  const invokeCompleteAction = () => {
    if (completion_action === "go_home") {
      navigator.goHome();
    } else {
      navigator.goBack();
    }
  };
  useEffect(() => {
    navigator.hideNavBar();
    performSignOut();
  }, []);

  const performSignOut = () => {
    signOut()
      .then((didLogout) => {
        if (didLogout) {
          setTimeout(() => {
            invokeCompleteAction();
          }, 2000);
        } else {
          navigator.goBack();
        }
      })
      .catch(() => {
        infoText = screenStyles?.title_fail_text;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const textStyle = {
    fontFamily: platformSelect({
      ios: screenStyles?.title_font_ios,
      android: screenStyles?.title_font_android,
    }),
    fontSize: screenStyles?.title_font_size,
    color: screenStyles?.title_font_color,
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: screenStyles?.background_color,
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

export default InPlayerLogout;
