import React, { useState, useEffect } from "react";
import R, { prop } from "ramda";
import { AccountModule } from "./src/NativeModules/AccountModule";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { connectToStore } from "@applicaster/zapp-react-native-redux";
import { fixColorHexCode } from "@applicaster/zapp-react-native-utils/stylesUtils";

import { Text, SafeAreaView, Platform, ActivityIndicator } from "react-native";

const InPlayerLogout = (props) => {
  const [loading, setLoading] = useState(true);
  const navigator = useNavigation();

  useEffect(() => {
    navigator.hideNavBar();
    const { configuration } = props;
    console.log("Component Ready!!");
    AccountModule.signOut(configuration)
      .then((isSignedOut) => {
        setLoading(false);
        navigator.goHome();
      })
      .catch((err) => {
        navigator.goBack();
        throw err;
      });
  }, []);

  const bgColor = Platform.select({
    ios: R.compose(
      fixColorHexCode,
      R.path(["styles", "iphone", "background_color", "color"])
    )(props),
    android: "black",
  });

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
      {loading ? (
        <ActivityIndicator color={"white"} size={"large"} />
      ) : (
        <Text style={{ color: "white" }}>Successfully Logged Out</Text>
      )}
    </SafeAreaView>
  );
};

export default connectToStore(R.pick(["styles"]))(InPlayerLogout);
