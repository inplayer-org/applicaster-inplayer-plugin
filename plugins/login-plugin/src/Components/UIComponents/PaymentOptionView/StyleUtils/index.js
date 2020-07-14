import { StyleSheet } from "react-native";

const paymentOptionStyleKeys = [
  "payment_option_title",
  "payment_option_description",
  "payment_option_button",
];

function getBoxStyles(screenStyles) {
  const borderRadius = Number(screenStyles?.payment_option_corner_radius);
  const backgroundColor = screenStyles?.payment_option_background;

  return {
    backgroundColor,
    minHeight: 170,
    width: "100%",
    maxWidth: 370,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius,
    alignSelf: "center",
  };
}

function getButtonStyle(radius, backgroundColor) {
  return {
    backgroundColor,
    borderRadius: Number(radius),
    width: 230,
    height: 40,
  };
}

const styles = StyleSheet.create({
  description: {
    marginVertical: 20,
    textAlign: "center",
  },
});

export { paymentOptionStyleKeys, styles, getBoxStyles, getButtonStyle };
