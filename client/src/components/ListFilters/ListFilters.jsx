import "./ListFilters.scss";

import React, { Component } from "react";

import { GENRES } from "../../constants";
import MultiSelectFilter from "../Filters/MultiSelectFilter";
import { connect } from "react-redux";

class ListFilters extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: {},
      genres: [
        "Acoustic",
        "Alternative",
        "Bluegrass",
        "Christian/Gospel",
        "Celtic/Irish",
        "Dance/EDM",
        "Country",
        "Comedy",
        "Drum & Bass"
      ]
    };

    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.handleMultiSelectRemove = this.handleMultiSelectRemove.bind(this);
  }

  search() {
    console.log(this.state);
  }

  reset() {
    console.log(this.state);
  }

  toggleFilter(filter) {
    const open = !!this.state.isOpen[filter];
    const isOpen = Object.assign({}, this.state.isOpen, {
      [filter]: !open
    });
    this.setState({ isOpen });
  }

  // renderCheckboxArray(obj) {
  //   const filterKey = Object.keys(obj)[0];
  //   const filterValues = obj[filterKey];
  //   const filterName = filterKey.toLowerCase();
  //
  //   return (
  //     <div>
  //       <h5
  //         className="filter-header"
  //         onClick={() => this.toggleFilter(filterName)}
  //       >
  //         <Icon
  //           icon={this.state.isOpen[filterName] ? "caret-down" : "caret-right"}
  //         />{" "}
  //         {filterName}
  //       </h5>
  //       <Collapse
  //         isOpen={!!this.state.isOpen[filterName]}
  //         keepChildrenMounted={true}
  //         transitionDuration={0}
  //       >
  //         <FormSection name={filterName}>
  //           {filterValues.map((item, index) => (
  //             <Field
  //               key={index}
  //               name={filterName}
  //               component={RenderCheckbox}
  //               type="checkbox"
  //               label={item}
  //             />
  //           ))}
  //         </FormSection>
  //       </Collapse>
  //     </div>
  //   );
  // }

  renderMultiSelect(obj) {
    const filterKey = Object.keys(obj)[0];
    const filterItems = obj[filterKey];
    const filter = filterKey.toLowerCase();
    const filterValue = this.state[filter];

    return (
      <MultiSelectFilter
        items={filterItems}
        label={filter}
        value={filterValue}
        onSelect={item => this.handleMultiSelectAdd(item, filter)}
        onClear={() => this.clearMultiSelect(filter)}
        onRemove={(tag, position) =>
          this.handleMultiSelectRemove(tag, position, filter)
        }
      />
    );
  }

  handleMultiSelectAdd(item, filter) {
    const filterItems = this.state[filter];
    this.setState({ filter: filterItems.push(item) });
  }

  clearMultiSelect(filter) {
    this.setState({ [filter]: [] });
  }

  handleMultiSelectRemove(tag, position, filter) {
    this.setState(state => {
      return {
        [filter]: state[filter].filter((value, index) => {
          return index !== position;
        })
      };
    });
  }

  // <Field
  //   name="hasPhoto"
  //   component={RenderCheckbox}
  //   type="checkbox"
  //   label="has photos"
  // />
  //
  // {this.renderCheckboxArray({ GENRES })}

  render() {
    return (
      <div id="list-filters">
        <h4>Filters</h4>

        {this.renderMultiSelect({ GENRES })}

        <div className="bp3-button-group bp3-fill">
          <button
            onClick={this.search}
            className="bp3-button bp3-intent-primary"
          >
            Search
          </button>
          <button
            type="button"
            onClick={this.reset}
            className="bp3-button bp3-icon-remove"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

ListFilters = connect()(ListFilters);

export default ListFilters;
