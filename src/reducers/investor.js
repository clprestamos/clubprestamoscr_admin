import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  saveSuccess: false,
  data: {
    user_id: 0,
    avatar: '',
    name: '',
    lastName: '',
    identification: 0,
    cellphone: 0,
    phone: 0,
    isActive: true,
    email: '',
    bank: '',
    clientAccount: '',
    iban: '',
  },
};

function investor(state = initialState, action) {
  switch (action.type) {
    case types.GET_INVESTOR_INFO_INIT:
    case types.GET_INVESTOR_INFO_SUCCESS:
    case types.GET_INVESTOR_INFO_ERROR:
    case types.SAVE_INVESTOR_PROFILE_INIT:
    case types.SAVE_INVESTOR_PROFILE_ERROR:
    case types.SAVE_INVESTOR_PROFILE_SUCCESS:
    case types.UPLOAD_FILE_INIT:
    case types.UPLOAD_FILE_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.EDIT_INVESTOR_PROFILE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    case types.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        data: {
          ...state.data,
          avatar: action.payload.avatar,
        },
      };
    case types.CLEAR_INVESTOR_INFO:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default investor;
