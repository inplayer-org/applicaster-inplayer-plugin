import React from "react";
import { Text, View, StyleSheet } from "react-native";

import colors from "../../../colors";

const styles = StyleSheet.create({
  container: {
    marginBottom: 71,
  },
  text: {
    fontSize: 60,
    lineHeight: 72,
    color: colors.white,
    fontWeight: "bold",
  },
});

console.disableYellowBox = true;

const Title = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Login to Your Account</Text>
  </View>
);

export default Title;
