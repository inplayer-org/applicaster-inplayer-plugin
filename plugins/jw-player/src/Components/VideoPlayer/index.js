import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";

import R from "ramda";
import JWPlayer from "react-native-jw-media-player";

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
  const {
    source: { uri, entry },
    playableItem,
    controls,
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
      controls,
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

  const onBeforePlay = () => {
    // eslint-disable-line
    // console.log('onBeforePlay was called');
  };

  const onPlay = () => {
    // eslint-disable-line
    // console.log('onPlay was called');
  };

  const onPlayerError = () => {
    const { onError } = props;
    // eslint-disable-line
    // onError(error);
    // eslint-disable-line
    console.log("onPlayerError was called with error: ", error);
  };

  const onSetupPlayerError = (error) => {
    const { onError } = props;
    // eslint-disable-line
    // onError(error);
    console.log("onSetupPlayerError was called with error: ", error);
  };

  const onBuffer = (e) => {
    // eslint-disable-line
    // console.log('onBuffer was called');
  };

  const onTime = ({ position, duration }) => {
    // eslint-disable-line
    // console.log('onTime was called with: ', position, duration);
  };
  console.log("Render!!!");
  return (
    // <SafeAreaView style={styles.container}>
    <View style={{ width, height, backgroundColor: "red" }}>
      <Text
        style={styles.warningText}
      >{`Your configuration of JWPlayer is wrong.\n\nDid you forget to add your JW key to your ${
        Platform.OS === "ios" ? "plist" : "manifest"
      }?\nDid you add a playlistItem with at least a file paramter?`}</Text>
      <JWPlayer
        style={{ flex: 1 }}
        playlistItem={playListItem()}
        onBeforePlay={onBeforePlay}
        onPlay={onPlay}
        onSetupPlayerError={onSetupPlayerError}
        onPlayerError={onPlayerError}
        onBuffer={onBuffer}
        onTime={onTime}
        nativeFullScreen={true}
        fullScreenOnLandscape={true}
        landscapeOnFullScreen={true}
      />
    </View>
    // </SafeAreaView>
  );
};

export default VideoPlayer;
