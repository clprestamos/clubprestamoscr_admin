import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  provinces: null,
  cantons: null,
  distrits: null,
};

function Locales(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROVINCES_INIT:
    case types.GET_PROVINCES_ERROR:
    case types.GET_PROVINCES_SUCCESS:
    case types.GET_CANTONS_INIT:
    case types.GET_CANTONS_ERROR:
    case types.GET_CANTONS_SUCCESS:
    case types.GET_DISTRICTS_INIT:
    case types.GET_DISTRICTS_ERROR:
    case types.GET_DISTRICTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default Locales;
