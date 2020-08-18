import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const SubscriptionDescription = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const location = extensions?.event_location;
  const description = extensions?.event_description;
  const title = location || description;

  if (!title) {
    return null;
  }

  const fontStyles = mapKeyToStyle(
    "subscription_default_description_text",
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

  return title ? <Label styles={styles} title={title} /> : null;
};

SubscriptionDescription.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

export default SubscriptionDescription;
