/* eslint-disable */

import includes from 'lodash/includes';
import * as service from '../service';
import {
  LOGIN_SUCCESS,
} from '../constants';
import { logout } from '../actions/Login';

export const checkSessionStatusMiddleware = store => next => action => {
  const checkSessionInActions = [
    'LOGIN_SUCCESS',
  ];
  const checkSession = includes(checkSessionInActions, action.type);
  if (checkSession) {
    const isValidToken = service.validateToken();
    if (!isValidToken) {
      window.location.replace('/logout');
      return null;
    }
  }

  return next(action);

};
