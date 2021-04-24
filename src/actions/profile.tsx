import Axios from 'axios';

/* ------------- actions const ------------- */
import {ApiConst} from 'utils/contants';

/* ------------- actions types ------------- */
import * as types from './actionTypes';

/*------ profile -----*/
export const profileAction = (userUuid: string, callFrom) => (
  dispatch: any,
) => {
  Axios.get(`${ApiConst.SHOW}${userUuid}`)
    .then(res => {
      dispatch({
        type: types.PROFILE_INFO_SUCCESS,
        payload: {...res, callFrom},
      });
    })
    .catch(error => {
      dispatch({
        type: types.PROFILE_INFO_ERROR,
        payload: {...error, callFrom},
      });
    });
};

/*------ update profile -----*/
export const updateProfileAction = (
  userUuid: string,
  requestBody: any,
  callFrom: number,
) => (dispatch: any) => {
  Axios.post(`${ApiConst.UPDATE}${userUuid}`, requestBody)
    .then(res => {
      dispatch({
        type: types.UPDATE_PROFILE_INFO_SUCCESS,
        payload: {...res, callFrom},
      });
    })
    .catch(error => {
      dispatch({
        type: types.UPDATE_PROFILE_INFO_ERROR,
        payload: {...error, callFrom},
      });
    });
};

/*------ notification profile -----*/
export const notificationAction = (userUuid: string) => (dispatch: any) => {
  Axios.get(`${ApiConst.NOTIFICATION_LIST}`)
    .then(res => {
      dispatch({
        type: types.NOTIFICATION_LIST_SUCCESS,
        payload: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.NOTIFICATION_LIST_ERROR,
        payload: error,
      });
    });
};

/*------ reviews -----*/
export const tutorReviews = (tutorUuid: string, page:number) => (dispatch: any) => {
  Axios.get(`${ApiConst.TUTOR_REVIEWS}${tutorUuid}`)
    .then(res => {
      dispatch({
        type: types.TUTOR_INFO_SUCCESS,
        payload: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.TUTOR_INFO_ERROR,
        payload: error,
      });
    });
};
