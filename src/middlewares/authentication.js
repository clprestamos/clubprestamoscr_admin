/* eslint-disable */

import includes from 'lodash/includes';
import * as service from '../service';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  GET_ALL_USERS_INIT,
  GET_ALL_CLIENTS_INIT,
  GET_ALL_INVESTORS_INIT,
  GET_ALL_LOANS_INIT,
  GET_INVESTOR_INFO_INIT,
  SAVE_INVESTOR_PROFILE_INIT,
  GET_CLIENT_ZIPCODE_INIT,
  GET_CLIENT_INFO_INIT,
  GET_LOAN_DATA_INIT,
} from '../constants';
import { logout } from '../actions/Login';

export const checkSessionStatusMiddleware = store => next => action => {
  const checkSessionInActions = [
    'LOGIN_SUCCESS',
    'GET_ALL_USERS_INIT',
    'GET_ALL_CLIENTS_INIT',
    'GET_ALL_INVESTORS_INIT',
    'GET_ALL_LOANS_INIT',
    'GET_INVESTOR_INFO_INIT',
    'SAVE_INVESTOR_PROFILE_INIT',
    'GET_CLIENT_ZIPCODE_INIT',
    'GET_CLIENT_INFO_INIT',
    'GET_LOAN_DATA_INIT',
  ];
  const checkSession = includes(checkSessionInActions, action.type);
  if (checkSession) {
    const isValidToken = service.validateToken();
    if (!isValidToken) {
      return next({
        type: LOGOUT,
      });
    }
  }

  return next(action);

};
