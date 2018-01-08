import * as types from '../constants';

export function setRecaptchaValue(captcha) {
  return dispatch => dispatch({
    type: types.SET_RECAPTCHA,
    payload: {
      captcha,
    },
  });
}

export function clearRecaptchaValue() {
  return dispatch => dispatch({
    type: types.CLEAR_RECAPTCHA,
  });
}
