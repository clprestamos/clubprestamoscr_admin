import _ from 'lodash';
import * as types from '../constants';
import * as service from '../service';

export function getLoanInit() {
  return {
    type: types.GET_LOAN_DATA_INIT,
    payload: {
      isLoading: true,
      error: null,
      saveSuccess: false,
    },
  };
}
export function getLoanError(error) {
  return {
    type: types.GET_LOAN_DATA_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getLoanSuccess(data) {
  return {
    type: types.GET_LOAN_DATA_SUCCESS,
    payload: {
      isLoading: false,
      data,
    },
  };
}
export function clearLoanData() {
  return {
    type: types.CLEAR_LOAN_DATA,
  };
}
export function getLoanData(loanId) {
  return (dispatch) => {
    try {
      dispatch(getLoanInit());
      service.get({
        endpoint: `/loans/${loanId}`,
      })
        .then((response) => {
          dispatch(getLoanSuccess(response.body[0]));
        })
        .catch(error => dispatch(getLoanError(error)));
    } catch (error) {
      dispatch(getLoanError(error));
    }
  };
}
export function saveLoanInit() {
  return {
    type: types.SAVE_LOAN_DATA_INIT,
    payload: {
      isLoading: true,
      error: null,
      saveSuccess: false,
    },
  };
}
export function saveLoanError(error) {
  return {
    type: types.SAVE_LOAN_DATA_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function saveLoanSuccess(data) {
  return {
    type: types.SAVE_LOAN_DATA_SUCCESS,
    payload: {
      isLoading: false,
      saveSuccess: true,
      ...data,
    },
  };
}
export function saveLoan(loanId) {
  return (dispatch, getState) => {
    dispatch(saveLoanInit());
    try {
      let payload = _.chain(getState().loan.data)
        .pickBy(_.identity)
        .omit(['name', 'lastName', 'identification', 'stateName', 'investorId', 'percentage', 'loanId', 'bank', 'clientAccount', 'iban'])
        .value();
      if (getState().loan.data.stateId === 3) {
        payload = {
          ...payload,
          approvedDate: new Date(),
        };
      }
      service.patch({
        endpoint: `/loans/${loanId}`,
        payload,
      })
        .then((response) => {
          dispatch(saveLoanSuccess(response.body));
          dispatch(getLoanData(loanId));
        })
        .catch(error => dispatch(saveLoanError(error)));
    } catch (error) {
      dispatch(saveLoanError(error));
    }
  };
}
export function editLoanData({ field, value }) {
  return dispatch => dispatch({
    type: types.EDIT_LOAN_DATA,
    payload: {
      field,
      value,
    },
  });
}
