import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import LoadingScreen from "../../LoadingScreen";
import StoreFrontContainer from "./StoreFrontContainer";
import NavbarComponent from "../../UIComponents/NavbarComponent";

import Footer from "../UIComponents/Footer";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height,
    width,
    paddingBottom: 15,
  },
});

const StoreFrontMobile = (props) => {
  const { completeAssetFlow, screenStyles } = props;

  const {
    payment_screen_background: screenBackground = "",
    client_logo: logoUrl = "",
    close_button: buttonUrl = "",
  } = screenStyles;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: screenBackground }]}
    >
      <NavbarComponent
        buttonAction={completeAssetFlow}
        logoUrl={logoUrl}
        buttonUrl={buttonUrl}
      />
      <StoreFrontContainer {...props} />
      <Footer screenStyles={screenStyles} />
    </SafeAreaView>
  );
};

export default StoreFrontMobile;
