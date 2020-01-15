import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };

    this.displayLoader = this.displayLoader.bind(this);
    this.timer = setTimeout(this.displayLoader, 250);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  displayLoader() {
    this.setState({ display: true });
  }

  render() {
    const { display } = this.state;
    if (!display) return null;
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
}

export default Loading;
