import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { useFocusRefs } from "@applicaster/zapp-react-native-utils/focusManager";

import { useInitialFocusAndroidOnly } from "../../../../../Utils/Hooks";
import FeeCard from "./FeeCard";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    top: 500,
    left: 177,
    right: 177,
    height: 260,
    position: "absolute",
  },
});

const FeesScrollView = (props) => {
  const { screenStyles, dataSource, onPressPaymentOption } = props;
  const listRefs = useFocusRefs();

  useInitialFocusAndroidOnly(props.focused, listRefs[0], {
    refsList: listRefs,
    withStateMemory: true,
  });

  const groupId = "fee-scroll-view";

  return (
    <FocusableGroup
      style={styles.container}
      id={groupId}
      shouldUsePreferredFocus
      isParallaxDisabled
    >
      <ScrollView horizontal={true}>
        {dataSource.map((item, index) => (
          <FeeCard
            ref={listRefs[index]}
            nextFocusUp={listRefs[index - 1] || props.nextFocusUp}
            nextFocusDown={listRefs?.[index + 1] || props.nextFocusDown}
            groupId={groupId}
            screenStyles={screenStyles}
            paymentOptionItem={item}
            key={item.productIdentifier}
            identifier={item.productIdentifier}
            onPress={() => onPressPaymentOption(index)}
          />
        ))}
      </ScrollView>
    </FocusableGroup>
  );
};

FeesScrollView.propTypes = {
  screenStyles: PropTypes.object,
  payload: PropTypes.object,
  dataSource: PropTypes.array,
  onPressPaymentOption: PropTypes.func,
  nextFocusUp: PropTypes.object,
  nextFocusDown: PropTypes.object,
  focused: PropTypes.bool,
};

FeesScrollView.defaultProps = {
  payload: {},
  screenStyles: {},
  dataSource: [],
  onPressPaymentOption: () => {},
};

export default FeesScrollView;
