import React from "react";
// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
// } from "react-native";

import { StyleSheet, ScrollView } from "react-native";
import { mapKeyToStyle } from "../../../../Utils/Customization";
import FeeCard from "./FeeCard";
FeesScrollView.propTypes = {
  screenStyles: {},
  payload: { extensions: {} },
};

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

  const renderItem = ({ item }) => <Item title={item.title} />;

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

export default FeesScrollView;
