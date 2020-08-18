import React from "react";
import { StyleSheet, View } from "react-native";
import SubscriptionTitle from "./SubscriptionTitle";
import SubscriptionDescription from "./SubscriptionDescription";
import EventDateTitle from "./EventDateTitle";

import PropTypes from "prop-types";
import { identity } from "ramda";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", width: "100%" },
  loginControls: {
    position: "relative",
    width: 556,
    marginTop: 384,
    marginRight: 250,
  },
  contentWrapper: {
    width: 687,
    marginTop: 232,
    marginLeft: 259,
    marginRight: 168,
  },
});

const StoreFrontTv = (props) => {
  console.log("StoreFrontTv", { props });
  const { completeAssetFlow, screenStyles } = props;

  const {
    payment_screen_background: screenBackground = "",
    client_logo: logoUrl = "",
    close_button: buttonUrl = "",
  } = screenStyles;

  return (
    <View style={{ flex: 1 }}>
      <SubscriptionTitle {...props} />
      <EventDateTitle {...props} />
      <SubscriptionDescription {...props} />
    </View>
  );
};

export default StoreFrontTv;
