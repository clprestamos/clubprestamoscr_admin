import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  letterStep: 'uno',
  currentStep: 1,
  name: null,
  lastName: null,
  identification: null,
  nationality: null,
  phone: null,
  referencePhone: null,
  relativePhone: null,
  cellphone: null,
  email: null,
  address: null,
  province: null,
  canton: null,
  district: null,
  zipCode: null,
  amount: null,
  term: null,
  reason: null,
  password: null,
  newUser: {
    saved: false,
  },
  newLoan: {
    saved: false,
  },
  newClient: {
    saved: false,
  },
  step1: {
    isActive: true,
    isComplete: false,
  },
  step2: {
    isActive: false,
    isComplete: false,
  },
  step3: {
    isActive: false,
    isComplete: false,
  },
};

function ClientSubscription(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_CLIENT_CURRENT_STEP:
    case types.GET_ZIPCODE_INIT:
    case types.GET_ZIPCODE_ERROR:
    case types.GET_ZIPCODE_SUCCESS:
    case types.ADD_NEW_USER_INIT:
    case types.ADD_NEW_USER_ERROR:
    case types.ADD_NEW_USER_SUCCESS:
    case types.ADD_NEW_CLIENT_INIT:
    case types.ADD_NEW_CLIENT_ERROR:
    case types.ADD_NEW_CLIENT_SUCCESS:
    case types.ADD_NEW_LOAN_INIT:
    case types.ADD_NEW_LOAN_ERROR:
    case types.ADD_NEW_LOAN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.COMPLETE_CLIENT_STEP_ONE:
      return {
        ...state,
        step1: {
          ...state.step1,
          isComplete: true,
        },
      };
    case types.COMPLETE_CLIENT_STEP_TWO:
      return {
        ...state,
        step2: {
          ...state.step2,
          isComplete: true,
        },
      };
    case types.COMPLETE_CLIENT_STEP_THREE:
      return {
        ...state,
        step3: {
          ...state.step3,
          isComplete: true,
        },
      };
    case types.SET_CLIENT_INFORMATION:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case types.STEP_CLIENT_DISABLED:
      return {
        ...state,
        [action.payload.step]: {
          ...state[action.payload.step],
          isDisabled: action.payload.isDisabled,
        },
      };
    case types.CLEAR_CLIENT_SUBSCRIPTION:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default ClientSubscription;
