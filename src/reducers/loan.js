import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  saveSuccess: false,
  data: {
    loanId: 0,
    amount: '',
    term: '',
    reason: '',
    stateId: 0,
    requestLoanDate: '',
    interest: 0,
    score: 0,
    approvedDate: '',
    stateName: '',
    company: '',
    name: '',
    lastName: '',
    identification: '',
    investorPercentage: 0,
    bank: '',
    clientAccount: '',
    iban: '',
  },
};

function Loan(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOAN_DATA_INIT:
    case types.GET_LOAN_DATA_ERROR:
    case types.GET_LOAN_DATA_SUCCESS:
    case types.SAVE_LOAN_DATA_INIT:
    case types.SAVE_LOAN_DATA_ERROR:
    case types.SAVE_LOAN_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.EDIT_LOAN_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
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
