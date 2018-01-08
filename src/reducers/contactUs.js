import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  sent: false,
};

function ContactUs(state = initialState, action) {
  switch (action.type) {
    case types.CONTACT_US_SEND_MSG_INIT:
    case types.CONTACT_US_SEND_MSG_ERROR:
    case types.CONTACT_US_SEND_MSG_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_CONTACT_US_SEND_MSG:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default ContactUs;
