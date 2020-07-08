import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 60,
    marginTop: 10,
    marginBottom: 50,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  closeBtn: {
    width: 45,
    height: 45,
  },
  logo: {
    width: 200,
    height: 44,
  },
});

export default function NavbarComponent({ buttonUrl, logoUrl, buttonAction }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={buttonAction} style={{ width: "25%" }}>
        <Image style={styles.closeBtn} source={{ uri: buttonUrl }} />
      </TouchableOpacity>
      <Image style={styles.logo} source={{ uri: logoUrl }} />
    </View>
  );
}
