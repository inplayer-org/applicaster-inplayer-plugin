import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

// EventDateTitle.propTypes = {
//   screenStyles: {},
//   payload: { extensions: {} },
// };

const EventDateTitle = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const timestamp = extensions?.event_date;
  if (!timestamp) {
    return null;
  }

  const fontStyles = mapKeyToStyle(
    "store_front_event_schedule_text",
    screenStyles
  );

  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
    },
    text: {
      ...fontStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  var date = new Date(timestamp * 1000);
  const title = date.toISOString();

  return title ? <Label styles={styles} title={title} /> : null;
};

export default EventDateTitle;
