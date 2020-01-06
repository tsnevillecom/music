import React, { Component } from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import { history } from '../../helpers';
import Pricing from '../Pricing/Pricing';
import PrivateRoute from '../shared/PrivateRoute';
import PageLoader from '../PageLoader/PageLoader';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';
import { logout, initState } from '../../redux/actions';

import './App.scss';

const MIN_LOAD = 300;

const Home = React.lazy(() => {
  return Promise.all([
    import('../Home/Home'),
    new Promise(resolve => setTimeout(resolve, MIN_LOAD))
  ]).then(([moduleExports]) => moduleExports);
});

const About = React.lazy(() => {
  return Promise.all([
    import('../About/About'),
    new Promise(resolve => setTimeout(resolve, MIN_LOAD))
  ]).then(([moduleExports]) => moduleExports);
});

const Login = React.lazy(() => {
  return Promise.all([
    import('../Login/Login'),
    new Promise(resolve => setTimeout(resolve, MIN_LOAD))
  ]).then(([moduleExports]) => moduleExports);
});

const Profile = React.lazy(() => {
  return Promise.all([
    import('../Profile/Profile'),
    new Promise(resolve => setTimeout(resolve, MIN_LOAD))
  ]).then(([moduleExports]) => moduleExports);
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: true
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.initState().then(() => {
      setTimeout(() => this.setState({ init: false }), 1000);
    });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout().then(() => history.push('/login'));
  }

  render() {
    const { isAuthenticated, userName } = this.props;
    const { init } = this.state;

    if (init) {
      return <PageLoader />;
    }

    return (
      <Router history={history}>
        <nav className="navbar navbar-dark bg-dark justify-content-between navbar navbar-expand-md fixed-top">
          <div className="navbar-nav">
            <NavLink exact to="/" className="nav-item nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to="/pricing" className="nav-item nav-link">
              Pricing
            </NavLink>
            {!isAuthenticated && (
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink to="/profile" className="nav-item nav-link">
                Profile
              </NavLink>
            )}
            {isAuthenticated && (
              <a href="#" className="nav-item nav-link" onClick={this.logout}>
                Logout
              </a>
            )}
          </div>
          {userName && <div>{userName}</div>}
        </nav>

        <main role="main">
          <div className="container">
            <div className="row">
              <Switch>
                <React.Suspense fallback={<Loading />}>
                  <Route exact path="/" component={Home} />
                  <PrivateRoute
                    path="/profile"
                    roles={[]}
                    component={Profile}
                  />
                  <Route path="/about" component={About} />
                  <Route path="/pricing" component={Pricing} />
                  <Route path="/login" component={Login} />
                </React.Suspense>
              </Switch>
            </div>
          </div>
        </main>
      </Router>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
