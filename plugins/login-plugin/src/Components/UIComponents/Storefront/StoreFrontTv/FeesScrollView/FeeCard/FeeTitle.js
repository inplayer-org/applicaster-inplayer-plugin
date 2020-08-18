import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";

FeeTitle.propTypes = {
  screenStyles: {},
  payload: { extensions: {} },
};

const FeeTitle = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = "test";

  const titleStyles = mapKeyToStyle(
    "storefront_payment_option_title_text",
    screenStyles
  );

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    text: {
      ...titleStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return <Label styles={styles} title={title} />;
};

export default FeeTitle;
