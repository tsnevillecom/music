import "./Users.scss";

import React, { Component } from "react";

import { Link } from "react-router-dom";
import { UsersService } from "../../services/users.service";
import { map } from "underscore";
import moment from "moment";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    UsersService.getUsers().then(res => {
      if (res.status === 200) {
        this.setState({ users: res.data });
      }
    });
  }

  renderUsers() {
    const { users } = this.state;
    return map(users, user => {
      return (
        <div key={user._id}>
          <div>
            <Link to={{ pathname: `/users/${user.userName}`, state: { user } }}>
              Profile
            </Link>
          </div>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.userName}</div>
          <div>{user.isVerified}</div>
          <div>{user.email}</div>
          <div>{moment(user.createdAt).fromNow()}</div>
          <hr />
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderUsers()}</div>;
  }
}

export default Users;
