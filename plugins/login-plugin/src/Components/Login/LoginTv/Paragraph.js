import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";

import colors from "../../../colors";

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.grayLight,
    fontWeight: "normal",
  },
  textLink: {
    color: colors.grayLighter,
  },
});

const Paragraph = () => (
  <View>
    <Text style={styles.text}>
      Forgot your password? {"\n"} Go to https://yourdomain.com/forgotpassword{" "}
    </Text>
  </View>
);

export default Paragraph;
