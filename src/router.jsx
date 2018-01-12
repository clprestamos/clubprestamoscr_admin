import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Main from './containers/Main';
import Login from './containers/Login';
import Logout from './containers/Logout';
import ChangePassword from './containers/ChangePassword';
import NotFound from './containers/NotFound';

let isAuthenticated = false;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    isAuthenticated ? (
      <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
);
const Routes = (props) => {
  isAuthenticated = props.isAuth;
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/dashboard/:section?/:id?" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/cambiar-password/:passwordKey" component={ChangePassword} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({
  routing: state.routing,
  isAuth: state.user.isAuth,
  logout: state.user.logout,
});

export default connect(mapStateToProps)(Routes);
