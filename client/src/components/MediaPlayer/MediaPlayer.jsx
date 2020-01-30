import "./MediaPlayer.scss";

import React, { Component } from "react";

class MediaPlayer extends Component {
  render() {
    return (
      <div id="media-player">
        <audio controls crossOrigin="anonymous">
          <source
            src="https://tsn-music.s3.us-east-2.amazonaws.com/Yulunga.mp3"
            type="audio/mp3"
          />
        </audio>
      </div>
    );
  }
}

export default MediaPlayer;
