import React from "react";
import { StyleSheet, View } from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";
import Label from "./Label";
import { mapKeyToStyle } from "../../../../Utils/Customization";

FeeCard.propTypes = {
  screenStyles: {},
  payload: { extensions: {} },
};

const FeeCard = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
    onPress,
    label,
    groupId,
  } = props;

  const titleStyles = mapKeyToStyle(
    "storefront_payment_option_title_text",
    screenStyles
  );
  const descriptionStyles = mapKeyToStyle(
    "storefront_payment_option_description_text",
    screenStyles
  );
  const priceStyles = mapKeyToStyle(
    "storefront_payment_option_amount_text",
    screenStyles
  );
  const feeTypeStyles = mapKeyToStyle(
    "storefront_payment_option_action_text",
    screenStyles
  );

  const styles = StyleSheet.create({
    container: {
      width: 500,
      height: 260,
    },
    text: {
      ...fontStyles,
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return (
    <Focusable id={`${groupId}-${label}`} groupId={groupId} onPress={onPress}>
      {(focused) => (
        <View style={[styles.button, focused && styles.buttonActive]}>
          <Label styles={{ text: titleStyles }} title={title} />
          <Label styles={{ text: descriptionStyles }} title={title} />
          <Label styles={{ text: priceStyles }} title={title} />
          <View>
            <Label styles={feeTypeStyles} title={title} />
          </View>
        </View>
      )}
    </Focusable>
  );
};

export default FeeCard;
