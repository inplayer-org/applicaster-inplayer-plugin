import React from "react";
import { StyleSheet } from "react-native";
import Label from "../../Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {},
  text: {
    alignSelf: "center",
    textAlign: "center",
  },
});

const SubscriptionTitle = (props) => {
  console.log({ props });
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;
  const { subscription_default_title_text } = screenStyles;

  const subscriptionFontStyles = React.useMemo(
    () => mapKeyToStyle("subscription_default_title_text", screenStyles),
    [screenStyles]
  );
  styles.text = React.useMemo(() => [styles.text, subscriptionFontStyles], []);

  const title = extensions.event_title || subscription_default_title_text;

  return <Label styles={styles} title={title} />;
};

SubscriptionTitle.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

SubscriptionTitle.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default SubscriptionTitle;
