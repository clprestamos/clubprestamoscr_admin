import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  saveSuccess: false,
  data: {
    id: 0,
    name: '',
    lastName: '',
    identification: 0,
    cellphone: 0,
    referencePhone: 0,
    isActive: true,
    email: '',
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
