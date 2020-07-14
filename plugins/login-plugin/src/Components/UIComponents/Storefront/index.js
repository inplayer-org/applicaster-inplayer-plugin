import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PaymentOptionView from "../PaymentOptionView";
import { container } from "../../Styles";
import { mapKeyToStyle, withEndSpace } from "../../../Utils/Customization";

const storefrontStyleKeys = [
  "payment_screen_title",
  "restore_purchases_text",
  "restore_purchases_link",
];

const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;
const isMobile = !Platform.isTV;
const isPad = isMobile && aspectRatio < 1.6;

export default function Storefront(props) {
  const {
    screenStyles,
    dataSource,
    onPressPaymentOption,
    onPressRestore,
  } = props;

  const {
    payment_screen_title_text: paymentTitle,
    restore_purchases_text: restoreText,
    restore_purchases_link: restoreLink,
  } = screenStyles;

  const [
    paymentTitleStyle,
    restoreTextStyle,
    restoreLinkStyle,
  ] = storefrontStyleKeys.map((key) => mapKeyToStyle(key, screenStyles));

  return (
    <View style={[styles.container, { paddingHorizontal: 25 }]}>
      <Text style={paymentTitleStyle} numberOfLines={1} ellipsizeMode="tail">
        {paymentTitle}
      </Text>
      <View style={styles.restoreContainer}>
        <Text
          style={[restoreTextStyle, { textAlign: "center" }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {withEndSpace(restoreText)}
          <Text style={restoreLinkStyle} onPress={onPressRestore}>
            {restoreLink}
          </Text>
        </Text>
      </View>
      <View
        style={{
          width: isPad ? 400 : "100%",
          height: isPad ? 650 : 320,
        }}
      >
        <ScrollView>
          {dataSource.map((item, index) => (
            <PaymentOptionView
              screenStyles={screenStyles}
              paymentOptionItem={item}
              key={item.productIdentifier}
              onPress={() => onPressPaymentOption(index)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container,
  restoreContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
});
