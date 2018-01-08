import * as types from '../constants';

const initialState = {
  email: '',
  error: false,
  isLoading: false,
  isSuccess: false,
  isChangeSuccess: false,
  data: null,
};

function ForgotPassword(state = initialState, action) {
  switch (action.type) {
    case types.SET_EMAIL_VALUE:
    case types.FORGOT_PASSWORD_INIT:
    case types.FORGOT_PASSWORD_SUCCESS:
    case types.FORGOT_PASSWORD_ERROR:
    case types.CHANGE_PASSWORD_INIT:
    case types.CHANGE_PASSWORD_SUCCESS:
    case types.CHANGE_PASSWORD_ERROR:
    case types.GET_USER_ID_INIT:
    case types.GET_USER_ID_SUCCESS:
    case types.GET_USER_ID_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_FORGOT_PASSWORD:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default ForgotPassword;
