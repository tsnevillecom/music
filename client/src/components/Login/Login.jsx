import "./Login.scss";

import * as Validators from "../../utils/validators.util.js";

import { Field, reduxForm } from "redux-form";

import React from "react";
import RenderField from "../shared/RenderField";
import { connect } from "react-redux";
import { login } from "../../redux/actions";

class Login extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { login } = this.props;
    login({ ...values });
  }

  render() {
    const { handleSubmit, pristine, submitting, loginPending } = this.props;

    return (
      <div className="login">
        <h2>Login</h2>
        {loginPending && <p className="text-primary">Registering</p>}
        <form onSubmit={handleSubmit(this.submit)} noValidate>
          <Field
            autoFocus
            name="userName"
            component={RenderField}
            type="text"
            label="Username"
            validate={[Validators.required]}
          />

          <Field
            name="password"
            component={RenderField}
            maxLength="128"
            type="password"
            label="Password"
            validate={[Validators.required]}
          />

          <div className="login-actions">
            <button
              type="submit"
              className="bp3-button bp3-fill bp3-intent-primary"
              disabled={pristine || submitting}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loginPending, isAuthenticated } = state.auth;
  return {
    loginPending,
    isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) => dispatch(login(userName, password))
  };
};

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default reduxForm({
  form: "login",
  touchOnBlur: false
})(Login);
