import * as types from '../constants';

const initialState = {
  isLoading: false,
  error: null,
};

function Main(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_INIT:
    case types.LOADING_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default Main;
