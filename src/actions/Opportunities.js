import _ from 'lodash';
import * as types from '../constants';
import * as service from '../service';

export function getLoansByInvestorInit() {
  return {
    type: types.GET_LOANS_BY_INVESTOR_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getLoansByInvestorError(error) {
  return {
    type: types.GET_LOANS_BY_INVESTOR_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getLoansByInvestorSuccess(loansByInvestor) {
  return {
    type: types.GET_LOANS_BY_INVESTOR_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      loansByInvestor,
    },
  };
}

export function getLoansByInvestor(loanId) {
  return (dispatch) => {
    try {
      dispatch(getLoansByInvestorInit());
      service.get({
        endpoint: `/getloansbyinvestor/${loanId}`,
      })
        .then((response) => {
          dispatch(getLoansByInvestorSuccess(response.body));
        })
        .catch(error => dispatch(getLoansByInvestorError(error)));
    } catch (error) {
      dispatch(getLoansByInvestorError(error));
    }
  };
}

export function getLoanOpportunityInit() {
  return {
    type: types.GET_LOAN_OPPORTUNITY_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getLoanOpportunityError(error) {
  return {
    type: types.GET_LOAN_OPPORTUNITY_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getLoanOpportunitySuccess(loan) {
  return {
    type: types.GET_LOAN_OPPORTUNITY_SUCCESS,
    payload: {
      isLoading: false,
      loan,
    },
  };
}

export function clearLoanOpportunity() {
  return {
    type: types.CLEAR_LOAN_OPPORTUNITY,
  };
}

export function setInvestors(investors) {
  return {
    type: types.SET_INVESTORS,
    payload: {
      investors,
    },
  };
}

export function setPercentageInverted(percentage) {
  return {
    type: types.SET_PERCENTAGE_INVERTED,
    payload: {
      percentage,
    },
  };
}

export function getLoanOpportunity(loanId) {
  return (dispatch) => {
    try {
      dispatch(getLoanOpportunityInit());
      service.get({
        endpoint: `/loans/${loanId}`,
      })
        .then((response) => {
          dispatch(getLoanOpportunitySuccess(response.body[0]));
          if (response.body[0].investorId) {
            dispatch(setInvestors(response.body.length));
          }
          const percentages = _.map(response.body, loan => loan.percentage);
          dispatch(setPercentageInverted(_.sum(percentages)));
        })
        .catch(error => getLoanOpportunityError(error));
    } catch (error) {
      dispatch(getLoanOpportunityError(error));
    }
  };
}

export function saveInvestInit() {
  return {
    type: types.SAVE_INVEST_OPPORTUNITY_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function saveInvestError(error) {
  return {
    type: types.SAVE_INVEST_OPPORTUNITY_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function saveInvestSuccess() {
  return {
    type: types.SAVE_INVEST_OPPORTUNITY_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
    },
  };
}

export function saveInvest({ loanId, investorId, percentage }) {
  return (dispatch, getState) => {
    try {
      dispatch(saveInvestInit());
      const isInvestor = _.find(getState().opportunities.loansByInvestor, { loanId, investorId });
      if (isInvestor) {
        service.patch({
          endpoint: `/getloansbyinvestor/${isInvestor.id}`,
          payload: {
            percentage: isInvestor.percentage + percentage,
          },
        })
          .then((response) => {
            if (response.status === 202) {
              dispatch(saveInvestSuccess());
              dispatch(getLoanOpportunity(loanId));
              dispatch(getLoansByInvestor(loanId));
            }
          })
          .catch(error => dispatch(saveInvestError(error)));
      } else {
        service.post({
          endpoint: '/assigninvestorloan',
          payload: {
            loanId,
            investorId,
            percentage,
          },
          requiredToken: true,
        })
          .then((response) => {
            if (response.status === 201) {
              dispatch(saveInvestSuccess());
              dispatch(getLoanOpportunity(loanId));
              dispatch(getLoansByInvestor(loanId));
            }
          })
          .catch(error => dispatch(saveInvestError(error)));
      }
    } catch (error) {
      dispatch(saveInvestError(error));
    }
  };
}

export function getOpportunitiesInit() {
  return {
    type: types.GET_OPPORTUNITIES_DATA_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function getOpportunitiesError(error) {
  return {
    type: types.GET_OPPORTUNITIES_DATA_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getOpportunitiesSuccess(loans) {
  return {
    type: types.GET_OPPORTUNITIES_DATA_SUCCESS,
    payload: {
      isLoading: false,
      loans,
    },
  };
}

export function getOpportunities() {
  return (dispatch) => {
    try {
      dispatch(getOpportunitiesInit());
      service.get({
        endpoint: '/loans',
      })
        .then((response) => {
          dispatch(getOpportunitiesSuccess(response.body.results));
        })
        .catch(error => dispatch(getOpportunitiesError(error)));
    } catch (error) {
      dispatch(getOpportunitiesError(error));
    }
  };
}
