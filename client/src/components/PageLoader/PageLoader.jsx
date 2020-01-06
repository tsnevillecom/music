import React, { Component } from 'react';
import { times } from 'underscore';
import './PageLoader.scss';

class PageLoader extends Component {
  render() {
    return (
      <div id="pageLoader">
        <div className="bars">
          {times(10, n => <div key={n} className="bar" />)}
        </div>
        <div className="loading">Loading</div>
      </div>
    );
  }
}

export default PageLoader;
