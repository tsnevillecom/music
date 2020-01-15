import React, { Component } from "react";

import { connect } from "react-redux";
import { verify } from "../../redux/actions";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      url: null
    };
  }

  componentDidMount() {
    const { verify } = this.props;
    const { params, url } = this.props.match;
    this.setState({ token: params.token, url }, () => {
      verify(url);
    });
  }

  render() {
    const { token, url } = this.state;
    const { verifyPending, isVerified } = this.props;

    return (
      <div>
        {isVerified && (
          <React.Fragment>
            <h2>Congratulations</h2>
            <p>Please login.</p>
            <p>{token}</p>
          </React.Fragment>
        )}

        {!isVerified && (
          <React.Fragment>
            <h2>Fuck!</h2>
            <p>Sorry about that.</p>
            <p>Enter your email address to send a very verification link.</p>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isVerified } = state.verify;
  return { isVerified };
};

const mapDispatchToProps = dispatch => {
  return {
    verify: url => dispatch(verify(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmail);
