import buildReducer from './buildReducer';

/* ------------- action type ------------- */
import * as types from '../actions/actionTypes';

/* ------------- initails ------------- */
const authState = {
  registerSuccess: false,
  registerError: false,
  loginSuccess: false,
  loginError: false,
  logoutSuccess: false,
  logoutError: false,
};

/* ------------- reducer ------------- */
export const authReducer = buildReducer(authState, {
  /* -------------  register  ------------- */
  [types.SIGN_IN_SUCCESS](state: any, action: any) {
    return {
      ...state,
      registerSuccess: action.payload,
      registerError: false,
      loginSuccess: false,
      loginError: false,
    };
  },
  [types.SIGN_IN_ERROR](state: any, action: any) {
    return {
      ...state,
      registerSuccess: false,
      registerError: action.payload,
      loginSuccess: false,
      loginError: false,
    };
  },

  /* ------------- login ------------- */
  [types.LOGIN_SUCCESS](state: any, action: any) {
    return {
      ...state,
      loginSuccess: action.payload,
      loginError: false,
      registerSuccess: false,
      registerError: false,
    };
  },
  [types.LOGIN_ERROR](state: any, action: any) {
    return {
      ...state,
      loginSuccess: false,
      loginError: action.payload,
      registerSuccess: false,
      registerError: false,
    };
  },

  /* ------------- logout ------------- */
  [types.LOGOUT_SUCCESS](state: any, action: any) {
    return {
      ...state,
      logoutSuccess: action.payload,
      logoutError: false,
      loginSuccess: false,
      loginError: false,
      registerSuccess: false,
      registerError: false,
    };
  },

  /* ------------- logout ------------- */
  [types.LOGOUT_ERROR](state: any, action: any) {
    return {
      ...state,
      logoutError: action.payload,
      logoutSuccess: false,
      loginSuccess: false,
      loginError: false,
      registerSuccess: false,
      registerError: false,
    };
  },
});
