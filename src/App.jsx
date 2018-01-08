import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'react-autobind';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import Routes from './router';

import * as service from './service';
import { loginSuccess } from './actions/Login';

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      loginSuccess,
    }, dispatch);
    autobind(this);
  }
  componentWillMount() {
    const userData = service.getUserAuth();
    const { dispatch } = this.props;
    if (userData) {
      dispatch(loginSuccess(userData));
    }
  }
  render() {
    return <div><Routes /><NotificationContainer /></div>;
  }
}

export default connect()(App);
