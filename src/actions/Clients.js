import * as types from '../constants';
import * as service from '../service';

export function clearAllClients() {
  return {
    type: types.CLEAR_ALL_CLIENTS,
  };
}

export function getAllClientsInit() {
  return {
    type: types.GET_ALL_CLIENTS_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getAllClientsError(error) {
  return {
    type: types.GET_ALL_CLIENTS_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getAllClientsSuccess(data) {
  return {
    type: types.GET_ALL_CLIENTS_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getAllClients() {
  return (dispatch) => {
    dispatch(getAllClientsInit());
    try {
      service.get({
        endpoint: '/clients',
      })
        .then((response) => {
          dispatch(getAllClientsSuccess(response.body.results));
        })
        .catch(error => dispatch(getAllClientsError(error)));
    } catch (error) {
      dispatch(getAllClientsError(error));
    }
  };
}
