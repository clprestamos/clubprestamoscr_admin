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

export function getUserInfoInit() {
  return {
    type: types.GET_USER_INFO_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getUserInfoError(error) {
  return {
    type: types.GET_USER_INFO_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getUserInfoSuccess(data) {
  return {
    type: types.GET_USER_INFO_SUCCESS,
    payload: {
      isLoading: false,
      data,
    },
  };
}

export function editUserInfo({ field, value }) {
  return dispatch => dispatch({
    type: types.EDIT_USER_INFO,
    payload: {
      field,
      value,
    },
  });
}

export function getUserInfo(userId) {
  return (dispatch) => {
    dispatch(getUserInfoInit());
    try {
      service.get({
        endpoint: `/users/${userId}`,
      })
        .then((response) => {
          dispatch(getUserInfoSuccess(response.body[0]));
        })
        .catch(error => dispatch(getUserInfoError(error)));
    } catch (error) {
      dispatch(getUserInfoError(error));
    }
  };
}

export function saveUserInfoInit() {
  return {
    type: types.SAVE_USER_INFO_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function saveUserInfoError(error) {
  return {
    type: types.SAVE_USER_INFO_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function saveUserInfoSuccess(data) {
  return {
    type: types.SAVE_USER_INFO_SUCCESS,
    payload: {
      isLoading: false,
      data,
    },
  };
}

export function saveUserInfo(userId) {
  return (dispatch, getState) => {
    dispatch(saveUserInfoInit());
    try {
      const payload = getState().users.user.data;
      service.patch({
        endpoint: `/users/${userId}`,
        payload,
      })
        .then((response) => {
          dispatch(saveUserInfoSuccess(response.body));
          dispatch(getUserInfo(userId));
        })
        .catch(error => dispatch(saveUserInfoError(error)));
    } catch (error) {
      dispatch(saveUserInfoError(error));
    }
  };
}
