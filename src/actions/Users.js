import * as types from '../constants';
import * as service from '../service';

export function clearAllInvestors() {
  return {
    type: types.CLEAR_ALL_USERS,
  };
}

export function getAllUsersInit() {
  return {
    type: types.GET_ALL_USERS_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getAllUsersError(error) {
  return {
    type: types.GET_ALL_USERS_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getAllUsersSuccess(data) {
  return {
    type: types.GET_ALL_USERS_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getAllUsers() {
  return (dispatch) => {
    dispatch(getAllUsersInit());
    try {
      service.get({
        endpoint: '/users',
      })
        .then((response) => {
          dispatch(getAllUsersSuccess(response.body.results));
        })
        .catch(error => dispatch(getAllUsersError(error)));
    } catch (error) {
      dispatch(getAllUsersError(error));
    }
  };
}
