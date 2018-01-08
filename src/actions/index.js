import * as types from '../constants';

export function loadingInit() {
  return dispatch => dispatch({
    type: types.LOADING_INIT,
    payload: {
      isLoading: true,
    },
  });
}

export function loadingSuccess() {
  return dispatch => dispatch({
    type: types.LOADING_INIT,
    payload: {
      isLoading: false,
    },
  });
}
