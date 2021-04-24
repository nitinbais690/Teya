import Axios from 'axios';

/* ------------- actions const ------------- */
import {ApiConst} from 'utils/contants';

/* ------------- actions types ------------- */
import * as types from './actionTypes';

/*------ create bid -----*/
export const createBidAction = (requestUuid: string, requestBody: any) => (
  dispatch: any,
) => {
  Axios.post(`${ApiConst.CREATE_BID}/${requestUuid}`, requestBody)
    .then((res) => {
      dispatch({
        type: types.CREATE_BID_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_BID_ERROR,
        payload: error,
      });
    });
};

/*------ list bid -----*/
export const bidList = (
  requestUuid: string,
  page: number = 1,
  searchTerm: string = '',
) => (dispatch: any) => {
  Axios.get(
    `${ApiConst.BID_LIST}?post_uuid=${requestUuid}&page=${page}&searchTerm=${searchTerm}`,
  )
    .then((res) => {
      dispatch({
        type: types.BID_LIST_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.BID_LIST_ERROR,
        payload: error,
      });
    });
};

/*------ update bid -----*/
export const updateBidAction = (
  bidUuid: string,
  requestBody: any,
  callFrom: number,
) => (dispatch: any) => {
  Axios.post(`${ApiConst.UPDATE_BID}${bidUuid}`, requestBody)
    .then((res) => {
      dispatch({
        type: types.UPDATE_BID_SUCCESS,
        payload: {...res, callFrom},
      });
    })
    .catch((error) => {
      dispatch({
        type: types.UPDATE_BID_ERROR,
        payload: {...error, callFrom},
      });
    });
};
