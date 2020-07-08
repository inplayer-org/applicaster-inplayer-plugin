import React from "react";
import { View, Text } from "react-native";
import { mapKeyToStyle } from "../../../Utils/Customization";
import ActionButton from "../ActionButton";

function getBoxStyles(screenStyles) {
  const borderRadius = Number(screenStyles.payment_option_corner_radius);
  const backgroundColor = screenStyles.payment_option_background;

  return {
    backgroundColor,
    minHeight: 170,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    borderRadius,
    alignSelf: "center",
  };
}

export default function PaymentOptionView({
  screenStyles,
  paymentOptionItem,
  onPress,
}) {
  const styleKeys = [
    "payment_option_title",
    "payment_option_description",
    "payment_option_button",
  ];

  const actions = {
    subscribe: "Subscribe",
    buy: "Buy",
  };

  const { title, description, price, productType } = paymentOptionItem;
  const [titleStyle, descriptionStyle, labelStyle] = styleKeys.map((key) =>
    mapKeyToStyle(key, screenStyles)
  );

  const buttonRadius = Number(screenStyles.payment_option_button_corner_radius);
  const actionForLabel =
    productType === "subscription" ? actions.subscribe : actions.buy;

  const buttonStyle = {
    backgroundColor: screenStyles.payment_option_button_background,
    borderRadius: buttonRadius,
  };

  return (
    <View style={getBoxStyles(screenStyles)}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={descriptionStyle}>{description}</Text>
      <ActionButton
        labelStyle={labelStyle}
        buttonStyle={buttonStyle}
        title={`${actionForLabel} for ${price}`}
        onPress={onPress}
      />
    </View>
  );
}
