import * as React from "react";
import { View, Platform, Dimensions } from "react-native";
import JWPlayer from "react-native-jw-media-player-applicaster";
import { jwLicenceKey, playListItem } from "../../Utils";
import { JWPlayerAndroidLicenceModule } from "../../NativeModule/index";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { licenceKeyProvided: false };
  }

  componentDidUpdate(newProps) {
    console.log({ newProps, foo: this });
  }
  componentDidMount() {
    const { pluginConfiguration } = this.props;
    console.log({ pluginConfiguration });

    const licenceKey = jwLicenceKey(pluginConfiguration);
    JWPlayerAndroidLicenceModule.setLicenseKey(licenceKey).then(() => {
      this.setState({ licenceKeyProvided: true });
    });
  }

  onPlay = () => {
    const { onPlay } = this.props;
    onPlay({ type: "play" });
  };

  onPause = () => {
    const { onPause } = this.props;
    onPause({ type: "pause" });
  };

  onPlayerReady = () => {
    const { onLoadedData } = this.props;
    onLoadedData && onLoadedData({ type: "loadeddata" });
  };

  onError = ({ nativeEvent }) => {
    const { onError } = this.props;
    onError &&
      onError({ type: "error", target: { error: nativeEvent?.message } });
  };

  onBuffer = () => {
    const { updatePlayerState } = this.props;
    updatePlayerState({ type: "loadstart" });
  };

  onTime = ({ nativeEvent }) => {
    const { onProgress } = this.props;
    const { position, duration } = nativeEvent;

    onProgress && onProgress({ type: "progress" }, { position, duration });
  };
  assignPlayerRef(ref) {
    player = ref;
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const { onEnded, autoplay } = this.props;
    const { licenceKeyProvided } = this.state;

    return (
      <View
        style={{
          height: Math.min(width, height),
          paddingBottom: Platform.OS === "android" ? 23 : 0,
        }}
      >
        {licenceKeyProvided && (
          <JWPlayer
            ref={this.assignPlayerRef}
            style={{ flex: 1 }}
            playlistItem={playListItem(this.props)}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onPlayerReady={this.onPlayerReady}
            onSetupPlayerError={this.onError}
            onPlayerError={this.onError}
            onBuffer={this.onBuffer}
            onTime={this.onTime}
            onComplete={onEnded}
            nativeFullScreen={false}
            fullScreenOnLandscape={false}
            landscapeOnFullScreen={false}
            autostart={autoplay}
          />
        )}
      </View>
    );
  }
}
