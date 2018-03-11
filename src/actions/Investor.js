import _ from 'lodash';
import * as types from '../constants';
import * as service from '../service';

export function clearInvestorInfo() {
  return {
    type: types.CLEAR_INVESTOR_INFO,
  };
}

export function getInvestorInfoInit() {
  return {
    type: types.GET_INVESTOR_INFO_INIT,
    payload: {
      isLoading: true,
      error: null,
      saveSuccess: false,
    },
  };
}

export function getInvestorInfoError(error) {
  return {
    type: types.GET_INVESTOR_INFO_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function getInvestorInfoSuccess(data) {
  return {
    type: types.GET_INVESTOR_INFO_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      data,
    },
  };
}

export function getInvestorInfo(userId) {
  return (dispatch) => {
    dispatch(getInvestorInfoInit());
    try {
      service.get({
        endpoint: `/investors/${userId}`,
      })
        .then((response) => {
          dispatch(getInvestorInfoSuccess(response.body[0]));
        })
        .catch(error => dispatch(getInvestorInfoError(error)));
    } catch (error) {
      dispatch(getInvestorInfoError(error));
    }
  };
}

export function editInvestorProfile({ field, value }) {
  return dispatch => dispatch({
    type: types.EDIT_INVESTOR_PROFILE,
    payload: {
      field,
      value,
    },
  });
}

export function saveInvestorInfoInit() {
  return {
    type: types.SAVE_INVESTOR_PROFILE_INIT,
    payload: {
      isLoading: true,
      error: null,
    },
  };
}

export function saveInvestorInfoError(error) {
  return {
    type: types.SAVE_INVESTOR_PROFILE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}

export function saveInvestorInfoSuccess(data) {
  return {
    type: types.SAVE_INVESTOR_PROFILE_SUCCESS,
    payload: {
      isLoading: false,
      error: null,
      saveSuccess: true,
      data,
    },
  };
}

export function saveInvestorInfo(userId) {
  return (dispatch, getState) => {
    dispatch(saveInvestorInfoInit());
    try {
      const { data } = getState().investor;
      const { isActive } = data;
      let payload = _.chain(getState().investor.data)
        .pickBy(_.identity)
        .omit(['userId', 'lastUpdate'])
        .value();
      payload = {
        ...payload,
        isActive,
      };
      service.patch({
        endpoint: `/users/${userId}`,
        payload,
      })
        .then((response) => {
          dispatch(saveInvestorInfoSuccess(response.body));
          dispatch(getInvestorInfo(userId));
        })
        .catch(error => dispatch(saveInvestorInfoError(error)));
    } catch (error) {
      dispatch(saveInvestorInfoError(error));
    }
  };
}
