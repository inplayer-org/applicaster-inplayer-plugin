import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

FeePrice.propTypes = {
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

const FeePrice = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = "test";

  const priceStyles = React.useMemo(
    () => mapKeyToStyle("storefront_payment_option_amount_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, priceStyles], []);

  return <Label styles={styles} title={title} />;
};

FeePrice.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

FeePrice.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default FeePrice;
