import * as types from '../constants';
import * as service from '../service';

export function forgotPasswordInit() {
  return {
    type: types.FORGOT_PASSWORD_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function forgotPasswordError(error) {
  return {
    type: types.FORGOT_PASSWORD_ERROR,
    payload: {
      isLoading: false,
      isAuth: false,
      error: error.message,
    },
  };
}
export function forgotPasswordSuccess() {
  return {
    type: types.FORGOT_PASSWORD_SUCCESS,
    payload: {
      isLoading: false,
      isSuccess: true,
    },
  };
}
export function clearForgotPassword() {
  return {
    type: types.CLEAR_FORGOT_PASSWORD,
  };
}
export function setEmail(email) {
  return dispatch => dispatch({
    type: types.SET_EMAIL_VALUE,
    payload: {
      email,
    },
  });
}
export function sendEmail(data) {
  const emailData = {
    message: `Buenas\nDe click en el siguiente link http://localhost:7070/cambiar-password/${data.passwordKey} para cambiar su contraseña.`,
    sender: data.email,
    subject: 'Club de Préstamos - Cambiar contraseña',
  };
  return service.post({
    endpoint: '/sendmailto',
    payload: emailData,
  })
    .then((response) => {
      if (response.status === 250) {
        return data;
      }
      return false;
    })
    .catch(error => error);
}
export function requestNewPassword() {
  return (dispatch, getState) => {
    dispatch(forgotPasswordInit());
    service.patch({
      endpoint: '/auth/restorepassword',
      payload: {
        email: getState().forgotPassword.email,
      },
      noAuthorization: true,
    })
      .then((response) => {
        const data = response.body.results.data[0];
        return sendEmail(data);
      })
      .then((data) => {
        if (data) {
          dispatch(forgotPasswordSuccess());
        }
      })
      .catch((error) => {
        dispatch(forgotPasswordError(error));
      });
  };
}
export function changePasswordInit() {
  return {
    type: types.CHANGE_PASSWORD_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function changePasswordSuccess() {
  return {
    type: types.CHANGE_PASSWORD_SUCCESS,
    payload: {
      isLoading: false,
      isChangeSuccess: true,
    },
  };
}
export function changePasswordError(error) {
  return {
    type: types.CHANGE_PASSWORD_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getUserIdInit() {
  return {
    type: types.GET_USER_ID_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function getUserIdSuccess(data) {
  return {
    type: types.GET_USER_ID_SUCCESS,
    payload: {
      isLoading: false,
      data,
    },
  };
}
export function getUserIdError(error) {
  return {
    type: types.GET_USER_ID_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getUserId(passwordKey) {
  return (dispatch) => {
    dispatch(getUserIdInit());
    service.get({
      endpoint: `/auth/restorepassword/${passwordKey}`,
    })
      .then((response) => {
        if (response.body.length) {
          dispatch(getUserIdSuccess(response.body[0]));
        } else {
          dispatch(getUserIdError('Token no válido o ya expiró'));
        }
      })
      .catch((error) => {
        dispatch(getUserIdError(error));
      });
  };
}
export function setNewPassword(password) {
  return dispatch => dispatch({
    type: types.SET_NEW_PASSWORD,
    payload: {
      password,
    },
  });
}
export function changeUserPassword(password) {
  return (dispatch, getState) => {
    dispatch(changePasswordInit());
    const { userId } = getState().forgotPassword.data;
    service.patch({
      endpoint: '/auth/restorepassword',
      payload: {
        userId,
        password,
      },
    })
      .then(() => {
        dispatch(changePasswordSuccess());
      })
      .catch((error) => {
        dispatch(changePasswordError(error));
      });
  };
}
