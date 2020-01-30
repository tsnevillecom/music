import "./Footer.scss";

import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import React, { Component } from "react";

import { AiFillInstagram } from "react-icons/ai";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="grid">
            <div className="col col-grow-2 col-md col-middle text-center">
              <div className="company">Band Manager</div>
              <div className="bp3-text-muted">Indianapolis, IN 46250</div>
              <div className="bp3-text-muted bp3-text-small copyright">
                &copy; Copyright 2020 TSN
              </div>
            </div>
            <div className="col col-grow-1 col-sm">
              <a className="bold" href="#">
                Home
              </a>
              <a className="bold" href="#">
                About
              </a>
              <a className="bold" href="#">
                Pricing
              </a>
              <a className="bold" href="#">
                Users
              </a>
              <a className="bold" href="#">
                Bands
              </a>
              <a className="bold" href="#">
                Contact Us
              </a>
            </div>
            <div className="col col-grow-1 col-sm">
              <h4>Company</h4>
              <a href="">Lorem Ipsum</a>
              <a href="">Lorem Ipsum</a>
              <a href="">Lorem Ipsum</a>
            </div>

            <div className="col col-grow-1 col-sm">
              <h4>Follow</h4>
              <a href="">
                <FaFacebookSquare /> Facebook
              </a>
              <a href="">
                <AiFillInstagram /> Instagram
              </a>
              <a href="">
                <FaTwitterSquare /> Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
