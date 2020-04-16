import * as React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";

// callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void,

export function PlayerHookComponent(props) {
  const { callback, payload, configuration } = props;

  const navigator = useNavigation();

  function authenticateItem() {
    /* .... */
    // if (shouldLogin) {
    //   navigator.push(loginScreen);
    // }
  }

  function success(streamUrl) {
    payload.content.src = streamUrl;
    callback({ success: true, paylaod });
  }

  function fail() {
    callback({ success: false, error: new Error("oups"), payload });
  }

  function cancel() {
    callback({ success: false, payload });
  }

  React.useEffect(() => {
    // will run when component mounts

    if (payload?.extensions?.inPlayerStreamId) {
      authenticateItem();
    } else {
      success();
    }
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}
