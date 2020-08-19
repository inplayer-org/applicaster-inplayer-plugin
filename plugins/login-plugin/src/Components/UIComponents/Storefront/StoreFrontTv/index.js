import React from "react";
import { StyleSheet, View } from "react-native";
import SubscriptionTitle from "./SubscriptionTitle";
import SubscriptionDescription from "./SubscriptionDescription";
import EventDateTitle from "./EventDateTitle";
import PolicyAgreementTitle from "./PolicyAgreementTitle";

import ClientLogo from "../../ClientLogo";

import PropTypes from "prop-types";
import { identity } from "ramda";

const StoreFrontTv = (props) => {
  const { completeAssetFlow, screenStyles } = props;

  const {
    storefront_screen_background_color: screenBackground = null,
    client_logo: logoUrl = "",
  } = screenStyles;

  const styles = React.useMemo(() =>
    StyleSheet.create({
      container: {
        flex: 1,
        width: "100%",
        alignContent: "center",
        backgroundColor: screenBackground,
      },
      contentWrapper: {
        flex: 1,
        marginTop: 150,
        marginLeft: 182,
        marginRight: 182,
      },
      clientLogoView: {
        position: "absolute",
        top: 58,
        left: 58,
      },
    })
  );

  return (
    <View style={styles.container}>
      <View style={styles.clientLogoView}>
        <ClientLogo imageSrc={logoUrl} />
      </View>
      <View style={styles.contentWrapper}>
        <SubscriptionTitle {...props} />
        <EventDateTitle {...props} />
        <SubscriptionDescription {...props} />
        <PolicyAgreementTitle {...props} />
      </View>
    </View>
  );
};

export default StoreFrontTv;
