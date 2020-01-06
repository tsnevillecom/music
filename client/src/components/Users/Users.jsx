import React, { Component } from 'react';
import './Users.scss';

class Users extends Component {
  constructor() {
    super();
    this.state = {};
  }

  renderUsers() {
    const { users } = this.props;
    return users.map((user, index) => {
      <div key={index}>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.userName}</p>
        <p>{user.email}</p>
      </div>;
    });
  }

  render() {
    return <div>{this.renderUsers()}</div>;
  }
}

export default Users;
