import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      const instance = axios.create();
      instance.defaults.headers.common['Authorization'] = Cookies.get('token');
      instance.get('/checkToken').then(res => {
          console.log(res);
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            console.log(res);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) return null;
      if (redirect) return <Redirect to="/login" />;
      return <ComponentToProtect {...this.props} />;
    }
  }
}
