import * as types from '../constants';
import * as service from '../service';

export function getProvincesInit() {
  return {
    type: types.GET_PROVINCES_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function getProvincesError(error) {
  return {
    type: types.GET_PROVINCES_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getProvincesSuccess(provinces) {
  return {
    type: types.GET_PROVINCES_SUCCESS,
    payload: {
      isLoading: false,
      provinces,
    },
  };
}
export function getProvinces() {
  return (dispatch) => {
    dispatch(getProvincesInit());
    service.get({
      endpoint: '/getProvinces',
    })
      .then((response) => {
        dispatch(getProvincesSuccess(response.body));
      })
      .catch(error => dispatch(getProvincesError(error)));
  };
}
export function getCantonsInit() {
  return {
    type: types.GET_CANTONS_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function getCantonsError(error) {
  return {
    type: types.GET_CANTONS_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getCantonsSuccess(cantons) {
  return {
    type: types.GET_CANTONS_SUCCESS,
    payload: {
      isLoading: false,
      cantons,
    },
  };
}
export function getCantons(province) {
  return (dispatch) => {
    dispatch(getCantonsInit());
    service.get({
      endpoint: `/getCantons/${province}`,
    })
      .then((response) => {
        dispatch(getCantonsSuccess(response.body));
      })
      .catch(error => dispatch(getCantonsError(error)));
  };
}
export function getDistrictsInit() {
  return {
    type: types.GET_DISTRICTS_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function getDistrictsError(error) {
  return {
    type: types.GET_DISTRICTS_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getDistrictsSuccess(districts) {
  return {
    type: types.GET_DISTRICTS_SUCCESS,
    payload: {
      isLoading: false,
      districts,
    },
  };
}
export function getDistricts(province, canton) {
  return (dispatch) => {
    dispatch(getDistrictsInit());
    service.get({
      endpoint: `/getDistricts/${province}/${canton}`,
    })
      .then((response) => {
        dispatch(getDistrictsSuccess(response.body));
      })
      .catch(error => dispatch(getDistrictsError(error)));
  };
}
