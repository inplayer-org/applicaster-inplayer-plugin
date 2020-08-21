import React from "react";
import { View, ScrollView } from "react-native";
import PrivacyTitle from "./PrivacyTitle";
import PrivacyDescription from "./PrivacyDescription";
import PropTypes from "prop-types";

const PrivacyPolicyTv = (props) => {
  const { screenStyles } = props;

  const {
    privacy_screen_background_color,
    privacy_text_area_background_color,
  } = screenStyles;

  const styles = React.useMemo(() => ({
    container: {
      flex: 1,
      width: "100%",
      alignContent: "center",
      backgroundColor: privacy_screen_background_color,
    },
    scrollView: {
      marginTop: 75,
      marginLeft: 270,
      marginRight: 270,
      backgroundColor: privacy_text_area_background_color,
    },
  }));
  console.log({
    screenStyles,
    privacy_screen_background_color,
    privacy_text_area_background_color,
  });
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PrivacyTitle {...props} />
        <PrivacyDescription {...props} />
      </ScrollView>
    </View>
  );
};

PrivacyPolicyTv.propTypes = {
  screenStyles: PropTypes.object,
};

PrivacyPolicyTv.defaultProps = {
  screenStyles: {},
};

export default PrivacyPolicyTv;
