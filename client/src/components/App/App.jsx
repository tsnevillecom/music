import "./App.scss";

import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position
} from "@blueprintjs/core";
import { NavLink, Route, Router, Switch } from "react-router-dom";
import React, { Component } from "react";
import { initState, logout } from "../../redux/actions";

import AuthenticatedRoute from "../shared/AuthenticatedRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import MediaPlayer from "../MediaPlayer/MediaPlayer";
import NonAuthenticatedRoute from "../shared/NonAuthenticatedRoute";
import PageLoader from "../PageLoader/PageLoader";
import Pricing from "../Pricing/Pricing";
import PropTypes from "prop-types";
import ScrollToTop from "../shared/ScrollToTop";
import { connect } from "react-redux";
import { history } from "../../helpers";
import loadable from "@loadable/component";

const Home = loadable(() => import("../Home/Home"));
const About = loadable(() => import("../About/About"));
const Login = loadable(() => import("../Login/Login"));
const Profile = loadable(() => import("../Profile/Profile"));
const Users = loadable(() => import("../Users/Users"));
const Bands = loadable(() => import("../Bands/Bands"));
const Register = loadable(() => import("../Register/Register"));
const VerifyEmail = loadable(() => import("../VerifyEmail/VerifyEmail"));
const PageNotFound = loadable(() => import("../PageNotFound/PageNotFound"));
const BandProfile = loadable(() => import("../BandProfile/BandProfile"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: true,
      collapsed: false
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.initState().then(() => {
      setTimeout(() => this.setState({ init: false }), 2000);
    });
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
    const { init } = this.state;

    if (init) {
      return <PageLoader />;
    }

    const clientId = "853fdb79a14a9ed748ec9fe482e859dd";
    const trackId = "120912535";

    return (
      <Router history={history}>
        <ScrollToTop />
        <Header />
        <main role="main">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/bands" component={Bands} />
              <Route exact path="/bands/:slug" component={BandProfile} />
              <Route exact path="/verify/:token" component={VerifyEmail} />
              <AuthenticatedRoute
                exact
                key="profile"
                path="/profile"
                component={Profile}
              />
              <AuthenticatedRoute
                exact
                key="userProfile"
                path="/users/:userName"
                component={Profile}
              />
              <AuthenticatedRoute exact path="/users" component={Users} />
              <NonAuthenticatedRoute exact path="/login" component={Login} />
              <NonAuthenticatedRoute
                exact
                path="/register"
                component={Register}
              />
              <Route component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
          <MediaPlayer clientId={clientId} trackId={trackId} />
        </main>
      </Router>
    );
  }
}

App.propTypes = {
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
)(App);
