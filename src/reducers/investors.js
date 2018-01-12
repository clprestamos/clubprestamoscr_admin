import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

function investors(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_INVESTORS_INIT:
    case types.GET_ALL_INVESTORS_SUCCESS:
    case types.GET_ALL_INVESTORS_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_ALL_INVESTORS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default investors;
