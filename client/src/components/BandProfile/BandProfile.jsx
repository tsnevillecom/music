import "./BandProfile.scss";

import React, { Component } from "react";

import { BandsService } from "../../services/bands.service";
import ImageLoader from "../shared/ImageLoader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getBand } from "../../redux/actions";
import moment from "moment";

const ProfileNotFound = () => <div>Profile not found</div>;

class BandProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { getBand } = this.props;
    const { params } = this.props.match;

    let slug = params.slug;
    if (slug) {
      getBand(slug).then(() => {
        this.setState({ isLoading: false });
      });
    } else {
      //TODO: could not load band
      console.log("could not load band");
    }
  }

  render() {
    const { band } = this.props;
    const { isLoading } = this.state;
    if (!band) return <ProfileNotFound />;

    return (
      <div id="bandProfile">
        <h2>{band.name}</h2>
        {band && (
          <div className="grid">
            <div className="col col-4">
              <div className="avatar">
                <ImageLoader src={band.avatar} />
              </div>
            </div>

            <div className="col col-8 profile">
              <div>{band.introduction}</div>
              <div>{band.description}</div>
              <div>{band.active}</div>
              <h5>Address</h5>
              <div>
                {[band.address.city, band.address.state].join(", ")}{" "}
                {band.address.zip.toString()}
              </div>
              <div>
                <span className="bp3-icon-tag"></span>{" "}
                {band.genres.map((genre, index) => {
                  return (
                    <span key={index} className="bp3-tag bp3-minimal">
                      {genre}
                    </span>
                  );
                })}
              </div>
              <div>
                {band.websites.map((site, index) => {
                  return (
                    <span key={index} className="bp3-tag bp3-minimal">
                      {site}
                    </span>
                  );
                })}
              </div>

              <h5>Members</h5>
              <div className="band-members">
                {band.members.map((member, index) => {
                  return (
                    <Link
                      key={index}
                      to={{ pathname: `/users/${member.userName}` }}
                      role="button"
                      tabIndex={0}
                    >
                      <ImageLoader src={member.avatar} />
                    </Link>
                  );
                })}
              </div>
              <div>{band.slug}</div>
              <div>Joined {moment(band.createdAt).fromNow()}</div>
              <div className="bp3-tag bp3-minimal">
                ID #{band._id.toUpperCase()}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profile } = state.band;
  return { band: profile };
};

const mapDispatchToProps = dispatch => {
  return {
    getBand: slug => dispatch(getBand(slug))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BandProfile);
