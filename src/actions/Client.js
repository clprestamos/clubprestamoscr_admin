import _ from 'lodash';
import * as types from '../constants';
import * as service from '../service';
import * as Locales from './Locales';

export function getZipCodeInit() {
  return {
    type: types.GET_CLIENT_ZIPCODE_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}
export function getZipCodeError(error) {
  return {
    type: types.GET_CLIENT_ZIPCODE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getZipCodeSuccess(zipCode) {
  return {
    type: types.GET_CLIENT_ZIPCODE_SUCCESS,
    payload: {
      isLoading: false,
      field: 'zipCode',
      value: zipCode,
    },
  };
}
export function getZipCode() {
  return (dispatch, getState) => {
    dispatch(getZipCodeInit());
    service.get({
      endpoint: `/getZipcode/${getState().client.data.province}/${getState().client.data.canton}/${getState().client.data.district}`,
    })
      .then((response) => {
        dispatch(getZipCodeSuccess(response.body[0].zipCode));
      })
      .catch(error => dispatch(getZipCodeError(error)));
  };
}

export function clearClientInfo() {
  return {
    type: types.CLEAR_CLIENT_INFO,
  };
}

export function getClientInfoInit() {
  return {
    type: types.GET_CLIENT_INFO_INIT,
    payload: {
      isLoading: true,
      error: null,
      saveSuccess: false,
    },
  };
}

export function getClientInfoError(error) {
  return {
    type: types.GET_CLIENT_INFO_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getClientInfoSuccess(data) {
  return {
    type: types.GET_CLIENT_INFO_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getClientInfo(userId) {
  return (dispatch) => {
    dispatch(getClientInfoInit());
    try {
      service.get({
        endpoint: `/users/${userId}`,
      })
        .then((response) => {
          dispatch(Locales.getProvinces());
          dispatch(Locales.getCantons(response.body[0].province));
          dispatch(Locales.getDistricts(response.body[0].province, response.body[0].canton));
          dispatch(getClientInfoSuccess(response.body[0]));
        })
        .catch(error => dispatch(getClientInfoError(error)));
    } catch (error) {
      dispatch(getClientInfoError(error));
    }
  };
}

export function editClientProfile({ field, value }) {
  return dispatch => dispatch({
    type: types.EDIT_CLIENT_PROFILE,
    payload: {
      field,
      value,
    },
  });
}

export function saveClientInfoInit() {
  return {
    type: types.SAVE_CLIENT_PROFILE_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function saveClientInfoError(error) {
  return {
    type: types.SAVE_CLIENT_PROFILE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function saveClientInfoSuccess(data) {
  return {
    type: types.SAVE_CLIENT_PROFILE_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      saveSuccess: true,
      data,
    },
  };
}

export function saveClientInfo(userId) {
  return (dispatch, getState) => {
    dispatch(saveClientInfoInit());
    try {
      const payload = _.chain(getState().client.data)
        .pickBy(_.identity)
        .omit(['userId', 'lastUpdate'])
        .value();
      service.patch({
        endpoint: `/users/${userId}`,
        payload,
      })
        .then((response) => {
          dispatch(saveClientInfoSuccess(response.body));
          dispatch(getClientInfo(userId));
        })
        .catch(error => dispatch(saveClientInfoError(error)));
    } catch (error) {
      dispatch(saveClientInfoError(error));
    }
  };
}
