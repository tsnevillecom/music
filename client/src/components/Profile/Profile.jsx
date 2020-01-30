import "./Profile.scss";

import React, { Component } from "react";

import ImageLoader from "../shared/ImageLoader";
import { Link } from "react-router-dom";
import { UsersService } from "../../services/users.service";
import { connect } from "react-redux";
import { getProfile } from "../../redux/actions";
import moment from "moment";

const ProfileNotFound = () => <div>Profile not found</div>;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      user: undefined
    };
  }

  componentDidMount() {
    const { user, getProfile } = this.props;
    const { params, url } = this.props.match;

    let userName;

    if (url === "/profile") {
      userName = user.userName;
    } else if (params.userName) {
      userName = params.userName;
    }

    if (userName) {
      getProfile(userName);
    } else {
      //TODO: could not load user
    }
  }

  render() {
    const { profile, getProfilePending } = this.props.profile;
    if (getProfilePending) return null;
    if (!profile) return <ProfileNotFound />;

    return (
      <div id="profile">
        <h2>
          {profile.firstName} {profile.lastName}
        </h2>
        {profile && (
          <div className="grid">
            <div className="col col-4">
              <div className="avatar">
                <ImageLoader src={profile.avatar} />
              </div>
            </div>

            <div className="col col-8 profile">
              <div>{profile.email}</div>

              {profile.bands && (
                <React.Fragment>
                  <h5>Bands</h5>
                  <div className="band-members">
                    {profile.bands.map((band, index) => {
                      return (
                        <Link
                          key={index}
                          to={{ pathname: `/bands/${band.slug}` }}
                          role="button"
                          tabIndex={0}
                        >
                          <ImageLoader src={band.avatar} />
                        </Link>
                      );
                    })}
                  </div>
                </React.Fragment>
              )}
              <div>{profile.userName}</div>
              <div>Joined {moment(profile.createdAt).fromNow()}</div>
              <div className="bp3-tag bp3-minimal">
                ID #{profile._id.toUpperCase()}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, profile } = state;
  return { user, profile };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: userName => dispatch(getProfile(userName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
