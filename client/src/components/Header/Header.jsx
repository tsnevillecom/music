import "./Header.scss";

import { Button, Popover, Position } from "@blueprintjs/core";
import React, { Component } from "react";
import { initState, logout } from "../../redux/actions";

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { history } from "../../helpers";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    const { logout } = this.props;
    e.preventDefault();
    logout().then(() => history.push("/login"));
  }

  renderProfileMenu() {
    return (
      <ul className="bp3-menu bp3-elevation-1">
        <li className="bp3-menu-header">
          <h6 className="bp3-heading">User menu</h6>
        </li>
        <li>
          <NavLink to="/profile" className="bp3-menu-item">
            Profile
          </NavLink>
        </li>
        <li>
          <a
            onClick={this.logout}
            className="bp3-menu-item bp3-popover-dismiss"
          >
            Logout
          </a>
        </li>
      </ul>
    );
  }

  render() {
    const { isAuthenticated, firstName, lastName } = this.props;

    return (
      <header id="header">
        <nav>
          <div className="bp3-navbar-heading">Band Manager</div>
          <div className="bp3-navbar-group">
            <NavLink exact to="/" className="bp3-button bp3-minimal">
              Home
            </NavLink>
            <NavLink to="/about" className="bp3-button bp3-minimal">
              About
            </NavLink>
            <NavLink to="/pricing" className="bp3-button bp3-minimal">
              Pricing
            </NavLink>

            {isAuthenticated && (
              <React.Fragment>
                <span className="bp3-navbar-divider"></span>
                <NavLink to="/users" className="bp3-button bp3-minimal">
                  Users
                </NavLink>
              </React.Fragment>
            )}

            {isAuthenticated && (
              <React.Fragment>
                <span className="bp3-navbar-divider"></span>
                <NavLink to="/bands" className="bp3-button bp3-minimal">
                  Bands
                </NavLink>
              </React.Fragment>
            )}
          </div>

          <div className="bp3-navbar-group">
            {!isAuthenticated && (
              <React.Fragment>
                <NavLink to="/login" className="bp3-button bp3-minimal">
                  Login
                </NavLink>
                <NavLink to="/register" className="bp3-button bp3-minimal">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {isAuthenticated && (
              <Popover
                content={this.renderProfileMenu()}
                position={Position.BOTTOM_RIGHT}
                minimal={true}
              >
                <Button
                  className="bp3-minimal"
                  icon="user"
                  text={firstName + " " + lastName}
                />
              </Popover>
            )}
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  initState: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { isAuthenticated, authError } = state.auth;
  const { firstName, lastName } = state.user;
  return {
    isAuthenticated,
    authError,
    firstName,
    lastName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    initState: () => dispatch(initState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
