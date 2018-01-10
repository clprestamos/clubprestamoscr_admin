import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  saveSuccess: false,
  data: {
    userId: 0,
    name: '',
    lastName: '',
    identification: '',
    nationality: '',
    phone: '',
    referencePhone: '',
    email: '',
    address: '',
    province: '',
    canton: '',
    district: '',
    zipCode: 0,
    relativePhone: '',
    cellphone: '',
    facebook: '',
    twitter: '',
    signupDate: '',
    isActive: true,
    roleId: 0,
    lastUpdate: '',
  },
};

function client(state = initialState, action) {
  switch (action.type) {
    case types.GET_CLIENT_INFO_INIT:
    case types.GET_CLIENT_INFO_SUCCESS:
    case types.GET_CLIENT_INFO_ERROR:
    case types.SAVE_CLIENT_PROFILE_INIT:
    case types.SAVE_CLIENT_PROFILE_ERROR:
    case types.SAVE_CLIENT_PROFILE_SUCCESS:
    case types.GET_CLIENT_ZIPCODE_INIT:
    case types.GET_CLIENT_ZIPCODE_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.EDIT_CLIENT_PROFILE:
    case types.GET_CLIENT_ZIPCODE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    case types.CLEAR_CLIENT_INFO:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default client;
