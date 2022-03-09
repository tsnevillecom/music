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
          <div id="page-header">
            <h2>{header}</h2>
            <div id="search" className="bp3-input-group bp3-large">
              <span className="bp3-icon bp3-icon-search"></span>
              <input
                className="bp3-input bp3-round"
                type="text"
                placeholder="Search input"
                dir="auto"
              />
              <div className="bp3-input-action">
                <div className="bp3-select bp3-minimal">
                  <select defaultValue="2">
                    <option value="all">All</option>
                    <option value="1">People</option>
                    <option value="2">Bands</option>
                    <option value="3">Venue</option>
                    <option value="4">Classified</option>
                  </select>
                </div>
                <button className="bp3-button bp3-minimal" id="search-btn">
                  <span className="bp3-icon-standard bp3-icon-arrow-right"></span>
                </button>
              </div>
            </div>
            <div
              className="bp3-button-group bp3-minimal"
              style={{ float: "right" }}
            >
              <button
                onClick={() => this.setViewType("grid")}
                className={`bp3-button bp3-icon-grid-view ${
                  view === "grid" ? "bp3-active" : ""
                }`}
              ></button>
              <button
                onClick={() => this.setViewType("table")}
                className={`bp3-button bp3-icon-list ${
                  view === "table" ? "bp3-active" : ""
                }`}
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
