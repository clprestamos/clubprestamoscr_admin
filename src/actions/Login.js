import * as types from '../constants';
import * as service from '../service';

export function clearLoginData() {
  return {
    type: types.CLEAR_LOGIN_DATA,
  };
}
export function loginInit() {
  return {
    type: types.LOGIN_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      isLoading: false,
      isAuth: true,
      data,
    },
  };
}
export function loginError(error) {
  return {
    type: types.LOGIN_ERROR,
    payload: {
      isLoading: false,
      isAuth: false,
      error: error.message,
    },
  };
}
export function login({ username, password }) {
  return (dispatch) => {
    dispatch(clearLoginData());
    dispatch(loginInit());
    service.post({
      endpoint: '/auth/login',
      payload: {
        email: username,
        password,
      },
    })
      .then((response) => {
        const { body } = response;
        const { results } = body;
        const { userInfo } = results;
        const { token } = results;
        const {
          name,
          lastName,
          email,
          roleId,
          userId,
          avatar,
        } = userInfo;
        if (roleId === 3) { // 3 Admin user
          const data = {
            name,
            lastName,
            email,
            roleId,
            userId,
            avatar,
          };
          service.setToken(token, data);
          dispatch(loginSuccess(data));
        } else {
          dispatch(loginError({ message: 'No está autorizado.' }));
        }
      })
      .catch((error) => {
        dispatch(loginError(error));
      });
  };
}
export function logout() {
  service.removeToken();
  return dispatch => dispatch({
    type: types.LOGOUT,
  });
}
