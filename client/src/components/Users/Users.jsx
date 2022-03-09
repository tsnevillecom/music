import "./Users.scss";

import React, { Component } from "react";

import ImageLoader from "../ImageLoader/ImageLoader";
import { Link } from "react-router-dom";
import List from "../List/List";
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
        <div key={user._id} className="card">
          <div className="card-content bp3-elevation-2">
            <div className="avatar">
              <Link
                to={{
                  pathname: `/artists/${user.userName}`,
                  state: { user }
                }}
                role="button"
                tabIndex={0}
              >
                <ImageLoader src={user.avatar} />
              </Link>
            </div>
            <div className="card-body">
              <div className="title">
                <Link
                  to={{
                    pathname: `/artists/${user.userName}`,
                    state: { user }
                  }}
                  className="clamp2"
                  role="button"
                  tabIndex={0}
                >
                  {user.firstName} {user.lastName}
                </Link>
              </div>
              <div className="intro clamp2 bp3-text-small bp3-text-muted">
                Member Since: {moment(user.createdAt).fromNow()}
              </div>
              <div className="bp3-divider"></div>

              <div className="actions">
                <div className="bp3-button-group bp3-fill bp3-minimal">
                  <button className="bp3-button bp3-icon-new-person">
                    Follow
                  </button>
                  <button className="bp3-button bp3-icon-envelope">
                    Contact
                  </button>
                  <button className="bp3-button bp3-icon-play">Play</button>
                </div>

                <Link
                  to={{
                    pathname: `/artists/${user.userName}`,
                    state: { user }
                  }}
                  className="bp3-button bp3-intent-primary bp3-fill bp3-icon-person"
                  role="button"
                  tabIndex={0}
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return this.renderUsers();
  }
}

Users = List(Users, "Musicians");

export default Users;
