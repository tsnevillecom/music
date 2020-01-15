import React, { Component } from "react";

class PageNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.match);
    return (
      <div>
        <h2>Page Not Found</h2>
      </div>
    );
  }
}

export default PageNotFound;
