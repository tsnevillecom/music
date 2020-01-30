import { Icon, Spinner } from "@blueprintjs/core";

import React from "react";
import UserProfileImg from "../../assets/user_profile.jpg";

class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      placeholder: ""
    };
  }

  handleImageLoaded() {
    this.setState({ loading: false, error: false });
  }

  handleImageErrored() {
    console.log("failed");
    this.setState({ loading: false, error: true });
  }

  render() {
    const { loading, error } = this.state;

    const src = !!this.props.src ? this.props.src : UserProfileImg;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <Icon
          icon="disable"
          iconSize={36}
          className={`float-up ${error ? "" : "hidden"}`}
          color="#C23030"
        />
        <Spinner
          intent={loading ? "primary" : "danger"}
          className={`float-up ${loading || error ? "" : "hidden"}`}
        />
        <svg
          width="400"
          height="400"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "5px",
            display: loading || error ? "block" : "none"
          }}
        >
          <rect
            style={{
              height: "100%",
              width: "100%",
              fill: "rgba(0,0,0, .1)"
            }}
          />
        </svg>
        <img
          style={{ display: loading || error ? "none" : "block" }}
          src={src}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
      </div>
    );
  }
}
export default ImageLoader;
