import buildReducer from './buildReducer';

/* ------------- action type ------------- */
import * as types from '../actions/actionTypes';

/* ------------- initails ------------- */
const profileState = {
  userInfoSuccess: false,
  userInfoError: false,
  updatUserInfoSuccess: false,
  updatUserInfoError: false,
  notificationsListSuccess: false,
  notificationsListError: false,
  tutorInfoSuccess: false,
  tutorInfoError: false,
};

/* ------------- reducer ------------- */
export const profileReducer = buildReducer(profileState, {
  /* -------------  profile  ------------- */
  [types.PROFILE_INFO_SUCCESS](state: any, action: any) {
    return {
      ...state,
      userInfoSuccess: action.payload,
      userInfoError: false,
      updatUserInfoSuccess: false,
      updatUserInfoError: false,
    };
  },
  [types.PROFILE_INFO_ERROR](state: any, action: any) {
    return {
      ...state,
      userInfoSuccess: false,
      userInfoError: action.payload,
      updatUserInfoSuccess: false,
      updatUserInfoError: false,
    };
  },

   /* -------------  tutor info  ------------- */
   [types.TUTOR_INFO_SUCCESS](state: any, action: any) {
    return {
      ...state,
      tutorInfoSuccess: action.payload,
      tutorInfoError: false,
    };
  },
  [types.TUTOR_INFO_ERROR](state: any, action: any) {
    return {
      ...state,
      tutorInfoSuccess: false,
      tutorInfoError: action.payload,
    };
  },


  /* ------------- updatUserInfo ------------- */
  [types.UPDATE_PROFILE_INFO_SUCCESS](state: any, action: any) {
    return {
      ...state,
      updatUserInfoSuccess: action.payload,
      updatUserInfoError: false,
    };
  },
  [types.UPDATE_PROFILE_INFO_ERROR](state: any, action: any) {
    return {
      ...state,
      updatUserInfoSuccess: false,
      updatUserInfoError: action.payload,
    };
  },

  /* ------------- notification ------------- */
  [types.NOTIFICATION_LIST_SUCCESS](state: any, action: any) {
    return {
      ...state,
      notificationsListSuccess: action.payload,
      notificationsListError: false,
    };
  },
  [types.NOTIFICATION_LIST_ERROR](state: any, action: any) {
    return {
      ...state,
      notificationsListSuccess: false,
      notificationsListError: action.payload,
    };
  },

  /* ------------- logout ------------- */
  [types.LOGOUT_SUCCESS](state: any, action: any) {
    return {
      ...state,
      updatUserInfoSuccess: false,
      updatUserInfoError: false,
      userInfoSuccess: false,
      userInfoError: false,
    };
  },
});
