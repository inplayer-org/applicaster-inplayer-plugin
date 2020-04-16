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
import { parseJsonIfNeeded } from "@applicaster/zapp-react-native-utils/functionUtils";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: "black",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    margin: 40,
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

const VideoPlayer = (props) => {
  const {
    source: { uri, entry },
    playableItem,
    controls,
  } = props;
  console.log({ uri, entry, playableItem });

  const playListItem = () => {
    const { title = null, summary = null } = playableItem;
    const url = R.isEmpty(uri) ? null : uri;

    const image = R.compose(
      R.prop("src"),
      R.find(R.propEq("key", "image_base")),
      R.prop("media_item"),
      R.ifElse(Array.isArray, R.head, R.always(null)),
      R.prop("media_group")
    )(playableItem);

    const mediaId = R.compose(
      R.prop("player_id"),
      parseJsonIfNeeded,
      R.path(["extensions", "inPlayerData", "item", "content"])
    )(playableItem);

    // const { player_id, video_id } = jwPlayerData;

    const retVal = {
      title,
      mediaId: R.isNil(mediaId) ? "-1" : mediaId,
      image,
      desc: summary,
      time: 0,
      file: url,
      autostart: true,
      controls,
      repeat: false,
      displayDescription: true,
      displayTitle: true,
    };
    console.log({ url, image, controls, title, summary, mediaId, retVal });

    return retVal;
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
    onError(error);
    // eslint-disable-line
    console.log("onPlayerError was called with error: ", error);
  };

  const onSetupPlayerError = (error) => {
    const { onError } = props;
    // eslint-disable-line
    onError(error);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Welcome to react-native-jw-media-player</Text>
        <View style={styles.playerContainer}>
          <Text
            style={styles.warningText}
          >{`Your configuration of JWPlayer is wrong.\n\nDid you forget to add your JW key to your ${
            Platform.OS === "ios" ? "plist" : "manifest"
          }?\nDid you add a playlistItem with at least a file paramter?`}</Text>
          <JWPlayer
            style={styles.player}
            playlistItem={playListItem()}
            onBeforePlay={onBeforePlay}
            onPlay={onPlay}
            onSetupPlayerError={onSetupPlayerError}
            onPlayerError={onPlayerError}
            onBuffer={onBuffer}
            onTime={onTime}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default VideoPlayer;
