import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 281,
    marginRight: 281,
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
  },
});

const PolicyAgreementTitle = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = screenStyles?.policy_agreement_text;

  const fontStyles = React.useMemo(
    () => mapKeyToStyle("policy_agreement_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, fontStyles], []);

  return title ? <Label styles={styles} title={title} /> : null;
};

PolicyAgreementTitle.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

PolicyAgreementTitle.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default PolicyAgreementTitle;
