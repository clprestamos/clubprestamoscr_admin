import _ from 'lodash';
import * as types from '../constants';
import * as service from '../service';

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
      zipCode,
    },
  };
}
export function getZipCode() {
  return (dispatch, getState) => {
    dispatch(getZipCodeInit());
    service.get({
      endpoint: `/getZipcode/${getState().clientProfile.province}/${getState().clientProfile.canton}/${getState().clientProfile.district}`,
    })
      .then((response) => {
        dispatch(getZipCodeSuccess(response.body[0].zipCode));
      })
      .catch(error => dispatch(getZipCodeError(error)));
  };
}
export function getClientProfileInit() {
  return {
    type: types.GET_CLIENT_PROFILE_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}
export function getClientProfileError(error) {
  return {
    type: types.GET_CLIENT_PROFILE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getClientProfileSuccess(data) {
  return {
    type: types.GET_CLIENT_PROFILE_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      ...data,
    },
  };
}
export function clearClientProfile() {
  return {
    type: types.CLEAR_CLIENT_PROFILE,
  };
}
export function getClientProfile() {
  return (dispatch, getState) => {
    dispatch(getClientProfileInit());
    const id = getState().user.data.userId;
    service.get({
      endpoint: `/users/${id}`,
    })
      .then((response) => {
        const {
          name,
          lastName,
          email,
          nationality,
          identification,
          phone,
          cellphone,
          address,
          province,
          canton,
          district,
          zipCode,
          referencePhone,
          relativePhone,
          bank,
          clientAccount,
          iban,
        } = response.body[0];
        dispatch(getClientProfileSuccess({
          name,
          lastName,
          email,
          nationality,
          identification,
          phone,
          cellphone,
          address,
          province,
          canton,
          district,
          zipCode,
          referencePhone,
          relativePhone,
          bank,
          clientAccount,
          iban,
        }));
      })
      .catch(error => dispatch(getClientProfileError(error)));
  };
}
export function editClientProfile({ field, value }) {
  return {
    type: types.EDIT_CLIENT_PROFILE,
    payload: {
      field,
      value,
    },
  };
}
export function saveClientProfileInit() {
  return {
    type: types.SAVE_CLIENT_PROFILE_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}
export function saveClientProfileError(error) {
  return {
    type: types.SAVE_CLIENT_PROFILE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function saveClientProfileSuccess(data) {
  return {
    type: types.SAVE_CLIENT_PROFILE_SUCCESS,
    payload: {
      isLoading: false,
      ...data,
    },
  };
}
export function saveClientProfile() {
  return (dispatch, getState) => {
    dispatch(saveClientProfileInit());
    const {
      name,
      lastName,
      email,
      nationality,
      identification,
      cellphone,
      address,
      province,
      canton,
      district,
      zipCode,
      referencePhone,
      relativePhone,
      bank,
      clientAccount,
      iban,
    } = getState().clientProfile;
    let payload = {
      name,
      lastName,
      email,
      nationality,
      identification,
      cellphone,
      address,
      province,
      canton,
      district,
      zipCode,
      referencePhone,
      relativePhone,
      bank,
      clientAccount,
      iban,
    };
    payload = _.pickBy(payload, _.identity);
    const { userId } = getState().user.data;
    service.patch({
      endpoint: `/users/${userId}`,
      payload,
    })
      .then((response) => {
        dispatch(saveClientProfileSuccess(response.body));
      })
      .catch(error => dispatch(saveClientProfileError(error)));
  };
}
// Inversionista
export function getInvestorProfileInit() {
  return {
    type: types.GET_INVESTOR_PROFILE_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}
export function getInvestorProfileError(error) {
  return {
    type: types.GET_INVESTOR_PROFILE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getInvestorProfileSuccess(data) {
  return {
    type: types.GET_INVESTOR_PROFILE_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      ...data,
    },
  };
}
export function clearInvestorProfile() {
  return {
    type: types.CLEAR_INVESTOR_PROFILE,
  };
}
export function getInvestorProfile() {
  return (dispatch, getState) => {
    dispatch(getInvestorProfileInit());
    const id = getState().user.data.userId;
    service.get({
      endpoint: `/users/${id}`,
    })
      .then((response) => {
        const {
          name,
          lastName,
          email,
          identification,
          cellphone,
          phone,
        } = response.body[0];
        dispatch(getInvestorProfileSuccess({
          name,
          lastName,
          email,
          identification,
          cellphone,
          phone,
        }));
      })
      .catch(error => dispatch(getInvestorProfileError(error)));
  };
}
export function editInvestorProfile({ field, value }) {
  return {
    type: types.EDIT_INVESTOR_PROFILE,
    payload: {
      field,
      value,
    },
  };
}
export function saveInvestorProfileInit() {
  return {
    type: types.SAVE_INVESTOR_PROFILE_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}
export function saveInvestorProfileError(error) {
  return {
    type: types.SAVE_INVESTOR_PROFILE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function saveInvestorProfileSuccess(data) {
  return {
    type: types.SAVE_INVESTOR_PROFILE_SUCCESS,
    payload: {
      isLoading: false,
      ...data,
    },
  };
}
export function saveInvestorProfile() {
  return (dispatch, getState) => {
    dispatch(saveInvestorProfileInit());
    const {
      name,
      lastName,
      email,
      identification,
      cellphone,
      phone,
    } = getState().investorProfile;
    let payload = {
      name,
      lastName,
      email,
      identification,
      cellphone,
      phone,
    };
    payload = _.pickBy(payload, _.identity);
    const { userId } = getState().user.data;
    service.patch({
      endpoint: `/users/${userId}`,
      payload,
    })
      .then((response) => {
        dispatch(saveInvestorProfileSuccess(response.body));
      })
      .catch(error => dispatch(saveInvestorProfileError(error)));
  };
}
