import * as types from '../constants';
import * as service from '../service';

export function contactUsInit() {
  return {
    type: types.CONTACT_US_SEND_MSG_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}
export function contactUsError(error) {
  return {
    type: types.CONTACT_US_SEND_MSG_ERROR,
    payload: {
      isLoading: false,
      error,
      sent: false,
    },
  };
}
export function contactUsSuccess() {
  return {
    type: types.CONTACT_US_SEND_MSG_SUCCESS,
    payload: {
      isLoading: false,
      sent: true,
    },
  };
}
export function clearContactUs() {
  return {
    type: types.CLEAR_CONTACT_US_SEND_MSG,
  };
}
export function sendMsgEmail({
  name,
  email,
  phone,
  subject,
  message,
}) {
  return (dispatch) => {
    dispatch(contactUsInit());
    const emailMessage = {
      message: `\nMensaje de ${name}\nTeléfono:${phone}\n${message}`,
      sender: email,
      subject,
    };
    return service.post({
      endpoint: '/sendmailto',
      payload: emailMessage,
    })
      .then((response) => {
        if (response.status === 250) {
          dispatch(contactUsSuccess());
        }
        return false;
      })
      .catch(error => dispatch(contactUsError(error)));
  };
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
