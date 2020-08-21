import React from "react";
import { StyleSheet, View } from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";
import { mapKeyToStyle } from "../../../../../../Utils/Customization";
import FeeTitle from "./FeeTitle";
import FeeDescription from "./FeeDescription";
import FeeType from "./FeeType";
import FeePrice from "./FeePrice";

import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    width: 500,
    height: 260,
    backgroundColor: "gray",
    marginLeft: 11,
    marginRight: 11,
    overflow: "hidden",
  },
  contentView: {
    width: 500,
    height: 200,
  },
  actionView: {
    width: 500,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  borderView: {
    position: "absolute",
    width: 500,
    height: 260,
    backgroundColor: "transparent",
    zIndex: 1000,
  },
});

const FeeCard = (props) => {
  const {
    screenStyles,
    payload: { extensions = {} },
    onPress,
    identifier,
    groupId,
  } = props;
  const {
    payment_option_background_color,
    payment_option_active_background_color,
    payment_option_corner_radius,
    payment_option_active_border_color,
    payment_option_active_border_width,
    payment_option_default_action_background_color,
    payment_option_active_default_action_background_color,
  } = screenStyles;

  const userDefinedStyles = React.useMemo(
    () => ({
      backgroundColor: payment_option_background_color,
      borderRadius: Number(payment_option_corner_radius),
      borderWidth: 0,
      borderColor: "transparent",
    }),
    []
  );

  const userDefinedStylesActive = React.useMemo(
    () => ({
      backgroundColor: payment_option_active_background_color,
      borderWidth: 0,
      borderColor: payment_option_active_border_color,
    }),
    []
  );

  const activeViewUserDefinedStyles = React.useMemo(
    () => ({
      backgroundColor: payment_option_default_action_background_color,
    }),
    []
  );

  const activeViewUserDefinedStylesActive = React.useMemo(
    () => ({
      backgroundColor: payment_option_active_default_action_background_color,
    }),
    []
  );
  return (
    <Focusable
      id={`${groupId}-${identifier}`}
      groupId={groupId}
      onPress={onPress}
    >
      {(focused) => (
        <View
          style={[
            styles.container,
            userDefinedStyles,
            focused && userDefinedStylesActive,
          ]}
        >
          <View
            style={[
              styles.borderView,
              {
                borderRadius: Number(payment_option_corner_radius),
                borderColor: focused
                  ? payment_option_active_default_action_background_color
                  : "transparent",
                borderWidth: focused
                  ? Number(payment_option_active_border_width)
                  : 0,
              },
            ]}
          />
          <View style={styles.contentView}>
            <FeeTitle {...props} />
            <FeeDescription {...props} />
            <FeePrice {...props} />
          </View>
          <View
            style={[
              styles.actionView,
              activeViewUserDefinedStyles,
              focused && activeViewUserDefinedStylesActive,
            ]}
          >
            <FeeType {...props} />
          </View>
        </View>
      )}
    </Focusable>
  );
};

FeeCard.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
};

FeeCard.defaultProps = {
  payload: {},
  screenStyles: {},
};

export default FeeCard;
