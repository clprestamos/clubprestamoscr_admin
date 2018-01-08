import * as types from '../constants';
import * as service from '../service';

export function getMyInvestsInit() {
  return {
    type: types.GET_LOANS_MY_INVESTS_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}
export function getMyInvestsError(error) {
  return {
    type: types.GET_LOANS_MY_INVESTS_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getMyInvestsSuccess(loans) {
  return {
    type: types.GET_LOANS_MY_INVESTS_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      loans,
    },
  };
}
export function clearLoansMyInvests() {
  return {
    type: types.CLEAR_LOANS_MY_INVESTS,
  };
}
export function getMyInvests(investorId) {
  return (dispatch) => {
    try {
      dispatch(getMyInvestsInit());
      service.get({
        endpoint: `/getmyinvests/${investorId}`,
      })
        .then((response) => {
          dispatch(getMyInvestsSuccess(response.body));
        })
        .catch(error => dispatch(getMyInvestsError(error)));
    } catch (error) {
      dispatch(getMyInvestsError(error));
    }
  };
}
