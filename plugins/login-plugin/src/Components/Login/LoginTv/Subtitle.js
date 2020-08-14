import React from "react";
import { Text, View, StyleSheet } from "react-native";

import colors from "../../../colors";

const styles = StyleSheet.create({
  container: {
    marginBottom: 58,
  },
  text: {
    fontSize: 32,
    lineHeight: 48,
    color: colors.grayLighter,
    fontWeight: "normal",
  },
});

const Subtitle = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Simple and Secure User Sign-up, Sign-in and Access Control.
    </Text>
  </View>
);

export default Subtitle;
