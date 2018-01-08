import * as types from '../constants';

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null,
  data: null,
};

function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_INIT:
    case types.LOGIN_SUCCESS:
    case types.LOGIN_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.LOGOUT:
    case types.CLEAR_LOGIN_DATA:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default user;
