import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import { mapKeyToStyle } from "../../../../../Utils/Customization";
import FeeCard from "./FeeCard";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    top: 500,
    left: 177,
    right: 177,
    height: 260,
    position: "absolute",
  },
});

const FeesScrollView = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
    dataSource,
    onPressPaymentOption,
  } = props;
  console.log({ container: styles.container, dataSource });

  return (
    <ScrollView style={styles.container} horizontal={true}>
      {dataSource.map((item, index) => (
        <FeeCard
          screenStyles={screenStyles}
          paymentOptionItem={item}
          key={item.productIdentifier}
          onPress={() => onPressPaymentOption(index)}
        />
      ))}
    </ScrollView>
  );
};

FeesScrollView.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

FeesScrollView.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default FeesScrollView;
