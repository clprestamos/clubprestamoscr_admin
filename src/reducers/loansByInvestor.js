import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

function loansByInvestor(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOANS_BY_INVESTOR_INIT:
    case types.GET_LOANS_BY_INVESTOR_SUCCESS:
    case types.GET_LOANS_BY_INVESTOR_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default loansByInvestor;
