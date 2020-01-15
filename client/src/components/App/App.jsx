import "./App.scss";

import { Dropdown, Icon, Layout, Menu } from "antd";
import { NavLink, Route, Router, Switch } from "react-router-dom";
import React, { Component } from "react";
import { initState, logout } from "../../redux/actions";

import AuthenticatedRoute from "../shared/AuthenticatedRoute";
import Loading from "../Loading/Loading";
import NonAuthenticatedRoute from "../shared/NonAuthenticatedRoute";
import PageLoader from "../PageLoader/PageLoader";
import Pricing from "../Pricing/Pricing";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { history } from "../../helpers";

const Home = React.lazy(() => import("../Home/Home"));
const About = React.lazy(() => import("../About/About"));
const Login = React.lazy(() => import("../Login/Login"));
const Profile = React.lazy(() => import("../Profile/Profile"));
const Users = React.lazy(() => import("../Users/Users"));
const Register = React.lazy(() => import("../Register/Register"));
const VerifyEmail = React.lazy(() => import("../VerifyEmail/VerifyEmail"));
const PageNotFound = React.lazy(() => import("../PageNotFound/PageNotFound"));

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

  render() {
    const { Header, Content } = Layout;
    const { isAuthenticated, userName } = this.props;
    const { init } = this.state;

    if (init) {
      return <PageLoader />;
    }

    return (
      <Router history={history}>
        <Layout>
          <Header
            id="header"
            style={{ position: "fixed", zIndex: 1, width: "100%" }}
          >
            <nav className="top-nav">
              <div className="top-nav-left">
                <NavLink exact to="/" className="nav-item nav-link">
                  Home
                </NavLink>
                <NavLink to="/about" className="nav-item nav-link">
                  About
                </NavLink>
                <NavLink to="/pricing" className="nav-item nav-link">
                  Pricing
                </NavLink>
                {isAuthenticated && (
                  <NavLink to="/users" className="nav-item nav-link">
                    Users
                  </NavLink>
                )}
              </div>
              <div className="top-nav-right">
                {!isAuthenticated && (
                  <React.Fragment>
                    <NavLink to="/login" className="nav-item nav-link">
                      Login
                    </NavLink>
                    <NavLink to="/register" className="nav-item nav-link">
                      Register
                    </NavLink>
                  </React.Fragment>
                )}
                {isAuthenticated && (
                  <Dropdown
                    placement="bottomRight"
                    overlay={
                      <Menu>
                        <Menu.Item key="0">
                          <NavLink to="/profile" className="nav-item nav-link">
                            Profile
                          </NavLink>
                        </Menu.Item>
                        <Menu.Divider />

                        {isAuthenticated && (
                          <Menu.Item key="3">
                            <a
                              href="/#"
                              className="nav-item nav-link"
                              onClick={this.logout}
                            >
                              Logout
                            </a>
                          </Menu.Item>
                        )}
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a className="ant-dropdown-link" href="#">
                      {userName} <Icon type="down" />
                    </a>
                  </Dropdown>
                )}
              </div>
            </nav>
          </Header>
          <Layout>
            <Content>
              <main role="main">
                <div className="container">
                  <div className="row">
                    <Switch>
                      <React.Suspense fallback={<Loading />}>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/pricing" component={Pricing} />
                        <Route path="/verify/:token" component={VerifyEmail} />
                        <AuthenticatedRoute
                          path="/profile"
                          exact
                          component={Profile}
                        />
                        <AuthenticatedRoute
                          path="/users/:userName"
                          component={Profile}
                        />
                        <AuthenticatedRoute
                          path="/users"
                          exact
                          component={Users}
                        />
                        <NonAuthenticatedRoute
                          path="/login"
                          component={Login}
                        />
                        <NonAuthenticatedRoute
                          path="/register"
                          component={Register}
                        />
                        <Route component={PageNotFound} />
                      </React.Suspense>
                    </Switch>
                  </div>
                </div>
              </main>
            </Content>
          </Layout>
        </Layout>
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
  const { userName } = state.user;
  return {
    isAuthenticated,
    authError,
    userName
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
