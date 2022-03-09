import "./Footer.scss";

import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import React, { Component } from "react";

import { AiFillInstagram } from "react-icons/ai";
import { NavLink } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container container-no-margin-lt-md">
          <div className="grid">
            <div className="col col-grow-2 col-md text-center brand">
              <div className="company">
                <span className="bp3-icon-standard bp3-icon-settings" />{" "}
                FREQZ.io
              </div>
              <div className="bp3-text-muted">Indianapolis, IN 46250</div>
              <div className="bp3-text-muted bp3-text-small copyright hidden-lt-md">
                &copy; Copyright 2020 TSN
              </div>
            </div>
            <div className="col col-grow-1 col-sm">
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Home
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                About
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Pricing
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Users
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Bands
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Contact Us
              </NavLink>
            </div>
            <div className="col col-grow-1 col-sm">
              <h4>Company</h4>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Lorem Ipsum
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Lorem Ipsum
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                Lorem Ipsum
              </NavLink>
            </div>

            <div className="col col-grow-1 col-sm">
              <h4>Follow</h4>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                <FaFacebookSquare /> Facebook
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                <AiFillInstagram /> Instagram
              </NavLink>
              <NavLink to="#" onClick={e => e.preventDefault()}>
                <FaTwitterSquare /> Twitter
              </NavLink>
            </div>

            <div className="col col-12 hidden-gt-md">
              <div className="bp3-text-muted bp3-text-small copyright">
                &copy; Copyright 2020 TSN
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
