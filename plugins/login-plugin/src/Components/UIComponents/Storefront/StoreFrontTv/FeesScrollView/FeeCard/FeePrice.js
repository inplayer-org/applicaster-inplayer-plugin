import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";

FeePrice.propTypes = {
  screenStyles: {},
  payload: { extensions: {} },
};

const FeePrice = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = "test";

  const priceStyles = mapKeyToStyle(
    "storefront_payment_option_amount_text",
    screenStyles
  );
  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    text: {
      ...priceStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return <Label styles={styles} title={title} />;
};

export default FeePrice;
