import "./List.scss";

import React, { Component } from "react";

import ListFilters from "../ListFilters/ListFilters";

function List(WrappedComponent, header) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        view: "grid" //table, grid
      };
    }

    setViewType(view) {
      this.setState({ view });
    }

    render() {
      const { view } = this.state;

      return (
        <React.Fragment>
          <div id="list-header">
            <h2>{header}</h2>
            <div id="list-search" className="bp3-input-group bp3-large">
              <span className="bp3-icon bp3-icon-search"></span>
              <input
                className="bp3-input"
                type="search"
                placeholder="Search input"
                dir="auto"
              />
            </div>
            <div className="bp3-button-group" style={{ float: "right" }}>
              <button
                onClick={() => this.setViewType("grid")}
                className={`bp3-button bp3-icon-grid-view ${
                  view === "grid" ? "bp3-active" : ""
                }`}
                tabIndex="0"
                role="button"
              ></button>
              <button
                onClick={() => this.setViewType("table")}
                className={`bp3-button bp3-icon-list ${
                  view === "table" ? "bp3-active" : ""
                }`}
                tabIndex="0"
                role="button"
              ></button>
            </div>
          </div>
          <div id="list">
            <ListFilters />
            <div className={`list-${view}`}>
              <WrappedComponent data={this.state} {...this.props} />
            </div>
          </div>
        </React.Fragment>
      );
    }
  };
}

export default List;
