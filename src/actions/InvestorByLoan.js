import * as types from '../constants';
import * as service from '../service';

export function getInvestorByLoanInit() {
  return {
    type: types.GET_INVESTOR_BY_LOAN_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getInvestorByLoanError(error) {
  return {
    type: types.GET_INVESTOR_BY_LOAN_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getInvestorByLoanSuccess(data) {
  return {
    type: types.GET_INVESTOR_BY_LOAN_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getInvestorByLoan(loanId) {
  return (dispatch) => {
    dispatch(getInvestorByLoanInit());
    try {
      service.get({
        endpoint: `/getinvestorbyloan/${loanId}`,
      })
        .then((response) => {
          dispatch(getInvestorByLoanSuccess(response.body));
        })
        .catch(error => dispatch(getInvestorByLoanError(error)));
    } catch (error) {
      dispatch(getInvestorByLoanError(error));
    }
  };
}
