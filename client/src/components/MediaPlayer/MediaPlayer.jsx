import "./MediaPlayer.scss";

import React, { Component } from "react";

import ImageLoader from "../ImageLoader/ImageLoader";
import { Link } from "react-router-dom";

class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      play: false,
      repeat: false,
      liked: false
    };
  }

  componentDidMount() {
    this.audio.addEventListener("ended", () => this.trackEnded());

    // document.addEventListener("keydown", event => {
    //   if (event.keyCode == 39) {
    //     this.audio.currentTime += 1;
    //   } else if (event.keyCode == 37) {
    //     this.audio.currentTime -= 1;
    //   } else if (event.keyCode == 32 && this.audio.paused == true) {
    //     event.preventDefault();
    //     this.audio.play();
    //   } else if (event.keyCode == 32 && this.audio.paused == false) {
    //     event.preventDefault();
    //     this.audio.pause();
    //   }
    // });
    //
    // this.audio.addEventListener("wheel", event => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   if (event.originalEvent.wheelDelta > 0) {
    //     this.audio.currentTime += 1;
    //   } else {
    //     this.audio.currentTime -= 1;
    //   }
    // });
  }

  componentWillUnmount() {
    this.audio.removeEventListener("ended", () => this.trackEnded());
  }

  updateProgressBar = () => {
    const currentTime = this.audio.currentTime;
    const duration = this.audio.duration;
    const progress = currentTime / duration;
    const position = this.progressBar.offsetWidth * progress;
    this.setState({ progress }, () => this.positionHandle(position));
  };

  seek = event => {
    if (event.target.id === "progress-bar-handle") return;

    const duration = this.audio.duration;
    const target = event.target || event.srcElement;
    const rect = target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progress = offsetX / this.progressBar.offsetWidth;
    const currentTime = progress * duration;

    this.audio.currentTime = currentTime;
    this.setState({ progress });
  };

  stepForward = () => {
    // TODO; Next track
    this.audio.currentTime = this.audio.duration;
  };

  fastForward = () => {
    this.audio.currentTime += 10;
  };

  fastBack = () => {
    this.audio.currentTime -= 10;
  };

  stepBack = () => {
    // TODO; Zero or previous track
    this.audio.currentTime = 0;
  };

  repeat = () => {
    this.setState(state => {
      return { repeat: !state.repeat };
    });
  };

  like = () => {
    this.setState(state => {
      return { liked: !state.liked };
    });
  };

  trackEnded() {
    this.setState({ play: false }, () => {
      this.audio.currentTime = 0;
    });
  }

  togglePlay = () => {
    const { play } = this.state;
    if (play) {
      this.setState({ play: false }, () => this.audio.pause());
    } else {
      this.setState({ play: true }, () => this.audio.play());
    }
  };

  calculateTimeCode(time) {
    const hour = parseInt(time / 3600) % 24;
    const minute = parseInt(time / 60) % 60;
    const seconds_long = time % 60;
    const seconds = seconds_long.toFixed();

    let timecode = "";
    if (!!hour) timecode += (hour < 10 ? "0" + hour : hour) + ":";
    timecode += (minute < 10 ? "0" + minute : minute) + ":";
    timecode += seconds < 10 ? "0" + seconds : seconds;
    return timecode;
  }

  positionHandle = position => {
    let progressBarWidth = this.progressBar.offsetWidth;
    let center = -6;

    if (position >= 0 && position <= progressBarWidth) {
      this.progressBarHandle.style.marginLeft = position + center + "px";
    }
    if (position < 0) {
      this.progressBarHandle.style.marginLeft = center + "px";
    }
    if (position > progressBarWidth) {
      this.progressBarHandle.style.marginLeft =
        progressBarWidth + center + "px";
    }
  };

  mouseMove = event => {
    event.stopPropagation();

    const duration = this.audio.duration;
    const rect = this.progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progress = offsetX / this.progressBar.offsetWidth;
    const currentTime = progress * duration;

    this.audio.currentTime = currentTime;
    this.setState({ progress }, () => this.positionHandle(offsetX));
  };

  mouseUp = event => {
    event.stopPropagation();
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("mouseup", this.mouseUp);
  };

  mouseDown = event => {
    event.stopPropagation();
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("mouseup", this.mouseUp);
  };

  render() {
    const { play, progress, repeat, liked } = this.state;

    const currentTC = this.calculateTimeCode(this.audio?.currentTime || 0);
    const trackLengthTC = this.calculateTimeCode(this.audio?.duration || 0);

    return (
      <div id="media-player">
        <div className="audio-player">
          <div className="audio-player-controls bp3-button-group bp3-minimal">
            <button
              onClick={this.stepBack}
              id="fast-backward-btn"
              className="bp3-button bp3-icon-step-backward hidden-lt-lg"
            />
            <button
              onClick={this.fastBack}
              id="fast-backward-btn"
              className="bp3-button bp3-icon-fast-backward hidden-lt-lg"
            />
            <button
              onClick={this.togglePlay}
              id="play-btn"
              className={`bp3-button bp3-icon-${play ? "pause" : "play"}`}
            />
            <button
              onClick={this.fastForward}
              id="fast-forward-btn"
              className="bp3-button bp3-icon-fast-forward hidden-lt-lg"
            />
            <button
              onClick={this.stepForward}
              id="fast-forward-btn"
              className="bp3-button bp3-icon-step-forward"
            />
            <div
              onClick={this.repeat}
              id="repeat-btn"
              className={`bp3-icon-repeat ${repeat ? "active-blue" : ""}`}
            />
          </div>
          <div className="track">
            <div className="track-scrubber">
              <div className="track-timecode">{currentTC}</div>
              <div
                id="progress-bar"
                ref={progressBar => (this.progressBar = progressBar)}
                className="bp3-progress-bar bp3-intent-primary bp3-no-stripes hidden-lt-sm"
                onClick={this.seek}
              >
                <div
                  id="progress-bar-handle"
                  onMouseDown={this.mouseDown}
                  ref={progressBarHandle =>
                    (this.progressBarHandle = progressBarHandle)
                  }
                />
                <div
                  className="bp3-progress-meter"
                  style={{ width: progress * 100 + "%" }}
                />
              </div>
              <div className="track-timecode">{trackLengthTC}</div>
            </div>
          </div>
          <div className="track-info">
            <div className="bp3-button-group bp3-minimal">
              <button
                onClick={this.repeat}
                id="repeat-btn"
                className="bp3-button bp3-icon-list"
              />
            </div>
            <div className="track-album-image hidden-lt-md">
              <ImageLoader src="https://picsum.photos/50/50?random=1" />
            </div>
            <div className="track-meta hidden-lt-md">
              <Link
                className="track-title"
                to={{ pathname: `/song/abc` }}
                role="button"
                tabIndex={0}
              >
                Rakim
              </Link>
              <Link
                className="track-artist"
                to={{ pathname: `/artists/abc` }}
                role="button"
                tabIndex={0}
              >
                Dead Can Dance
              </Link>
            </div>
          </div>
          <div
            onClick={this.like}
            id="like-btn"
            className={`bp3-icon-heart ${liked ? "active-red" : ""}`}
          />
        </div>

        <audio
          id="player"
          ref={audio => (this.audio = audio)}
          onTimeUpdate={this.updateProgressBar}
        >
          <source
            src="https://tsn-music.s3.us-east-2.amazonaws.com/Rakim.mp3"
            type="audio/mp3"
          />
        </audio>
      </div>
    );
  }
}

export default MediaPlayer;
