import "./Register.scss";

import * as Validators from "../../utils/validators.util.js";

import { Field, reduxForm } from "redux-form";

import React from "react";
import RenderField from "../shared/RenderField";
import { connect } from "react-redux";
import { omit } from "underscore";
import { register } from "../../redux/actions";

class Register extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { register } = this.props;
    const user = omit(values, "passwordConfirmation");
    register(user);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      touch,
      submitting,
      registerPending
    } = this.props;

    return (
      <div className="register">
        <h2>Register</h2>
        {registerPending && <p className="text-primary">Registering</p>}
        <form onSubmit={handleSubmit(this.submit)} noValidate>
          <Field
            autoFocus
            name="userName"
            component={RenderField}
            type="text"
            label="Username"
            maxLength="256"
            onChange={() => touch("userName")}
            showResult={true}
            resultText="http://www.thissite.com/"
            hint="At least 4 characters, no spaces or special characters"
            validate={[
              Validators.required,
              Validators.minLength4,
              Validators.specialChars
            ]}
          />

          <Field
            name="firstName"
            component={RenderField}
            maxLength="32"
            type="text"
            label="First Name"
            validate={[Validators.required]}
          />

          <Field
            name="lastName"
            component={RenderField}
            maxLength="32"
            type="text"
            label="Last Name"
            validate={[Validators.required]}
          />

          <Field
            name="email"
            component={RenderField}
            type="email"
            label="Email"
            validate={[Validators.required, Validators.email]}
            warn={Validators.aol}
          />

          <Field
            name="password"
            component={RenderField}
            maxLength="128"
            type="password"
            label="Password"
            validate={[
              Validators.required,
              Validators.minLength8,
              Validators.passwordsMustMatch
            ]}
          />

          <Field
            name="passwordConfirmation"
            component={RenderField}
            maxLength="128"
            type="password"
            label="Confirm Password"
            validate={[
              Validators.required,
              Validators.minLength8,
              Validators.passwordsMustMatch
            ]}
          />

          <div className="register-actions">
            <button
              type="submit"
              className="bp3-button bp3-fill bp3-intent-primary"
              disabled={pristine || submitting}
            >
              Submit
            </button>
            <button
              style={{ marginLeft: "10px" }}
              type="button"
              onClick={reset}
              className="bp3-button bp3-fill bp3-minimal bp3-icon-remove"
              disabled={pristine || submitting}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { registerPending, isRegistered } = state.register;
  return {
    registerPending,
    isRegistered
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user))
  };
};

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default reduxForm({
  form: "register",
  touchOnBlur: false
})(Register);
