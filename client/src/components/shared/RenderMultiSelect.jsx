import { Button, Checkbox, Colors, Icon, MenuItem } from "@blueprintjs/core";
import React, { Component } from "react";
import { bool, object, string } from "prop-types";

import { MultiSelect } from "@blueprintjs/select";

const RenderMultiSelect = ({
  input: { checked, value, onChange, ...input },
  label,
  disabled,
  items,
  onClear,
  onRemove,
  meta: { touched, error, warning, dirty }
}) => (
  <React.Fragment>
    <MultiSelect
      fill={true}
      items={items}
      minimal={true}
      disabled={disabled}
      className="filter-multiselect"
      popoverProps={{
        minimal: true,
        fill: true,
        usePortal: false,
        popoverClassName: "filter-multiselect-menu"
      }}
      tagInputProps={{
        tagProps: { minimal: true },
        onRemove: (tag, index) => console.log(tag, index),
        rightElement: <Button icon="cross" minimal={true} onClick={onClear} />
      }}
      itemRenderer={(item, itemProps) => {
        return (
          <MenuItem
            key={itemProps.index}
            text={item}
            onClick={itemProps.handleClick}
            active={itemProps.modifiers.active}
          />
        );
      }}
      selectedItems={value}
      onItemSelect={onChange}
      tagRenderer={item => item}
    />

    {touched && error && <span>{error}</span>}
  </React.Fragment>
);

RenderMultiSelect.propTypes = {
  input: object.isRequired,
  meta: object.isRequired,
  disabled: bool.isRequired,
  label: string.isRequired
};

RenderMultiSelect.defaultProps = {
  input: null,
  meta: null,
  disabled: false,
  label: ""
};

export default RenderMultiSelect;
