import React from "react";
import { View, ScrollView, BackHandler } from "react-native";
import * as R from "ramda";
import PrivacyTitle from "./PrivacyTitle";
import PrivacyDescription from "./PrivacyDescription";
import PropTypes from "prop-types";

const PrivacyPolicyTv = (props) => {
  const { screenStyles, onHandleBack } = props;

  const {
    privacy_screen_background_color,
    privacy_text_area_background_color,
  } = screenStyles;

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", hardwareBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", hardwareBack);
    };
  }, []);

  const hardwareBack = () => {
    onHandleBack();
  };

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
  onHandleBack: PropTypes.func,
};

PrivacyPolicyTv.defaultProps = {
  screenStyles: {},
  onHandleBack: R.identity,
};

export default PrivacyPolicyTv;
