import React, { useState, useEffect } from "react";
import {
  allowedOrientationsForScreen,
  releaseOrientationsForScreen,
  ORIENTATIONS,
} from "@applicaster/zapp-react-native-utils/appUtils/orientationHelper";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

import R from "ramda";
import JWPlayer from "react-native-jw-media-player-applicaster";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  subContainer: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: "black",
    alignItems: "center",
  },

  playerContainer: {
    height: 300,
    width: width - 40,
    backgroundColor: "white",
  },
  warningText: {
    color: "red",
    fontWeight: "700",
    position: "absolute",
    alignSelf: "center",
    top: 20,
  },
  player: {
    flex: 1,
  },
});

// Player mediaId: "X8hnQSj3"
// Entry  videoId: "3IAGTDeS"
//content.jwplatform.com/players/3IAGTDeS-XeVTBbkG
// https://content.jwplatform.com/videos/IfLGdOMF-dZH6UPjW.mp4
const VideoPlayer = (props) => {
  const navigator = useNavigation();

  // const [isControlsVisible, setIsControlsVisible] = useState(true);
  useEffect(() => {
    console.log("Mount");
    allowedOrientationsForScreen(ORIENTATIONS.landscapeSensor);
  }, []);

  useEffect(
    () => () => {
      console.log("UN-Mount");
      releaseOrientationsForScreen();
    },
    []
  );

  const {
    source: { uri, entry },
    playableItem,
    controls: customControls,
  } = props;
  console.log({ width, height, uri, entry, playableItem });
  const playListItem = () => {
    const { title = null, summary = null } = playableItem;

    const image = R.compose(
      R.prop("src"),
      R.find(R.propEq("key", "image_base")),
      R.prop("media_item"),
      R.ifElse(Array.isArray, R.head, R.always(null)),
      R.prop("media_group")
    )(playableItem);

    const retVal = {
      title,
      mediaId: advertismentMediaId(playableItem),
      image,
      desc: summary,
      time: 0,
      file: videoStreamFromPlayableItem(playableItem),
      autostart: true,
      controls: customControls,
      repeat: false,
      displayDescription: true,
      displayTitle: true,
    };

    return retVal;
  };

  const advertismentMediaId = (playableItem) => {
    console.log("advertismentMediaId", { playableItem });
    const {
      extensions: { jwplayer_content_id },
      id: entryId,
    } = playableItem;
    return jwplayer_content_id || entryId || "-1";
  };

  const videoStreamFromPlayableItem = (playableItem) => {
    console.log("videoStreamFromPlayableItem", { playableItem });
    const {
      extensions: { jwplayer_content_id },
    } = playableItem;

    const url = R.isEmpty(uri) ? null : uri;

    console.log({
      url,
      jwplayer_content_id,
      playableItem,
    });

    if (jwplayer_content_id) {
      return `https://content.jwplatform.com/videos/${jwplayer_content_id}`;
    } else if (url) {
      return url;
    }
    return null;
  };

  const onPlay = (e) => {
    props.onPlaybackRateChange({ playbackRate: 1 });
  };

  const onPause = (e) => {
    props.onPlaybackRateChange({ playbackRate: 0 });
  };

  const onPlayerError = (error) => {
    const { onError } = props;
    props.onError(error);
    console.log("onPlayerError was called with error: ", error);
  };

  const onSetupPlayerError = (error) => {
    const { onError } = props;
    props.onError(error);
    console.log("onSetupPlayerError was called with error: ", error);
  };

  const onTime = (e) => {
    const {
      nativeEvent: { position, duration },
    } = e;
    // eslint-disable-line
    if (position === 0) {
      props.onLoad({ duration });
    } else {
      props.onProgress({ currentTime: position });
    }
  };

  console.log("Props", { props: props, width, height });
  const { onEnd, onFullscreenPlayerDidDismiss } = props;
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <JWPlayer
        style={{ flex: 1 }}
        playlistItem={playListItem()}
        onPlay={onPlay}
        onPause={onPause}
        onSetupPlayerError={onSetupPlayerError}
        onPlayerError={onPlayerError}
        onTime={onTime}
        onComplete={onEnd}
        onClose={onFullscreenPlayerDidDismiss}
        nativeFullScreen={false}
        fullScreenOnLandscape={false}
        landscapeOnFullScreen={false}
        playerStyle={"test"}
      />
    </View>
  );
};

export default VideoPlayer;
