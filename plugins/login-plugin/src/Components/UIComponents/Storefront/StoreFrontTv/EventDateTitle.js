import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
  },
});

const EventDateTitle = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const timestamp = extensions?.event_date;
  if (!timestamp) {
    return null;
  }

  const fontStyles = React.useMemo(
    () => mapKeyToStyle("event_schedule_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, fontStyles], []);

  const date = new Date(timestamp * 1000);
  const title = date.toISOString();

  return title ? <Label styles={styles} title={title} /> : null;
};

EventDateTitle.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

EventDateTitle.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default EventDateTitle;
