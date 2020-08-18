import React from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const QuickTermTitle = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = extensions?.storefront_quick_terms_text;

  if (!title) {
    return null;
  }

  const fontStyles = mapKeyToStyle("storefront_quick_terms_text", screenStyles);

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

  return title ? <Label styles={styles} title={title} /> : null;
};

// QuickTermTitle.propTypes = {
//   screenStyles: {},
//   payload: { extensions: {} },
// };
export default QuickTermTitle;
