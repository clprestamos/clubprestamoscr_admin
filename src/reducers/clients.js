import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

function investors(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_CLIENTS_INIT:
    case types.GET_ALL_CLIENTS_SUCCESS:
    case types.GET_ALL_CLIENTS_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_ALL_CLIENTS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default investors;
