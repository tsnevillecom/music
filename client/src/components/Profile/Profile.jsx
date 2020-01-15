import React, { Component } from "react";

import { UsersService } from "../../services/users.service";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      user: undefined
    };
  }

  componentDidMount() {
    const { user: currentUser } = this.props;
    const { params, url } = this.props.match;

    // if (!params || !params.userName)

    if (params.userName) {
      UsersService.getUserByUserName(params.userName).then(res => {
        if (res.status === 200) {
          this.setState({ userName: params.userName, user: res.data });
        }
      });
    } else {
      //TODO: could not load user
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <h2>Profile</h2>
        {user && (
          <React.Fragment>
            <div>{user._id}</div>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.userName}</div>
            <div>{user.isVerified}</div>
            <div>{user.email}</div>
            <div>{user.createdAt}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(Profile);
