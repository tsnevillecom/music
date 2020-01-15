import React from "react";

const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <div>
      <input
        className={"form-control" + (touched && error ? " is-invalid" : "")}
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span className="invalid-feedback">{error}</span>) ||
          (warning && <span className="text-warning">{warning}</span>))}
    </div>
  </div>
);

export default RenderField;
