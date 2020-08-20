import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../../../Label";
import { mapKeyToStyle } from "../../../../../../Utils/Customization";
import PropTypes from "prop-types";

const paymentActions = {
  subscribe: "Subscribe",
  buy: "Buy",
};

const styles = StyleSheet.create({
  container: {},
  text: {
    alignSelf: "center",
    textAlign: "center",
  },
});

const FeeType = (props) => {
  const {
    paymentOptionItem,
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const { productType } = paymentOptionItem;

  const title =
    productType === "subscription"
      ? paymentActions.subscribe
      : paymentActions.buy;
  const titleStyles = React.useMemo(
    () => mapKeyToStyle("payment_option_action_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, titleStyles], []);

  return <Label styles={styles} title={title.toUpperCase()} />;
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
