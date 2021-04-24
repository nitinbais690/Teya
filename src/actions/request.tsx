import Axios from 'axios';

/* ------------- actions const ------------- */
import {ApiConst} from 'utils/contants';
import config from 'config/index';

/* ------------- actions types ------------- */
import * as types from './actionTypes';

/*--------------------- request  ----------------------*/
/*------ create request -----*/
export const createRequestAction = (requestBody: any) => (dispatch: any) => {
  Axios.post(`${ApiConst.CREATE_REQUEST}`, requestBody)
    .then(res => {
      dispatch({
        type: types.CREATE_REQUEST_SUCCESS,
        payload: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.CREATE_REQUEST_ERROR,
        payload: error,
      });
    });
};

/*------ list request -----*/
export const requestList = (
  isUser: boolean,
  tabIndex: number,
  page: number = 1,
  searchTerm: string = '',
) => (dispatch: any) => {
  let remainingURL = ``;
  if (isUser) {
    if (tabIndex) {
      remainingURL = `&status=cancelled,completed`;
    } else {
      remainingURL = `&status=open,waiting,assigned,investigating`;
    }
  } else {
    if (tabIndex === 2) {
      remainingURL = `&status=assigned,investigating`;
    } else if (tabIndex === 1) {
      remainingURL = `&status=cancelled,completed`;
    } else {
      remainingURL = `&status=open`;
    }
  }
  Axios.get(
    `${ApiConst.REQUEST_LIST}?page=${page}${remainingURL}&searchTerm=${searchTerm}`,
  )
    .then(res => {
      dispatch({
        type: types.REQUEST_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: types.REQUEST_LIST_ERROR,
        payload: error,
      });
    });
};

/*------ update request -----*/
export const updateRequestAction = (
  requestUuid: string,
  requestBody: any,
  callFrom: number,
) => (dispatch: any) => {
  Axios.post(`${ApiConst.UPDATE_REQUEST}${requestUuid}`, requestBody)
    .then(res => {
      dispatch({
        type: types.UPDATE_REQUEST_SUCCESS,
        payload: {...res, callFrom},
      });
    })
    .catch(error => {
      dispatch({
        type: types.UPDATE_REQUEST_ERROR,
        payload: {...error, callFrom},
      });
    });
};

/*------ request details -----*/
export const requestDetailsAction = (requestUuid: string) => (
  dispatch: any,
) => {
  Axios.get(`${ApiConst.REQUEST_DETAILS}${requestUuid}`)
    .then(res => {
      dispatch({
        type: types.REQUEST_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: types.REQUEST_DETAILS_ERROR,
        payload: error,
      });
    });
};

/*--------------------- attachments  ----------------------*/
/*------ upload  -----*/
export const uploadAttchmentAction = (
  requestUuid: string,
  requestBody: any,
  callFrom: number,
  attachmentIndex: number
) => (dispatch: any) => {
  Axios.post(`${ApiConst.ATTACHMENTS_UPLOAD}${requestUuid}`, requestBody)
    .then(res => {
      dispatch({
        type: types.UPLOAD_ATTACHMENT_SUCCESS,
        payload: {...res.data, callFrom,attachmentIndex},
      });
    })
    .catch(error => {
      dispatch({
        type: types.UPLOAD_ATTACHMENT_ERROR,
        payload: {...error, callFrom,attachmentIndex},
      });
    });
};

/*------ list attachment -----*/
export const attachmentList = (requestUuid: string, callFrom: string) => (
  dispatch: any,
) => {
  Axios.get(`${ApiConst.ATTACHMENTS_LIST}?post_uuid=${requestUuid}`)
    .then(res => {
      dispatch({
        type: types.ATTCHMENTS_LIST_SUCCESS,
        payload: {...res.data, callFrom},
      });
    })
    .catch(error => {
      dispatch({
        type: types.ATTCHMENTS_LIST_ERROR,
        payload: {...error, callFrom},
      });
    });
};

/*------ delete -----*/
export const deleteAttachmentAction = (
  attachmentUuid: string,
  callFrom: number,
) => (dispatch: any) => {
  Axios.get(`${ApiConst.ATTACHMENTS_DELETE}${attachmentUuid}`)
    .then(res => {
      dispatch({
        type: types.DELETE_ATTCHMENTS_SUCCESS,
        payload: {...res, callFrom},
      });
    })
    .catch(error => {
      dispatch({
        type: types.DELETE_ATTCHMENTS_ERROR,
        payload: {...error, callFrom},
      });
    });
};

