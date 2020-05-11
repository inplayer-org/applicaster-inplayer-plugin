import React, { useState, useEffect } from "react";
import R from "ramda";

import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { connectToStore } from "@applicaster/zapp-react-native-redux";
import { fixColorHexCode } from "@applicaster/zapp-react-native-utils/stylesUtils";
import { signOut } from "@applicaster/quick-brick-inplayer/src/Services/inPlayerService";
import { Text, SafeAreaView, Platform, ActivityIndicator } from "react-native";

const InPlayerLogout = (props) => {
  const [loading, setLoading] = useState(true);
  const navigator = useNavigation();
  var infoText = "Successfully Logged Out";

  useEffect(() => {
    if (loading == false) {
      setTimeout(() => {
        navigator.goHome();
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    navigator.hideNavBar();
    const { configuration } = props;

    signOut()
      .then(() => {
        console.log("Finished!");
      })
      .catch(() => {
        infoText = "Logout Failed";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const bgColor = Platform.select({
    ios: R.compose(
      fixColorHexCode,
      R.path(["styles", "iphone", "background_color", "color"])
    )(props),
    android: "black",
  });
  console.log("loading", { loading });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: bgColor,
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {loading === true ? (
        <ActivityIndicator color={"white"} size={"large"} />
      ) : (
        <Text style={{ color: "white" }}>{infoText}</Text>
      )}
    </SafeAreaView>
  );
};

export default connectToStore(R.pick(["styles"]))(InPlayerLogout);
