import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const PolicyAgreementTitle = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const title = screenStyles?.policy_agreement_text;

  const fontStyles = mapKeyToStyle("policy_agreement_text", screenStyles);

  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      marginLeft: 281,
      marginRight: 281,
    },
    text: {
      ...fontStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return title ? <Label styles={styles} title={title} /> : null;
};

PolicyAgreementTitle.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

export default PolicyAgreementTitle;
