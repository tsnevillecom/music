import { Colors, Icon } from "@blueprintjs/core";
import { bool, number, object, string } from "prop-types";

import React from "react";

const RenderField = ({
  input: { name, value, ...input },
  label,
  inline,
  icon,
  required,
  hint,
  type,
  showResult,
  resultText,
  maxLength,
  rightElement,
  meta: { touched, error, warning, dirty }
}) => (
  <div
    className={`bp3-form-group ${inline ? "bp3-inline" : ""} ${
      touched && (error || warning) ? "bp3-intent-primary" : ""
    }`}
  >
    <label className="bp3-label" htmlFor={name}>
      {label}
      {!!required && (
        <span
          style={{ marginLeft: "4px" }}
          className="bp3-text-muted bp3-text-small"
        >
          (required)
        </span>
      )}
    </label>
    <div className="bp3-form-content">
      <div
        className={`bp3-input-group ${inline ? "bp3-inline" : ""} ${
          touched && (error || warning) ? "bp3-intent-primary" : ""
        }`}
      >
        {icon && <span className={`bp3-icon bp3-icon-${icon}`}></span>}
        <input
          {...input}
          id={name}
          type={type}
          maxLength={maxLength}
          className="bp3-input"
          placeholder={type}
          dir="auto"
        />
        {rightElement && <div className="bp3-input-action" />}
      </div>
      {!!showResult && (
        <div
          className="bp3-text-small bp3-result-text"
          style={{ marginTop: "5px" }}
        >
          {resultText}
          {value.toLowerCase()}
        </div>
      )}

      {!!hint && (
        <div className="bp3-text-small" style={{ marginTop: "5px" }}>
          {hint}
        </div>
      )}

      {touched && (!!error || !!warning) && (
        <div
          className="bp3-form-helper-text"
          style={{ color: !!error ? Colors.RED3 : Colors.GOLD4 }}
        >
          <Icon
            icon={"error"}
            iconSize={12}
            style={{ top: "-1px", marginRight: "4px" }}
          />
          <span>{error || warning}</span>
        </div>
      )}
    </div>
  </div>
);

RenderField.propTypes = {
  input: object.isRequired,
  meta: object.isRequired,
  required: bool.isRequired,
  disabled: bool.isRequired,
  showResult: bool.isRequired,
  resultText: string.isRequired,
  type: string.isRequired,
  label: string.isRequired,
  hint: string.isRequired,
  maxLength: number.isRequired,
  inline: bool.isRequired
};

RenderField.defaultProps = {
  required: true,
  label: "",
  hint: "",
  type: "text",
  showResult: false,
  resultText: "",
  disabled: false,
  maxLength: 524288,
  inline: false
};

export default RenderField;
