import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

function loans(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_LOANS_INIT:
    case types.GET_ALL_LOANS_SUCCESS:
    case types.GET_ALL_LOANS_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_ALL_LOANS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default loans;
