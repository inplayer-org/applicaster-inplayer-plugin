import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../../Label";
import { mapKeyToStyle } from "../../../../../Utils/Customization";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    marginTop: 66,
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
  },
});

const PrivacyTitle = (props) => {
  const { screenStyles } = props;
  const { privacy_main_title_text } = screenStyles;

  const titleStyles = React.useMemo(
    () => mapKeyToStyle("privacy_main_title_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, titleStyles], []);

  return <Label styles={styles} title={privacy_main_title_text} />;
};

PrivacyTitle.propTypes = {
  screenStyles: PropTypes.object,
};

PrivacyTitle.defaultProps = {
  screenStyles: {},
};

export default PrivacyTitle;
