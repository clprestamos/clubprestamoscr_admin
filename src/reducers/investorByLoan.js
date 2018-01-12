import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

function investorByLoan(state = initialState, action) {
  switch (action.type) {
    case types.GET_INVESTOR_BY_LOAN_INIT:
    case types.GET_INVESTOR_BY_LOAN_SUCCESS:
    case types.GET_INVESTOR_BY_LOAN_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default investorByLoan;
