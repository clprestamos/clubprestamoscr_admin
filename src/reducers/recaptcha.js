import * as types from '../constants';

const initialState = {
  captcha: '',
};

function Main(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_RECAPTCHA:
      return {
        ...state,
        initialState,
      };
    case types.SET_RECAPTCHA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default Main;
