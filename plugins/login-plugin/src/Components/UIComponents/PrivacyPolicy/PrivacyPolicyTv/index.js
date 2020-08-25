import React, { useRef, useMemo, useState } from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import * as R from "ramda";
import PrivacyTitle from "./PrivacyTitle";
import PrivacyDescription from "./PrivacyDescription";
import { useBackHandler } from "../../../../Utils/hooks";
import { TVEventHandlerComponent } from "@applicaster/zapp-react-native-tvos-ui-components/Components/TVEventHandlerComponent";

const PrivacyPolicyTv = (props) => {
  const { screenStyles, onHandleBack } = props;
  const [y, setY] = useState(0);
  const [yOffset, setyOffset] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState();
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState();
  const scrollViewRef = useRef(null);

  const {
    privacy_screen_background_color,
    privacy_text_area_background_color,
  } = screenStyles;

  useBackHandler(hardwareBack);

  const hardwareBack = () => {
    onHandleBack();
  };

  const tvosRemoteHandler = (component, event) => {
    const { eventType } = event;
    if (eventType === "swipeDown" || eventType === "down") {
      console.log({
        newOffset: y + yOffset,
        maxLimit: y + yOffset + scrollViewHeight > scrollViewContentHeight,
      });
      if (y + yOffset + scrollViewHeight > scrollViewContentHeight) {
        setY(scrollViewContentHeight - scrollViewHeight);
        scrollViewRef.current.scrollTo({ y: scrollViewContentHeight });
      } else {
        scrollViewRef.current.scrollTo({ y: y + yOffset });
        setY(y + yOffset);
      }
    } else if (eventType === "swipeUp" || eventType === "up") {
      if (y - yOffset < 0) {
        setY(0);
        scrollViewRef.current.scrollTo({ y: 0 });
      } else {
        scrollViewRef.current.scrollTo({ y: y - yOffset });
        setY(y - yOffset);
      }
    }
  };

  const styles = useMemo(() => ({
    container: {
      flex: 1,
      width: "100%",
      alignContent: "center",
      backgroundColor: privacy_screen_background_color,
    },
    scrollViewWrapper: {
      flex: 1,
      marginTop: 75,
      marginLeft: 270,
      marginRight: 270,
      backgroundColor: privacy_text_area_background_color,
    },
    scrollView: {
      marginTop: 66,
    },
  }));

  const onLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent?.layout;
    setScrollViewHeight(height);
    const quaterOfTheScrollViewHeight = (height / 100) * 25;
    setyOffset(quaterOfTheScrollViewHeight);
  };

  return (
    <TVEventHandlerComponent tvEventHandler={tvosRemoteHandler}>
      <View style={styles.container}>
        <View style={styles.scrollViewWrapper}>
          <PrivacyTitle {...props} />

          <ScrollView
            style={styles.scrollView}
            persistentScrollbar={true}
            contentInset={{ top: 0, left: 0, bottom: 100, right: 0 }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              setScrollViewContentHeight(contentHeight + 100);
            }}
            onLayout={onLayout}
            ref={scrollViewRef}
          >
            <PrivacyDescription {...props} />
          </ScrollView>
        </View>
      </View>
    </TVEventHandlerComponent>
  );
};

PrivacyPolicyTv.propTypes = {
  screenStyles: PropTypes.object,
  onHandleBack: PropTypes.func,
};

PrivacyPolicyTv.defaultProps = {
  screenStyles: {},
  onHandleBack: R.identity,
};

export default PrivacyPolicyTv;
