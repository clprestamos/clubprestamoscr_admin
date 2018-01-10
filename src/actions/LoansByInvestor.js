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

export function getLoansByInvestorSuccess(data) {
  return {
    type: types.GET_LOANS_BY_INVESTOR_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getLoansByInvestor(userId) {
  return (dispatch) => {
    dispatch(getLoansByInvestorInit());
    try {
      service.get({
        endpoint: !userId ? '/getloansbyinvestor' : `/getloansbyinvestor/${userId}`,
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
