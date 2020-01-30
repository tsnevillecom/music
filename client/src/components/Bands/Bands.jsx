import "./Bands.scss";

import React, { Component } from "react";

import { BandsService } from "../../services/bands.service";
import ImageLoader from "../shared/ImageLoader";
import { Link } from "react-router-dom";
import List from "../List/List";
import { map } from "underscore";
import moment from "moment";

class Bands extends Component {
  constructor() {
    super();
    this.state = {
      bands: []
    };
  }

  componentDidMount() {
    BandsService.getBands().then(res => {
      if (res.status === 200) {
        this.setState({ bands: res.data });
      }
    });
  }

  renderBands() {
    const { bands } = this.state;
    return map(bands, band => {
      return (
        <div key={band._id} className="card">
          <div className="card-content bp3-elevation-2">
            <div className="avatar">
              <Link
                to={{ pathname: `/bands/${band.slug}` }}
                role="button"
                tabIndex={0}
              >
                <ImageLoader src={band.avatar} />
              </Link>
            </div>
            <div className="card-body">
              <div className="title">
                <Link
                  to={{ pathname: `/bands/${band.slug}` }}
                  className="clamp2"
                  role="button"
                  tabIndex={0}
                >
                  {band.name}
                </Link>
              </div>
              <div className="intro clamp2 bp3-text-small bp3-text-muted">
                {band.introduction}
              </div>
              <div className="bp3-divider"></div>
              <div className="location bp3-text-small bp3-text-muted">
                <span className="bp3-icon-map-marker"></span>{" "}
                <span>
                  {[band.address.city, band.address.state].join(", ")}{" "}
                  {band.address.zip}
                </span>
              </div>
              <div className="genres bp3-text-small bp3-text-muted">
                <span className="bp3-icon-tag"></span>{" "}
                {band.genres.map((genre, index) => {
                  return (
                    <span key={index} className="bp3-tag bp3-minimal">
                      {genre}
                    </span>
                  );
                })}
              </div>
              <div className="bp3-divider"></div>

              <div className="actions">
                <div className="bp3-button-group bp3-fill bp3-minimal">
                  <a
                    className="bp3-button bp3-icon-new-person"
                    role="button"
                    tabIndex={0}
                  >
                    Follow
                  </a>
                  <a
                    className="bp3-button bp3-icon-envelope"
                    role="button"
                    tabIndex={0}
                  >
                    Contact
                  </a>
                  <a
                    className="bp3-button bp3-icon-play"
                    role="button"
                    tabIndex={0}
                  >
                    Play
                  </a>
                </div>

                <Link
                  to={{ pathname: `/bands/${band.slug}` }}
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
    return this.renderBands();
  }
}

Bands = List(Bands, "Bands");

export default Bands;
