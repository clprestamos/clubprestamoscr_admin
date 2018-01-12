import * as types from '../constants';
import * as service from '../service';

export function getLoansByClientInit() {
  return {
    type: types.GET_LOANS_BY_CLIENT_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getLoansByClientError(error) {
  return {
    type: types.GET_LOANS_BY_CLIENT_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getLoansByClientSuccess(data) {
  return {
    type: types.GET_LOANS_BY_CLIENT_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getLoansByClient(userId) {
  return (dispatch) => {
    dispatch(getLoansByClientInit());
    try {
      service.get({
        endpoint: `/getloansbyclient/${userId}`,
      })
        .then((response) => {
          dispatch(getLoansByClientSuccess(response.body));
        })
        .catch(error => dispatch(getLoansByClientError(error)));
    } catch (error) {
      dispatch(getLoansByClientError(error));
    }
  };
}
