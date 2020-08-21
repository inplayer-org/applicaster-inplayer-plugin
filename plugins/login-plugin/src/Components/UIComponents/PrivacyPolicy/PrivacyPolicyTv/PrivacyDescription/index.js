import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../../Label";
import { mapKeyToStyle } from "../../../../../Utils/Customization";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    marginTop: 66,
    marginLeft: 100,
    marginRight: 100,
  },
  text: {
    alignSelf: "center",
    textAlign: "justify",
  },
});

const PrivacyDescription = (props) => {
  const { screenStyles } = props;
  const { privacy_text } = screenStyles;
  console.log({ privacy_text });
  const descriptionStyles = React.useMemo(
    () => mapKeyToStyle("privacy_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, descriptionStyles], []);
  const title = privacy_text.replace(/\\n/g, "\n");
  return <Label styles={styles} title={title} />;
};

PrivacyDescription.propTypes = {
  screenStyles: PropTypes.object,
};

PrivacyDescription.defaultProps = {
  screenStyles: {},
};

export default PrivacyDescription;
