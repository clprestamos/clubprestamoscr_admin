import moment from 'moment';
import * as types from '../constants';
import * as service from '../service';

export function clearInvestorSubscription() {
  return {
    type: types.CLEAR_INVESTOR_SUBSCRIPTION,
  };
}
export function setInvestorInformation({ field, value }) {
  return dispatch => dispatch({
    type: types.SET_INVESTOR_INFORMATION,
    payload: {
      field,
      value,
    },
  });
}
export function stepIsDisabled({ step, isDisabled }) {
  return dispatch => dispatch({
    type: types.STEP_INVESTOR_DISABLED,
    payload: {
      step,
      isDisabled,
    },
  });
}
export function investorIsCompletedStep(currentStep) {
  return (dispatch) => {
    let type = '';
    if (currentStep === 1) {
      type = types.COMPLETE_INVESTOR_STEP_ONE;
    } else if (currentStep === 2) {
      type = types.COMPLETE_INVESTOR_STEP_TWO;
    }
    return dispatch({
      type,
    });
  };
}

export function investorChangeCurrentStep(currentStep) {
  return (dispatch, getState) => {
    let payload = {
      currentStep,
    };
    if (currentStep === 1) {
      payload = {
        ...payload,
        step1: {
          ...getState().investorSubscription.step1,
          isActive: true,
        },
        step2: {
          ...getState().investorSubscription.step2,
          isActive: false,
        },
      };
    } else if (currentStep === 2) {
      payload = {
        ...payload,
        step1: {
          ...getState().investorSubscription.step1,
          isActive: false,
        },
        step2: {
          ...getState().investorSubscription.step2,
          isActive: true,
        },
      };
    }
    return dispatch({
      type: types.CHANGE_INVESTOR_CURRENT_STEP,
      payload,
    });
  };
}
export function registerNewInvestorInit() {
  return {
    type: types.ADD_NEW_INVESTOR_INIT,
    payload: {
      isLoading: true,
      newInvestor: {
        saved: false,
      },
    },
  };
}
export function registerNewInvestorError(error) {
  return {
    type: types.ADD_NEW_INVESTOR_ERROR,
    payload: {
      isLoading: false,
      error,
      newInvestor: {
        saved: false,
      },
    },
  };
}
export function registerNewInvestorSuccess() {
  return {
    type: types.ADD_NEW_INVESTOR_SUCCESS,
    payload: {
      isLoading: false,
      newInvestor: {
        saved: true,
      },
    },
  };
}
export function registerUserInvestor() {
  return (dispatch, getState) => {
    dispatch(registerNewInvestorInit());
    const {
      name,
      lastName,
      identification,
      phone,
      referencePhone,
      email,
      password,
    } = getState().investorSubscription;
    service.post({
      endpoint: '/users',
      payload: {
        name,
        lastName,
        identification,
        phone,
        referencePhone,
        email,
        password,
        roleId: 2,
        signupDate: moment().format(),
        isActive: true,
      },
    })
      .then((response) => {
        dispatch(registerNewInvestorSuccess());
        return response.body[0].id;
      })
      .catch(error => dispatch(registerNewInvestorError(error)));
  };
}
