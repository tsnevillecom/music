import "./BandProfile.scss";

import React, { Component } from "react";
import { getBand, hideModal, showModal } from "../../redux/actions";

import { Icon } from "@blueprintjs/core";
import ImageLoader from "../ImageLoader/ImageLoader";
import { IoIosShareAlt } from "react-icons/io";
import { LINK_ICONS } from "../../constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import faker from "faker";
import moment from "moment";

const ProfileNotFound = () => <div>Profile not found</div>;

class BandProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      isLoading: true,
      tab: "featured"
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

  openContactModal = () => {
    const { showModal } = this.props;
    showModal(
      {
        title: "Contact",
        icon: "envelope",
        primaryText: "Done",
        isCloseButtonShown: false,
        onPrimary: this.closeModal
      },
      "alert"
    );
  };

  openFollowModal = () => {
    const { showModal } = this.props;
    showModal(
      {
        title: "Follow",
        icon: "new-person",
        primaryText: "Follow",
        isCloseButtonShown: true,
        onPrimary: this.closeModal,
        body: <b>Test</b>
      },
      "alert"
    );
  };

  openShareModal = () => {
    const { showModal } = this.props;
    showModal(
      {
        title: "Share",
        icon: "social-media",
        primaryText: "Share",
        isCloseButtonShown: true,
        onPrimary: this.closeModal,
        body: <b>Test</b>
      },
      "alert"
    );
  };

  closeModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  toggleTab = tab => {
    this.setState({ tab });
  };

  render() {
    const { band } = this.props;
    const { isLoading, tab } = this.state;
    if (isLoading) return null;
    if (!band) return <ProfileNotFound />;

    const songs = [
      {
        name: faker.random.words(),
        image:
          "https://picsum.photos/30/30?random=" + Math.ceil(Math.random() * 10),
        length: "04:34"
      },
      {
        name: faker.random.words(),
        image:
          "https://picsum.photos/30/30?random=" + Math.ceil(Math.random() * 10),
        length: "04:34"
      },
      {
        name: faker.random.words(),
        image:
          "https://picsum.photos/30/30?random=" + Math.ceil(Math.random() * 10),
        length: "04:34"
      },
      {
        name: faker.random.words(),
        image:
          "https://picsum.photos/30/30?random=" + Math.ceil(Math.random() * 10),
        length: "04:34"
      },
      {
        name: faker.random.words(),
        image:
          "https://picsum.photos/30/30?random=" + Math.ceil(Math.random() * 10),
        length: "04:34"
      }
    ];

    const links = [
      {
        type: "facebook",
        url: "http://facebook.com/tsnevillecom",
        name: "Facebook"
      },
      {
        type: "soundcloud",
        url: "http://soundcloud.com/tsnevillecom",
        name: "Soundcloud"
      },
      {
        type: "twitter",
        url: "http://twitter.com/tsnevillecom",
        name: "Twitter"
      },
      {
        type: "website",
        url: "http://timneville.me",
        name: "Website"
      },
      {
        type: "bandcamp",
        url: "http://bandcamp.com",
        name: "Bandcamp"
      },
      {
        type: "youtube",
        url: "http://youtube.com",
        name: "YouTube"
      },
      {
        type: "reverbnation",
        url: "http://reverbnation.com",
        name: "ReverbNation"
      },
      {
        type: "other",
        url: "http://example.com",
        name: "Other"
      }
    ];

    return (
      <div id="profile">
        <div
          id="profile-banner"
          style={{
            backgroundImage:
              "url(https://picsum.photos/1280/240?random=" +
              Math.ceil(Math.random() * 10) +
              ")"
          }}
        >
          <div id="profile-avatar">
            <ImageLoader src={band.avatar} />
          </div>
          <div>
            <div>
              <span id="profile-title">{band.name}</span>
              <br />
              <span id="profile-location">
                <span className="bp3-icon-map-marker"></span>{" "}
                {[band.address.city, band.address.state].join(", ")}
              </span>
            </div>

            <div id="profile-genres">
              {band.genres.map((genre, index) => {
                return (
                  <span key={index} className="bp3-tag">
                    {genre}
                  </span>
                );
              })}
            </div>
          </div>
          <div id="profile-actions">
            <button
              onClick={this.openContactModal}
              className="bp3-button bp3-large bp3-icon-envelope"
            >
              Contact
            </button>
            <button
              onClick={this.openFollowModal}
              className="bp3-button bp3-large bp3-icon-new-person"
            >
              Follow
            </button>
            <button
              onClick={this.openShareModal}
              className="bp3-button bp3-large share"
            >
              <IoIosShareAlt
                size="20px"
                color="#2EE6D6"
                style={{ marginRight: "6px" }}
              />
              Share
            </button>
          </div>
        </div>
        {band && (
          <div className="grid grid-md">
            <div id="profile-info" className="col col-md">
              <div className="bp3-tabs">
                <ul className="bp3-tab-list" role="tablist">
                  <li
                    className="bp3-tab"
                    role="tab"
                    aria-selected={tab === "featured"}
                    onClick={() => this.toggleTab("featured")}
                  >
                    Featured
                  </li>
                  <li
                    className="bp3-tab"
                    role="tab"
                    aria-selected={tab === "music"}
                    onClick={() => this.toggleTab("music")}
                  >
                    Music
                  </li>
                  <li
                    className="bp3-tab"
                    role="tab"
                    aria-selected={tab === "media"}
                    onClick={() => this.toggleTab("media")}
                  >
                    Media
                  </li>
                  <li
                    className="bp3-tab"
                    role="tab"
                    aria-selected={tab === "events"}
                    onClick={() => this.toggleTab("events")}
                  >
                    Events
                  </li>
                </ul>
              </div>

              <div id="profile-songs">
                <h5>Songs</h5>
                <div id="songs-list">
                  {songs.map((song, index) => {
                    return (
                      <div key={index} className="song">
                        <Icon className="song-play" iconSize={16} icon="play" />
                        <div className="song-image">
                          <ImageLoader src={song.image} alt="song image" />
                        </div>
                        <span className="song-name">{song.name}</span>
                        <span className="song-length bp3-text-muted">
                          {song.length}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              id="profile-sidebar"
              className="col col-md col-md-first col-fixed"
            >
              <div>
                <div id="profile-description">
                  <h5>About</h5>
                  <div className="bp3-text-muted">{band.description}</div>
                </div>

                <div id="profile-members">
                  <h5>Band Members</h5>
                  <div id="profile-members-list">
                    {band.members.map((member, index) => {
                      return (
                        <Link
                          key={index}
                          to={{ pathname: `/artists/${member.userName}` }}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="member-image">
                            <ImageLoader src={member.avatar} />
                          </span>
                          <span className="member-name">
                            {member.firstName} {member.lastName}
                          </span>
                          <span className="member-role">Instrument/Vocal</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div id="profile-links">
                  <h5>Links</h5>
                  {links.map((link, index) => {
                    const LinkIcon = LINK_ICONS[link.type];
                    return (
                      <a href={link.url} key={index} target="_blank">
                        <span>
                          <LinkIcon />
                        </span>
                        <span>{link.name}</span>
                      </a>
                    );
                  })}
                </div>

                <div id="profile-joined">
                  Joined {moment(band.createdAt).fromNow()}
                </div>

                <div className="bp3-tag bp3-minimal">
                  ID #{band._id.toUpperCase()}
                </div>
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
    getBand: slug => dispatch(getBand(slug)),
    hideModal: () => dispatch(hideModal()),
    showModal: (modalProps, modalData) => {
      dispatch(showModal({ modalProps, modalData }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BandProfile);
