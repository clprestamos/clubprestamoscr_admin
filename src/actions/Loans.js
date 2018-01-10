import * as types from '../constants';
import * as service from '../service';

export function clearAllLoans() {
  return {
    type: types.CLEAR_ALL_LOANS,
  };
}

export function getAllLoansInit() {
  return {
    type: types.GET_ALL_LOANS_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getAllLoansError(error) {
  return {
    type: types.GET_ALL_LOANS_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getAllLoansSuccess(data) {
  return {
    type: types.GET_ALL_LOANS_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getAllLoans() {
  return (dispatch) => {
    dispatch(getAllLoansInit());
    try {
      service.get({
        endpoint: '/loans',
      })
        .then((response) => {
          dispatch(getAllLoansSuccess(response.body.results));
        })
        .catch(error => dispatch(getAllLoansError(error)));
    } catch (error) {
      dispatch(getAllLoansError(error));
    }
  };
}
