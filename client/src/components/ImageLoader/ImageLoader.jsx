import "./ImageLoader.scss";

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

  componentDidMount() {
    const height = Math.min(36, this.imageLoader.clientHeight - 10);
    this.setState({ height });
  }

  handleImageLoaded() {
    this.setState({ loading: false, error: false });
  }

  handleImageErrored() {
    this.setState({ loading: false, error: true });
  }

  render() {
    const { loading, error, height } = this.state;
    const alt = !!this.props.alt ? this.props.alt : "avatar";
    const src = !!this.props.src ? this.props.src : UserProfileImg;

    return (
      <div
        className="image-loader"
        ref={imageLoader => (this.imageLoader = imageLoader)}
      >
        {error && (
          <Icon
            icon="disable"
            iconSize={36}
            className="float-up"
            color="#C23030"
          />
        )}
        {(loading || error) && (
          <Spinner
            intent={loading ? "primary" : "danger"}
            size={height}
            className="float-up"
          />
        )}
        <img
          alt={alt}
          src={src}
          className={loading || error ? "fadeOut" : "fadeIn"}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
        <svg
          width="100"
          height="100"
          className={loading || error ? "fadeIn" : "fadeOut"}
        >
          <rect />
        </svg>
      </div>
    );
  }
}
export default ImageLoader;
