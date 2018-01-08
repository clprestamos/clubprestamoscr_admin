import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  name: null,
  lastName: null,
  email: null,
  identification: null,
  cellphone: null,
  phone: null,
};

function ClientProfile(state = initialState, action) {
  switch (action.type) {
    case types.GET_INVESTOR_PROFILE_INIT:
    case types.GET_INVESTOR_PROFILE_ERROR:
    case types.GET_INVESTOR_PROFILE_SUCCESS:
    case types.SAVE_INVESTOR_PROFILE_INIT:
    case types.SAVE_INVESTOR_PROFILE_ERROR:
    case types.SAVE_INVESTOR_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.EDIT_INVESTOR_PROFILE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case types.CLEAR_INVESTOR_PROFILE:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default ClientProfile;
