import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

// SubscriptionTitle.propTypes = {
//   screenStyles: PropTypes.object,
//   payload: { extensions: PropTypes.object },
// };

const SubscriptionTitle = (props) => {
  const subscriptionFontStyles = mapKeyToStyle(
    "store_front_event_subscription_text",
    screenStyles
  );

  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;
  const {
    store_front_event_subscription_text = "Demo fallback text",
  } = screenStyles;

  const title = extensions.event_title
    ? extensions.eventTitle
    : store_front_event_subscription_text;

  const styles = StyleSheet.create({
    container: {
      marginTop: 150,
    },
    text: {
      ...subscriptionFontStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return <Label styles={styles} title={title} />;
};

export default SubscriptionTitle;
