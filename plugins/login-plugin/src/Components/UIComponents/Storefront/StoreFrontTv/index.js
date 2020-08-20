import React from "react";
import { StyleSheet, View } from "react-native";
import SubscriptionTitle from "./SubscriptionTitle";
import SubscriptionDescription from "./SubscriptionDescription";
import EventDateTitle from "./EventDateTitle";
import PolicyAgreementTitle from "./PolicyAgreementTitle";
import FeesScrollView from "./FeesScrollView";
import ClientLogo from "../../ClientLogo";
import Button from "../../Buttons/FocusableButton";
import { mapKeyToStyle } from "../../../../Utils/Customization";

import PropTypes from "prop-types";
import { identity } from "ramda";

const StoreFrontTv = (props) => {
  const { completeAssetFlow, screenStyles, onPressRestore } = props;

  const {
    storefront_screen_background_color: screenBackground = null,
    client_logo: logoUrl = "",
    restore_purchase_action_button_text,
    restore_purchase_action_button_background_color,
    restore_purchase_active_action_button_background_color,
    subscriber_agreement_and_privacy_policy_text,
    subscriber_agreement_and_privacy_policy_text_active_color,
  } = screenStyles;

  const styles = React.useMemo(() =>
    StyleSheet.create({
      container: {
        flex: 1,
        width: "100%",
        alignContent: "center",
        backgroundColor: screenBackground,
      },
      contentWrapper: {
        marginTop: 150,
        marginLeft: 182,
        marginRight: 182,
      },
      clientLogoView: {
        position: "absolute",
        top: 58,
        left: 58,
      },
      restoreButtonWrapperView: {
        height: 88,
        width: 556,
        bottom: 140,
        position: "absolute",
        alignSelf: "center",
      },
      subscriberAgreementWrapperView: {
        height: 88,
        width: 556,
        bottom: 60,
        position: "absolute",
        alignSelf: "center",
      },
      subscriberAgreementButton: {
        backgroundColor: "transparent",
      },
      subscriberAgreementButtonActive: {
        backgroundColor: "transparent",
      },
      subscriberAgreementText: { textDecorationLine: "underline" },
    })
  );
  const restoreButtonStyles = React.useMemo(
    () => mapKeyToStyle("restore_purchase_action_button_text", screenStyles),
    [screenStyles]
  );
  const restoreButtonStyle = {
    backgroundColor: restore_purchase_action_button_background_color,
  };
  const restoreButtonActiveStyle = {
    backgroundColor: restore_purchase_active_action_button_background_color,
  };

  const subscriberAgreementStyles = React.useMemo(
    () =>
      mapKeyToStyle(
        "subscriber_agreement_and_privacy_policy_text",
        screenStyles
      ),
    [screenStyles]
  );

  function onPresentSubscriberAgreement() {}

  return (
    <View style={styles.container}>
      <View style={styles.clientLogoView}>
        <ClientLogo imageSrc={logoUrl} />
      </View>
      <View style={styles.contentWrapper}>
        <SubscriptionTitle {...props} />
        <EventDateTitle {...props} />
        <SubscriptionDescription {...props} />
        <PolicyAgreementTitle {...props} />
      </View>
      <FeesScrollView {...props} />
      <View style={styles.restoreButtonWrapperView}>
        <Button
          textStyle={restoreButtonStyles}
          containerStyle={restoreButtonStyle}
          containerStyleActive={restoreButtonActiveStyle}
          label={restore_purchase_action_button_text}
          onPress={onPressRestore}
        />
      </View>
      <View style={styles.subscriberAgreementWrapperView}>
        <Button
          textStyle={[
            styles.subscriberAgreementText,
            subscriberAgreementStyles,
          ]}
          textStyleActive={[
            subscriberAgreementStyles,
            styles.subscriberAgreementText,
            {
              color: subscriber_agreement_and_privacy_policy_text_active_color,
            },
          ]}
          containerStyle={styles.subscriberAgreementButton}
          containerStyleActive={styles.subscriberAgreementButtonActive}
          label={subscriber_agreement_and_privacy_policy_text}
          onPress={onPresentSubscriberAgreement}
        />
      </View>
    </View>
  );
};

export default StoreFrontTv;
