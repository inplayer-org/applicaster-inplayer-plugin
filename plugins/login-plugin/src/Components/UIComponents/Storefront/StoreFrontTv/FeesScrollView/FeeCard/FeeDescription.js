import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";

FeeDescription.propTypes = {
  screenStyles: {},
  payload: { extensions: {} },
};

const FeeDescription = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = "test";

  const descriptionStyles = mapKeyToStyle(
    "storefront_payment_option_description_text",
    screenStyles
  );

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    text: {
      ...descriptionStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return <Label styles={styles} title={title} />;
};

export default FeeDescription;
