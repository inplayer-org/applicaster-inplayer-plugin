import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const SubscriptionTitle = (props) => {
  console.log({ props });
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;
  const { subscription_default_title_text } = screenStyles;
  const subscriptionFontStyles = mapKeyToStyle(
    "subscription_default_title_text",
    screenStyles
  );
  console.log({ subscriptionFontStyles, screenStyles });

  const title = extensions.event_title || subscription_default_title_text;
  console.log({ title });
  const styles = StyleSheet.create({
    container: {},
    text: {
      ...subscriptionFontStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return <Label styles={styles} title={title} />;
};

export default SubscriptionTitle;

SubscriptionTitle.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};
