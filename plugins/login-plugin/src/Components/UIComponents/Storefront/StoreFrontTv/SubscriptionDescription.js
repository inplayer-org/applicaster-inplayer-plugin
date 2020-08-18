import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

// SubscriptionDescription.propTypes = {
//   screenStyles: {},
//   payload: { extensions: {} },
// };

const SubscriptionDescription = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const location = extensions?.event_location;
  const description = extensions?.event_description;

  if (!location && !description) {
    return null;
  }

  const fontStyles = mapKeyToStyle(
    "store_front_event_subscription_description_text",
    screenStyles
  );

  const styles = StyleSheet.create({
    container: {
      marginTop: 60,
    },
    text: {
      ...fontStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  const title = location || description;
  return title ? <Label styles={styles} title={title} /> : null;
};

export default SubscriptionDescription;
