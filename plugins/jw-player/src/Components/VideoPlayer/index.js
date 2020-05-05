import React, { useEffect } from "react";
import R from "ramda";
import { View, Platform } from "react-native";
import {
  allowedOrientationsForScreen,
  releaseOrientationsForScreen,
  ORIENTATIONS,
} from "@applicaster/zapp-react-native-utils/appUtils/orientationHelper";
import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import JWPlayer from "react-native-jw-media-player-applicaster";

// export default class VideoPlayer extends Component {

// }
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
  const { onEnd, onFullscreenPlayerDidDismiss, pluginConfiguration } = props;
  return (
    <View
      onLayout={onLayout}
      style={{
        height: screenHeight,
        paddingBottom: Platform.OS === "android" ? 23 : 0,
      }}
    >
      <JWPlayer
        licenceKey={jwLicenceKey(pluginConfiguration)}
        style={{ flex: 1 }}
        playlistItem={playListItem(props)}
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

const jwLicenceKey = (pluginConfiguration) => {
  return pluginConfiguration?.jw_player_android_key;
};

const playListItem = (props) => {
  const {
    source: { uri },
    playableItem,
    controls: customControls,
  } = props;

  const { title = null, summary = null } = playableItem;

  const image = imageFromPlayableItem(playableItem);
  //"https://cdn.jwplayer.com/manifests/3IAGTDeS.m3u8",
  const retVal = {
    title,
    mediaId: advertismentMediaId(playableItem),
    image,
    desc: summary,
    time: 0,
    file: uri,
    autostart: true,
    controls: customControls,
    repeat: false,
    displayDescription: true,
    displayTitle: true,
  };
  console.log("Playlist Item", { retVal });
  return retVal;
};

const imageFromPlayableItem = (playableItem) => {
  return R.compose(
    R.prop("src"),
    R.find(R.propEq("key", "image_base")),
    R.prop("media_item"),
    R.ifElse(Array.isArray, R.head, R.always(null)),
    R.prop("media_group")
  )(playableItem);
};
