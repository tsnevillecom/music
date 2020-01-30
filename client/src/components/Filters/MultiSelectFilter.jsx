import { Button, Checkbox, Colors, Icon, MenuItem } from "@blueprintjs/core";
import React, { Component } from "react";
import { array, bool, func, string } from "prop-types";

import { MultiSelect } from "@blueprintjs/select";
import { difference } from "underscore";

const MultiSelectFilter = ({
  items,
  label,
  value,
  disabled,
  onSelect,
  onClear,
  onRemove
}) => (
  <div className="filter">
    <h5 className="filter-header">{label}</h5>
    <MultiSelect
      fill={true}
      items={difference(items, value)}
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
        onRemove: (tag, position) => onRemove(tag, position),
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
      onItemSelect={onSelect}
      tagRenderer={item => item}
    />
  </div>
);

MultiSelectFilter.propTypes = {
  items: array.isRequired,
  value: array.isRequired,
  label: string.isRequired,
  disabled: bool.isRequired,
  onChange: func.isRequired,
  onClear: func.isRequired,
  onRemove: func.isRequired
};

MultiSelectFilter.defaultProps = {
  items: [],
  label: "",
  disabled: false,
  value: [],
  onChange: () => {},
  onClear: () => {},
  onRemove: () => {}
};

export default MultiSelectFilter;
