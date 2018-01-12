import reverse from 'lodash/reverse';
import * as types from '../constants';
import * as service from '../service';

export function clearAllInvestors() {
  return {
    type: types.CLEAR_ALL_INVESTORS,
  };
}

export function getAllInvestorsInit() {
  return {
    type: types.GET_ALL_INVESTORS_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getAllInvestorsError(error) {
  return {
    type: types.GET_ALL_INVESTORS_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getAllInvestorsSuccess(data) {
  return {
    type: types.GET_ALL_INVESTORS_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getAllInvestors() {
  return (dispatch) => {
    dispatch(getAllInvestorsInit());
    try {
      service.get({
        endpoint: '/investors',
      })
        .then((response) => {
          dispatch(getAllInvestorsSuccess(reverse(response.body.results)));
        })
        .catch(error => dispatch(getAllInvestorsError(error)));
    } catch (error) {
      dispatch(getAllInvestorsError(error));
    }
  };
}
