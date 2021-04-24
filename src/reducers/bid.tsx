import buildReducer from './buildReducer';

/* ------------- action type ------------- */
import * as types from '../actions/actionTypes';

/* ------------- initails ------------- */
const bidState = {
  createBidSuccess: false,
  createBidError: false,
  bidsListSuccess: false,
  bidsListError: false,
  updatBidInfoSuccess: false,
  updatBidInfoError: false,
};

/* ------------- reducer ------------- */
export const bidReducer = buildReducer(bidState, {
  /* ------------- create ------------- */
  [types.CREATE_BID_SUCCESS](state: any, action: any) {
    return {
      ...state,
      createBidSuccess: action.payload,
      createBidError: false,
      updatBidInfoSuccess: false,
      updatBidInfoError: false,
      bidInfoSuccess: false,
      bidInfoError: false,
    };
  },
  [types.CREATE_BID_ERROR](state: any, action: any) {
    return {
      ...state,
      createBidSuccess: false,
      createBidError: action.payload,
      updatBidInfoSuccess: false,
      updatBidInfoError: false,
      bidInfoSuccess: false,
      bidInfoError: false,
    };
  },

  /* ------------- list ------------- */
  [types.BID_LIST_SUCCESS](state: any, action: any) {
    return {
      ...state,
      bidsListSuccess: action.payload,
      bidsListError: false,
      updatBidInfoSuccess: false,
      updatBidInfoError: false,
      bidInfoSuccess: false,
      bidInfoError: false,
      createBidSuccess: false,
      createBidError: false,
    };
  },
  [types.BID_LIST_ERROR](state: any, action: any) {
    return {
      ...state,
      bidsListSuccess: false,
      bidsListError: action.payload,
      updatBidInfoSuccess: false,
      updatBidInfoError: false,
      bidInfoSuccess: false,
      bidInfoError: false,
      createBidSuccess: false,
      createBidError: false,
    };
  },

  /* ------------- updat bid Info ------------- */
  [types.UPDATE_BID_SUCCESS](state: any, action: any) {
    return {
      ...state,
      updatBidInfoSuccess: action.payload,
      updatBidInfoError: false,
      bidInfoSuccess: false,
      bidInfoError: false,
    };
  },
  [types.UPDATE_BID_ERROR](state: any, action: any) {
    return {
      ...state,
      updatBidInfoSuccess: false,
      updatBidInfoError: action.payload,
      bidInfoSuccess: false,
      bidInfoError: false,
    };
  },

  /* ------------- create ------------- */
  [types.CREATE_REQUEST_SUCCESS](state: any, action: any) {
    return {
      ...state,
      createBidSuccess: false,
      createBidError: false,
      bidsListSuccess: false,
      bidsListError: false,
      updatBidInfoSuccess: false,
      updatBidInfoError: false,
    };
  },

  /* ------------- list ------------- */
  [types.REQUEST_DETAILS_SUCCESS](state: any, action: any) {
    return {
      ...state,
      createBidSuccess: false,
      createBidError: false,
      bidsListSuccess: false,
      bidsListError: false,
      updatBidInfoSuccess: false,
      updatBidInfoError: false,
    };
  },
  [types.REQUEST_LIST_SUCCESS](state: any, action: any) {
    return {
      ...state,
      createBidSuccess: false,
      createBidError: false,
      bidsListSuccess: false,
      bidsListError: false,
      updatBidInfoSuccess: false,
      updatBidInfoError: false,
    };
  },
});
