import moment from 'moment';
import * as types from '../constants';
import * as service from '../service';

export function clearClientSubscription() {
  return {
    type: types.CLEAR_CLIENT_SUBSCRIPTION,
  };
}
export function getZipCodeInit() {
  return {
    type: types.GET_ZIPCODE_INIT,
    payload: {
      isLoading: true,
    },
  };
}
export function getZipCodeError(error) {
  return {
    type: types.GET_ZIPCODE_ERROR,
    payload: {
      isLoading: false,
      error,
    },
  };
}
export function getZipCodeSuccess(zipCode) {
  return {
    type: types.GET_ZIPCODE_SUCCESS,
    payload: {
      isLoading: false,
      zipCode,
    },
  };
}
export function getZipCode() {
  return (dispatch, getState) => {
    dispatch(getZipCodeInit());
    service.get({
      endpoint: `/getZipcode/${getState().clientSubscription.province}/${getState().clientSubscription.canton}/${getState().clientSubscription.district}`,
    })
      .then((response) => {
        dispatch(getZipCodeSuccess(response.body[0].zipCode));
      })
      .catch(error => dispatch(getZipCodeError(error)));
  };
}
export function registerNewClientInit() {
  return {
    type: types.ADD_NEW_CLIENT_INIT,
    payload: {
      isLoading: true,
      newClient: {
        saved: false,
      },
    },
  };
}
export function registerNewClientError(error) {
  return {
    type: types.ADD_NEW_CLIENT_ERROR,
    payload: {
      isLoading: false,
      error,
      newClient: {
        saved: false,
      },
    },
  };
}
export function registerNewClientSuccess() {
  return {
    type: types.ADD_NEW_CLIENT_SUCCESS,
    payload: {
      isLoading: false,
      newClient: {
        saved: true,
      },
    },
  };
}
export function registerNewClient({ userId, loanId }) {
  return (dispatch) => {
    dispatch(registerNewClientInit());
    service.post({
      endpoint: '/clients',
      payload: {
        userId,
        loanId,
      },
    })
      .then(() => {
        dispatch(registerNewClientSuccess());
      })
      .catch(error => dispatch(registerNewClientError(error)));
  };
}
export function registerNewLoanInit() {
  return {
    type: types.ADD_NEW_LOAN_INIT,
    payload: {
      isLoading: true,
      newLoan: {
        saved: false,
      },
    },
  };
}
export function registerNewLoanError(error) {
  return {
    type: types.ADD_NEW_LOAN_ERROR,
    payload: {
      isLoading: false,
      error,
      newLoan: {
        saved: false,
      },
    },
  };
}
export function registerNewLoanSuccess() {
  return {
    type: types.ADD_NEW_LOAN_SUCCESS,
    payload: {
      isLoading: false,
      newLoan: {
        saved: true,
      },
    },
  };
}
export function registerNewLoan(userId) {
  return (dispatch, getState) => {
    dispatch(registerNewLoanInit());
    const {
      amount,
      term,
      reason,
    } = getState().clientSubscription;
    service.post({
      endpoint: '/loans',
      payload: {
        amount,
        term,
        reason,
        stateId: 1,
        userId,
        requestLoanDate: moment().format(),
      },
    })
      .then((response) => {
        dispatch(registerNewLoanSuccess());
        dispatch(registerNewClient({
          userId,
          loanId: response.body.id,
        }));
      })
      .catch(error => dispatch(registerNewLoanError(error)));
  };
}
export function registerNewUserInit() {
  return {
    type: types.ADD_NEW_USER_INIT,
    payload: {
      isLoading: true,
      newUser: {
        saved: false,
      },
    },
  };
}
export function registerNewUserError(error) {
  return {
    type: types.ADD_NEW_USER_ERROR,
    payload: {
      isLoading: false,
      error,
      newUser: {
        saved: false,
      },
    },
  };
}
export function registerNewUserSuccess() {
  return {
    type: types.ADD_NEW_USER_SUCCESS,
    payload: {
      isLoading: false,
      newUser: {
        saved: true,
      },
    },
  };
}
export function registerUserClient() {
  return (dispatch, getState) => {
    dispatch(registerNewUserInit());
    const {
      name,
      lastName,
      identification,
      nationality,
      phone,
      referencePhone,
      relativePhone,
      cellphone,
      email,
      address,
      province,
      canton,
      district,
      zipCode,
      password,
    } = getState().clientSubscription;
    service.post({
      endpoint: '/users',
      payload: {
        name,
        lastName,
        identification,
        nationality,
        phone,
        referencePhone,
        relativePhone,
        cellphone,
        email,
        address,
        province,
        canton,
        district,
        zipCode,
        password,
        roleId: 1,
        signupDate: moment().format(),
        isActive: true,
      },
    })
      .then((response) => {
        dispatch(registerNewUserSuccess());
        return response.body[0].id;
      })
      .then((userId) => {
        dispatch(registerNewLoan(userId));
      })
      .catch(error => dispatch(registerNewUserError(error)));
  };
}
export function setClientInformation({ field, value }) {
  return dispatch => dispatch({
    type: types.SET_CLIENT_INFORMATION,
    payload: {
      field,
      value,
    },
  });
}

export function stepIsDisabled({ step, isDisabled }) {
  return dispatch => dispatch({
    type: types.STEP_CLIENT_DISABLED,
    payload: {
      step,
      isDisabled,
    },
  });
}

export function clientIsCompletedStep(currentStep) {
  return (dispatch) => {
    let type = '';
    if (currentStep === 1) {
      type = types.COMPLETE_CLIENT_STEP_ONE;
    } else if (currentStep === 2) {
      type = types.COMPLETE_CLIENT_STEP_TWO;
    } else if (currentStep === 3) {
      type = types.COMPLETE_CLIENT_STEP_THREE;
    }
    return dispatch({
      type,
    });
  };
}

export function clientChangeCurrentStep(currentStep) {
  return (dispatch, getState) => {
    let payload = {
      currentStep,
    };
    if (currentStep === 1) {
      payload = {
        ...payload,
        step1: {
          ...getState().clientSubscription.step1,
          isActive: true,
        },
        step2: {
          ...getState().clientSubscription.step2,
          isActive: false,
        },
        step3: {
          ...getState().clientSubscription.step3,
          isActive: false,
        },
      };
    } else if (currentStep === 2) {
      payload = {
        ...payload,
        step1: {
          ...getState().clientSubscription.step1,
          isActive: false,
        },
        step2: {
          ...getState().clientSubscription.step2,
          isActive: true,
        },
        step3: {
          ...getState().clientSubscription.step3,
          isActive: false,
        },
      };
    } else if (currentStep === 3) {
      payload = {
        ...payload,
        step1: {
          ...getState().clientSubscription.step1,
          isActive: false,
        },
        step2: {
          ...getState().clientSubscription.step2,
          isActive: false,
        },
        step3: {
          ...getState().clientSubscription.step3,
          isActive: true,
        },
      };
    }
    return dispatch({
      type: types.CHANGE_CLIENT_CURRENT_STEP,
      payload,
    });
  };
}
