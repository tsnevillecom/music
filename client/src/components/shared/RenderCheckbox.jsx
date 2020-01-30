import { Checkbox, Colors, Icon } from "@blueprintjs/core";
import React, { Component } from "react";
import { bool, object, string } from "prop-types";

const RenderCheckbox = ({
  input: { checked, onChange, ...input },
  label,
  disabled,
  meta: { touched, error, warning, dirty }
}) => (
  <React.Fragment>
    <Checkbox
      disabled={disabled}
      checked={checked}
      onChange={(e, data) => onChange(e, data)}
    >
      <span className="bp3-text-muted">{label}</span>
    </Checkbox>
    {touched && error && <span>{error}</span>}
  </React.Fragment>
);

RenderCheckbox.propTypes = {
  input: object.isRequired,
  meta: object.isRequired,
  disabled: bool.isRequired,
  label: string.isRequired
};

RenderCheckbox.defaultProps = {
  input: null,
  meta: null,
  disabled: false,
  label: ""
};

export default RenderCheckbox;
