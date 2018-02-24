import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: false,
  data: [],
  user: {
    data: {
      userId: 0,
      email: '',
      name: '',
      lastName: '',
      password: '',
      roleName: '',
    },
  },
};

function users(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_USERS_INIT:
    case types.GET_ALL_USERS_SUCCESS:
    case types.GET_ALL_USERS_ERROR:
    case types.GET_USER_INFO_INIT:
    case types.GET_USER_INFO_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload.data,
        },
      };
    case types.EDIT_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          data: {
            ...state.user.data,
            [action.payload.field]: action.payload.value,
          },
        },
      };
    case types.CLEAR_ALL_USERS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default users;
