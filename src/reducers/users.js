import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

function users(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_USERS_INIT:
    case types.GET_ALL_USERS_SUCCESS:
    case types.GET_ALL_USERS_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_ALL_USERS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default users;
