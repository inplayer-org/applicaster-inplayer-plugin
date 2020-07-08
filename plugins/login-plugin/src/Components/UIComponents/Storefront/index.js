import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PaymentOptionView from "../PaymentOptionView";
import { container } from "../../Styles";
import { mapKeyToStyle, withEndSpace } from "../../../Utils/Customization";
import OpenURLButton from "../OpenUrlButton";

const storefrontStyleKeys = [
  "payment_screen_title",
  "restore_purchases_text",
  "restore_purchases_link",
  "terms_of_use_instructions",
  "terms_of_use_link",
];

const termsOfUseUrl = "https://google.com";

export default function Storefront(props) {
  const { screenStyles, dataSource, onPressPaymentOption } = props;

  const {
    payment_screen_title_text: paymentTitle,
    restore_purchases_text: restoreText,
    restore_purchases_link: restoreLink,
    terms_of_use_instructions_text: termsOfUseText,
    terms_of_use_link_text: termsOfUseLink,
  } = screenStyles;

  const [
    paymentTitleStyle,
    restoreTextStyle,
    restoreLinkStyle,
    termsOfUseStyle,
    termsOfUseLinkStyle,
  ] = storefrontStyleKeys.map((key) => mapKeyToStyle(key, screenStyles));

  return (
    <View style={[styles.container, { paddingHorizontal: 30 }]}>
      <Text style={paymentTitleStyle}>{paymentTitle}</Text>
      <View style={styles.restoreContainer}>
        <Text style={restoreTextStyle}>
          {withEndSpace(restoreText)}
          <Text style={restoreLinkStyle}>{restoreLink}</Text>
        </Text>
      </View>
      <ScrollView>
        {dataSource.map((item) => (
          <PaymentOptionView
            screenStyles={screenStyles}
            paymentOptionItem={item}
            key={item.productIdentifier}
            onPress={onPressPaymentOption}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={[termsOfUseStyle, { textAlign: "center" }]}>
          {withEndSpace(termsOfUseText)}
          <OpenURLButton linkStyle={termsOfUseLinkStyle} url={termsOfUseUrl}>
            {termsOfUseLink}
          </OpenURLButton>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container,
  restoreContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    height: 80,
    paddingVertical: 10,
  },
});
