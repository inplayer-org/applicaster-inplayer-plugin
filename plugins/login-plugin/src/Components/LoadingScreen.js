import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height
  }
});

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
    </SafeAreaView>
  );
};

export default LoadingScreen;
