import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {authenticateStack} from 'config/navigation';
import {showMessage} from 'config/navigation/navigatorOption';

/* ------------- actions const ------------- */
import {ApiConst} from 'utils/contants';

/* ------------- actions types ------------- */
import * as types from './actionTypes';

/*------ register -----*/
export const signUpAction = (requestBody: any) => (dispatch: any) => {
  Axios.post(ApiConst.REGSITER, requestBody)
    .then(res => {
      dispatch({
        type: types.SIGN_IN_SUCCESS,
        payload: {...res, ...requestBody},
      });
    })
    .catch(error => {
      dispatch({
        type: types.SIGN_IN_ERROR,
        payload: error,
      });
    });
};

/*------ login -----*/
export const loginAction = (requestBody: any) => (dispatch: any) => {
  Axios.post(ApiConst.LOGIN, requestBody)
    .then(res => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: types.LOGIN_ERROR,
        payload: error,
      });
    });
};

/*------ logout -----*/
export const logoutAction = (deviceUuid: any) => (dispatch: any) => {
  console.log('device_uuid ' + deviceUuid);
  Axios.get(`${ApiConst.LOGOUT}?device_uuid=${deviceUuid}`)
    .then(res => {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + '';
      authenticateStack(false);
      dispatch({
        type: types.LOGOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + '';
      authenticateStack(false);
      dispatch({
        type: types.LOGOUT_SUCCESS,
        payload: true,
      });
      // showMessage({message: 'Logout error'});
      // dispatch({
      //   type: types.LOGOUT_ERROR,
      //   payload: error,
      // });
    });
};
