import * as types from '../constants';
import * as service from '../service';

export function getLoanInit() {
  return {
    type: types.GET_LOAN_DATA_INIT,
    payload: {
      isLoading: true,
      error: null,
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
      ...data,
    },
  };
}
export function clearLoanData() {
  return {
    type: types.CLEAR_LOAN_DATA,
  };
}
export function getLoanData() {
  return (dispatch, getState) => {
    try {
      dispatch(getLoanInit());
      const { userId } = getState().user.data;
      service.get({
        endpoint: `/getloansbyclient/${userId}`,
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
