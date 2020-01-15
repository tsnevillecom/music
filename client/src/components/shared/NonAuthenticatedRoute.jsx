import { Redirect, Route } from "react-router-dom";

import React from "react";
import { connect } from "react-redux";

class NonAuthenticatedRoute extends React.Component {
  render() {
    const { isAuthenticated, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(NonAuthenticatedRoute);
