import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
  },
});

const FeeType = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = "test";
  const titleStyles = React.useMemo(
    () => mapKeyToStyle("event_schedule_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, titleStyles], []);

  return <Label styles={styles} title={title} />;
};

FeeType.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

FeeType.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default FeeType;