/*------------ cancel reason -----------*/
export const cancelReasonAction = () => (dispatch: any) => {
  Axios.get(`${ApiConst.CANCEL_REQUEST_REASON}`)
    .then(res => {
      dispatch({
        type: types.CANCEL_REQUEST_REASON_SUCCESS,
        payload: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.CANCEL_REQUEST_REASON_ERROR,
        payload: error,
      });
    });
};

/*------download -----*/
export const downAttachmentAction = (
  firstName: string,
  attachmentUuid: string,
  callFrom: number,
) => (dispatch: any) => {
  Axios.get(
    `${ApiConst.ATTACHMENTS_DOWNLOAD}/post_uuid=${attachmentUuid}&${firstName}`,
  )
    .then(res => {
      dispatch({
        type: types.ATTCHMENTS_DOWNLOAD_SUCCESS,
        payload: {...res},
      });
    })
    .catch(error => {
      dispatch({
        type: types.ATTCHMENTS_DOWNLOAD_ERROR,
        payload: {...error, callFrom},
      });
    });
};

/*--------------------- chat  ----------------------*/
/*------------ create chat -----------*/
export const createChatAction = (requestBody: any) => (dispatch: any) => {
  Axios.post(`${config.SOKET_BASE_URL}${ApiConst.CREATE_CHAT}`, requestBody)
    .then(res => {
      dispatch({
        type: types.CREATE_CHAT_SUCCESS,
        payload: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.CREATE_CHAT_ERROR,
        payload: error,
      });
    });
};

export const chatMessagesAction = (
  chatUuid: string,
  page: number,
  perPage?: number,
) => (dispatch: any) => {
  let perPageData = perPage ? perPage : 10;
  Axios.get(
    `${config.SOKET_BASE_URL}messages/get-messages/${chatUuid}?page=${page}&resPerPage=${perPageData}`,
  )
    .then(res => {
      dispatch({
        type: types.CHAT_MESSAGES_SUCCESS,
        payload: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.CHAT_MESSAGES_ERROR,
        payload: error,
      });
    });
};

/*------------ uploadAttachement -----------*/
export const uploadAttachementChatAction = (
  chatUuid: string,
  requestBody: any,
  type,
) => (dispatch: any) => {
  Axios.post(
    `${config.SOKET_BASE_URL}${ApiConst.UPLOAD_ATTACHMENT_TO_CHAT}${chatUuid}`,
    requestBody,
  )
    .then(res => {
      dispatch({
        type: types.UPLOAD_ATTACHMENT_TO_CHAT_SUCCESS,
        payload: {...res, type},
      });
    })
    .catch(error => {
      dispatch({
        type: types.UPLOAD_ATTACHMENT_TO_CHAT_ERROR,
        payload: {...error, type},
      });
    });
};

/*--------------------- subject level  ----------------------*/
/*------ subject -----*/
export const subjectListAction = (page: number = 1) => (dispatch: any) => {
  Axios.get(`${ApiConst.SUBJECT_LIST}?page=${page}`)
    .then(res => {
      dispatch({
        type: types.SUBJECT_LIST_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(error => {
      dispatch({
        type: types.SUBJECT_LIST_ERROR,
        payload: error,
      });
    });
};

/*------ level list -----*/
export const levelListAction = (page: number = 1) => (dispatch: any) => {
  Axios.get(`${ApiConst.LEVEL_LIST}?page=${page}`)
    .then(res => {
      dispatch({
        type: types.LEVEL_LIST_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(error => {
      dispatch({
        type: types.LEVEL_LIST_ERROR,
        payload: error,
      });
    });
};

/* ------------- selected ------------- */
export const selectedList = data => async (dispatch: any) => {
  dispatch({
    type: types.SELECTED_LIST_SUCCESS,
    payload: data,
  });
};

/*------ reset request data -----*/
export const resetRequestAction = () => (dispatch: any) => {
  dispatch({
    type: types.REQUEST_STATE_RESET,
  });
};
