import React from "react";
import { View } from "react-native";
import { playListItem } from "../../Utils";
import JWPlayer from "react-native-jw-media-player-applicaster";
export default class VideoPlayer extends React.Component {
  onPlay = () => {
    const { onPlaybackRateChange } = this.props;
    onPlaybackRateChange && onPlaybackRateChange({ playbackRate: 1 });
  };

  onPause = () => {
    const { onPlaybackRateChange } = this.props;
    onPlaybackRateChange && onPlaybackRateChange({ playbackRate: 0 });
  };

  onError = ({ nativeEvent }) => {
    const { onError } = this.props;
    onError &&
      onError({ error: { localizedDescription: nativeEvent?.message } });
  };

  onTime = ({ nativeEvent }) => {
    const { onLoad, onProgress } = this.props;
    const { position, duration } = nativeEvent;

    if (position === 0) {
      onLoad({ duration });
    } else {
      onProgress({ currentTime: position });
    }
  };

  render() {
    const { onEnd, onFullscreenPlayerDidDismiss } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <JWPlayer
          ref={this.assignPlayerRef}
          style={{ flex: 1 }}
          playlistItem={playListItem(this.props)}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onPlayerReady={this.onPlayerReady}
          onSetupPlayerError={this.onError}
          onPlayerError={this.onError}
          onTime={this.onTime}
          onBuffer={this.onBuffer}
          onComplete={onEnd}
          onClose={onFullscreenPlayerDidDismiss}
          nativeFullScreen={false}
          fullScreenOnLandscape={false}
          landscapeOnFullScreen={false}
          // playerStyle={"test"}
        />
      </View>
    );
  }
}
