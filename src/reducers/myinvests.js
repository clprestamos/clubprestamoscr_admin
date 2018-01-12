import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  loans: [
    {
      loanId: '',
      amount: '',
      term: '',
      reason: '',
      company: '',
      stateId: '',
      requestLoanDate: '',
      userId: '',
      lastUpdate: '',
      interest: '',
      score: '',
      approvedDate: '',
      name: '',
      lastName: '',
      bank: '',
      clientAccount: '',
      identification: '',
      stateName: '',
      investorId: null,
      percentage: null,
      iban: '',
    },
  ],
  loan: {
    loanId: '',
    amount: '',
    term: '',
    reason: '',
    company: '',
    stateId: '',
    requestLoanDate: '',
    userId: '',
    lastUpdate: '',
    interest: '',
    score: '',
    approvedDate: '',
    name: '',
    lastName: '',
    bank: '',
    clientAccount: '',
    identification: '',
    stateName: '',
    investorId: null,
    percentage: null,
  },
};

function MyInvests(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOANS_MY_INVESTS_INIT:
    case types.GET_LOANS_MY_INVESTS_ERROR:
    case types.GET_LOANS_MY_INVESTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_LOANS_MY_INVESTS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default MyInvests;
