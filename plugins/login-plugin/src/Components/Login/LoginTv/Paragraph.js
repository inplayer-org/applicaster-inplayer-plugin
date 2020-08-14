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
      If you don't own an account please fo to
      <Text
        style={[styles.text, styles.textLink]}
        onPress={() => Linking.openURL("http://www.clipmyhorse.tv")}
      >
        {" "}
        https://yourdomain.com/signup{" "}
      </Text>
    </Text>
    <Text style={styles.text}>
      {"\n"}
      Forgot your password? {"\n"} Go to https://yourdomain.com/forgotpassword{" "}
    </Text>
  </View>
);

export default Paragraph;
