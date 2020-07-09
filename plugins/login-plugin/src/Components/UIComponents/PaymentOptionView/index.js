import React from "react";
import { View, Text } from "react-native";
import { mapKeyToStyle } from "../../../Utils/Customization";
import {
  paymentOptionStyleKeys,
  styles,
  getBoxStyles,
  getButtonStyle,
} from "./StyleUtils";
import ActionButton from "../Buttons/ActionButton.js";

const paymentActions = {
  subscribe: "Subscribe",
  buy: "Buy",
};

export default function PaymentOptionView({
  screenStyles,
  paymentOptionItem,
  onPress,
}) {
  const {
    payment_option_button_corner_radius: radius = 50,
    payment_option_button_background: backgroundColor = "",
  } = screenStyles;

  const { title, description, price, productType } = paymentOptionItem;

  const [
    titleStyle,
    descriptionStyle,
    labelStyle,
  ] = paymentOptionStyleKeys.map((key) => mapKeyToStyle(key, screenStyles));

  const actionForLabel =
    productType === "subscription"
      ? paymentActions.subscribe
      : paymentActions.buy;

  const buttonStyle = getButtonStyle(radius, backgroundColor);

  const label = `${actionForLabel} for ${price}`.toUpperCase();

  return (
    <View style={getBoxStyles(screenStyles)}>
      <Text style={titleStyle} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text
        style={[descriptionStyle, styles.description]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
      <ActionButton
        labelStyle={labelStyle}
        buttonStyle={buttonStyle}
        title={label}
        onPress={onPress}
      />
    </View>
  );
}
