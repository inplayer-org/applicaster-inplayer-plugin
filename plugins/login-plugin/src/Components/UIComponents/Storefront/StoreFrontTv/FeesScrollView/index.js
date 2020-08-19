import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import FeeCard from "./FeeCard";
import PropTypes from "prop-types";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FeesScrollView = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
  } = props;

  const renderItem = React.useCallback(
    ({ item }) => <Item title={item.title} />,
    [item.title]
  );

  return (
    <ScrollView style={{ flex: 1 }}>
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
