import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h2>Profile</h2>
        {user && (
          <React.Fragment>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.userName}</p>
            <p>{user.email}</p>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(Profile);
