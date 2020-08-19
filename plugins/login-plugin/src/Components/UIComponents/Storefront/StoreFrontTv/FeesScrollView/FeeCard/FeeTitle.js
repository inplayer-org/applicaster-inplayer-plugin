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
    ...titleStyles,
    alignSelf: "center",
    textAlign: "center",
  },
});

const FeeTitle = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = "test";

  const titleStyles = React.useMemo(
    () => mapKeyToStyle("storefront_payment_option_title_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, titleStyles], []);

  return <Label styles={styles} title={title} />;
};

FeeTitle.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

FeeTitle.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default FeeTitle;
