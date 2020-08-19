import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

FeeDescription.propTypes = {
  screenStyles: {},
  payload: { extensions: {} },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
  },
});

const FeeDescription = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = "test";

  const descriptionStyles = React.useMemo(
    () =>
      mapKeyToStyle("storefront_payment_option_description_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, descriptionStyles], []);

  return <Label styles={styles} title={title} />;
};

FeeDescription.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

FeeDescription.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default FeeDescription;
