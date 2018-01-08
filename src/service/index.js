import request from 'superagent';
import jwtDecode from 'jwt-decode';

const { REACT_APP_API_URL } = process.env;

export function removeToken() {
  window.sessionStorage.clear();
}
export function setToken(token, userData) {
  const currentToken = window.sessionStorage.getItem('token');
  if (!currentToken) {
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('userData', JSON.stringify(userData));
  }
}
export function validateToken() {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    if (new Date(decodedToken.exp * 1000) > new Date()) {
      return decodedToken;
    }
    removeToken();
  }
  return false;
}
export function getToken() {
  const token = window.sessionStorage.getItem('token');
  return token;
}
export function getUserAuth() {
  const userData = window.sessionStorage.getItem('userData');
  return JSON.parse(userData);
}
export function post({
  endpoint,
  payload,
  requiredToken,
}) {
  const authorization = getToken();
  return new Promise((resolve, reject) => {
    if (requiredToken) {
      try {
        const isTokenValid = validateToken();
        if (isTokenValid) {
          request.post(`${REACT_APP_API_URL}${endpoint}`)
            .send(payload)
            .set({ authorization })
            .then((response) => {
              resolve(response);
            })
            .catch(err => reject(err));
        } else {
          reject(new Error('Token expiró'));
        }
      } catch (err) {
        reject(err);
      }
    } else {
      request.post(`${REACT_APP_API_URL}${endpoint}`)
        .send(payload)
        .then((response) => {
          resolve(response);
        })
        .catch(err => reject(err));
    }
  });
}
export function get({
  endpoint,
}) {
  const authorization = getToken();
  return new Promise((resolve, reject) => {
    request.get(`${REACT_APP_API_URL}${endpoint}`)
      .set({ authorization })
      .then((response) => {
        resolve(response);
      })
      .catch(err => reject(err));
  });
}
export function patch({
  endpoint,
  payload,
  noAuthorization,
}) {
  const authorization = getToken();
  return new Promise((resolve, reject) => {
    if (noAuthorization) {
      request.patch(`${REACT_APP_API_URL}${endpoint}`)
        .send(payload)
        .then((response) => {
          resolve(response);
        })
        .catch(err => reject(err));
    } else {
      request.patch(`${REACT_APP_API_URL}${endpoint}`)
        .send(payload)
        .set({ authorization })
        .then((response) => {
          resolve(response);
        })
        .catch(err => reject(err));
    }
  });
}
