import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  id: null,
  amount: null,
  term: null,
  reason: null,
  stateId: null,
  requestLoanDate: null,
  lastUpdate: null,
  interest: null,
  score: null,
  approvedDate: null,
  stateName: null,
  name: null,
  lastName: null,
};

function Loan(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOAN_DATA_INIT:
    case types.GET_LOAN_DATA_ERROR:
    case types.GET_LOAN_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_LOAN_DATA:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default Loan;
