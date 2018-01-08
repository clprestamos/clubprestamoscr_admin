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
  loansByInvestor: [],
};

function Opportunities(state = initialState, action) {
  switch (action.type) {
    case types.GET_OPPORTUNITIES_DATA_INIT:
    case types.GET_OPPORTUNITIES_DATA_ERROR:
    case types.GET_OPPORTUNITIES_DATA_SUCCESS:
    case types.GET_LOAN_OPPORTUNITY_INIT:
    case types.GET_LOAN_OPPORTUNITY_ERROR:
    case types.GET_LOAN_OPPORTUNITY_SUCCESS:
    case types.SAVE_INVEST_OPPORTUNITY_INIT:
    case types.SAVE_INVEST_OPPORTUNITY_ERROR:
    case types.SAVE_INVEST_OPPORTUNITY_SUCCESS:
    case types.GET_LOANS_BY_INVESTOR_INIT:
    case types.GET_LOANS_BY_INVESTOR_ERROR:
    case types.GET_LOANS_BY_INVESTOR_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.CLEAR_OPPORTUNITIES_DATA:
      return {
        ...state,
        loans: initialState.loans,
      };
    case types.CLEAR_LOAN_OPPORTUNITY:
      return {
        ...state,
        loan: initialState.loan,
      };
    case types.SET_INVESTORS: {
      return {
        ...state,
        loan: {
          ...state.loan,
          ...action.payload,
        },
      };
    }
    case types.SET_PERCENTAGE_INVERTED: {
      return {
        ...state,
        loan: {
          ...state.loan,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export default Opportunities;
