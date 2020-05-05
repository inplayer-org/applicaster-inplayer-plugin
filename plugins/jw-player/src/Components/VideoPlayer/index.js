import React, { useEffect } from "react";
import {
  allowedOrientationsForScreen,
  releaseOrientationsForScreen,
  ORIENTATIONS,
} from "@applicaster/zapp-react-native-utils/appUtils/orientationHelper";
import { View, Dimensions, Platform, SafeAreaView } from "react-native";

import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";

import R from "ramda";
import JWPlayer from "react-native-jw-media-player-applicaster";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";

const { width, height } = Dimensions.get("window");

// Player mediaId: "X8hnQSj3"
// Entry  videoId: "3IAGTDeS"
//content.jwplatform.com/players/3IAGTDeS-XeVTBbkG
// https://content.jwplatform.com/v""ideos/IfLGdOMF-dZH6UPjW.mp4
const VideoPlayer = (props) => {
  console.log("JWPlayer");
  const navigator = useNavigation();
  const { height: screenHeight } = useDimensions("window", true);

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
    //uri,
    const retVal = {
      title,
      mediaId: advertismentMediaId(playableItem),
      image,
      desc: summary,
      time: 0,
      file: "https://cdn.jwplayer.com/manifests/3IAGTDeS.m3u8",
      autostart: true,
      controls: customControls,
      repeat: false,
      displayDescription: true,
      displayTitle: true,
    };
    console.log("Playlist Item", { retVal });
    return retVal;
  };

  const advertismentMediaId = (playableItem) => {
    console.log("advertismentMediaId", { playableItem });
    const { id: entryId } = playableItem;
    return entryId || "-1";
  };

  const onPlay = (e) => {
    console.log("onPlay", { e });
    // props.onPlaybackRateChange({ playbackRate: 1 });
  };

  const onPause = (e) => {
    console.log("onPause", { e });
    // props.onPlaybackRateChange({ playbackRate: 0 });
  };

  const onPlayerError = (error) => {
    const { onError } = props;
    console.log(
      "onPlayerError was called with error: ",
      error,
      error.message,
      error.nativeEvent
    );

    props.onError(error);
  };

  const onSetupPlayerError = (error) => {
    const { onError } = props;
    console.log("onSetupPlayerError was called with error: ", { error });

    props.onError(error);
  };

  const onTime = (e) => {
    // console.log("onTime", { e });
    const {
      nativeEvent: { position, duration },
    } = e;
    // eslint-disable-line
    if (position === 0) {
      props.onLoad({ duration });
    } else {
      // props.onProgress({ currentTime: position });
    }
  };

  const onLayout = ({ nativeEvent }) => {
    console.log({ nativeEvent });
  };
  console.log("VIDEO_PLAYER_LAYER", {
    props: props,
    width,
    height,
    ref: props.forwardedRef,
    mee: this,
    plugins: this.__plugin_configuration,
  });
  const { onEnd, onFullscreenPlayerDidDismiss } = props;
  return (
    <View
      onLayout={onLayout}
      style={{
        // flex: 0, // CHeck if iOS needed it
        height: screenHeight,
        paddingBottom: Platform.OS === "android" ? 23 : 0,
      }}
    >
      <JWPlayer
        // configuration={props.conn}
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
        // playerStyle={"test"}
      />
    </View>
  );
};

export default VideoPlayer;
