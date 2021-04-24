import buildReducer from './buildReducer';

/* ------------- action type ------------- */
import * as types from '../actions/actionTypes';

/* ------------- initails ------------- */
const requestState = {
  createRequestSuccess: false,
  createRequestError: false,
  requestsListSuccess: false,
  requestsListError: false,
  requestInfoSuccess: false,
  requestInfoError: false,
  updatRequestInfoSuccess: false,
  updatRequestInfoError: false,
  cancelRequestReasonSuccess: false,
  cancelRequestReasonError: false,

  createChatSuccess: false,
  createChatError: false,
  getMessagesListSuccess: false,
  getMessagesListError: false,
  uploadAttachmentChatSuccess: false,
  uploadAttachmentChatError: false,

  uploadAttachmentSuccess: false,
  uploadAttachmentError: false,
  attachmentsListSuccess: false,
  attachmentsListError: false,
  deleteAttachementSuccess: false,
  deleteAttachementError: false,
  downloadAttachementSuccess: false,
  downloadAttachementError: false,
};

/* ------------- reducer ------------- */
export const requestReducer = buildReducer(
  {
    ...requestState,
    subjectsListSuccess: false,
    subjectsListError: false,
    levelsListSuccess: false,
    levelsListError: false,
    selectedListSuccess: false,
  },
  {
    /* ------------- create ------------- */
    [types.CREATE_REQUEST_SUCCESS](state: any, action: any) {
      return {
        ...state,
        createRequestSuccess: action.payload,
        createRequestError: false,
        updatRequestInfoSuccess: false,
        updatRequestInfoError: false,
        requestInfoSuccess: false,
        requestInfoError: false,
        requestsListSuccess: false,
        requestsListError: false,
      };
    },
    [types.CREATE_REQUEST_ERROR](state: any, action: any) {
      return {
        ...state,
        createRequestSuccess: false,
        createRequestError: action.payload,
        updatRequestInfoSuccess: false,
        updatRequestInfoError: false,
        requestInfoSuccess: false,
        requestInfoError: false,
        requestsListSuccess: false,
        requestsListError: false,
      };
    },

    /* ------------- list ------------- */
    [types.REQUEST_LIST_SUCCESS](state: any, action: any) {
      return {
        ...state,
        requestsListSuccess: action.payload,
        requestsListError: false,
        updatRequestInfoSuccess: false,
        updatRequestInfoError: false,
        requestInfoSuccess: false,
        requestInfoError: false,
        createRequestSuccess: false,
        createRequestError: false,
      };
    },
    [types.REQUEST_LIST_ERROR](state: any, action: any) {
      return {
        ...state,
        requestsListSuccess: false,
        requestsListError: action.payload,
        updatRequestInfoSuccess: false,
        updatRequestInfoError: false,
        requestInfoSuccess: false,
        requestInfoError: false,
        createRequestSuccess: false,
        createRequestError: false,
        attachmentsListSuccess: false,
        attachmentsListError: false,
      };
    },

    /* -------------  details  ------------- */
    [types.REQUEST_DETAILS_SUCCESS](state: any, action: any) {
      return {
        ...state,
        requestInfoSuccess: action.payload,
        requestInfoError: false,
        updatRequestInfoSuccess: false,
        updatRequestInfoError: false,
        createRequestSuccess: false,
        createRequestError: false,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
        deleteAttachementSuccess: false,
        deleteAttachementError: false,
        attachmentsListSuccess: false,
        attachmentsListError: false,
        createChatSuccess: false,
        createChatError: false,
        getMessagesListSuccess: false,
        getMessagesListError: false,
      };
    },
    [types.REQUEST_DETAILS_ERROR](state: any, action: any) {
      return {
        ...state,
        requestInfoSuccess: false,
        requestInfoError: action.payload,
        updatRequestInfoSuccess: false,
        updatRequestInfoError: false,
        createRequestSuccess: false,
        createRequestError: false,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
        deleteAttachementSuccess: false,
        deleteAttachementError: false,
        createChatSuccess: false,
        createChatError: false,
        getMessagesListSuccess: false,
        getMessagesListError: false,
      };
    },

    /* -------------  cancel reason  ------------- */
    [types.CANCEL_REQUEST_REASON_SUCCESS](state: any, action: any) {
      return {
        ...state,
        cancelRequestReasonError: false,
        cancelRequestReasonSuccess: action.payload,
      };
    },
    [types.CANCEL_REQUEST_REASON_ERROR](state: any, action: any) {
      return {
        ...state,
        cancelRequestReasonSuccess: false,
        cancelRequestReasonError: action.payload,
      };
    },

    /* ------------- updatRequestInfo ------------- */
    [types.UPDATE_REQUEST_SUCCESS](state: any, action: any) {
      return {
        ...state,
        updatRequestInfoSuccess: action.payload,
        updatRequestInfoError: false,
        requestInfoSuccess: false,
        requestInfoError: false,
      };
    },
    [types.UPDATE_REQUEST_ERROR](state: any, action: any) {
      return {
        ...state,
        updatRequestInfoSuccess: false,
        updatRequestInfoError: action.payload,
        requestInfoSuccess: false,
        requestInfoError: false,
      };
    },

    /* ------------- chat ------------- */
    [types.CREATE_CHAT_SUCCESS](state: any, action: any) {
      return {
        ...state,
        createChatSuccess: action.payload,
        createChatError: false,
      };
    },
    [types.CREATE_CHAT_ERROR](state: any, action: any) {
      return {
        ...state,
        createChatSuccess: false,
        createChatError: action.payload,
      };
    },
    
    /* ------------- chat message ------------- */
    [types.CHAT_MESSAGES_SUCCESS](state: any, action: any) {
      return {
        ...state,
        getMessagesListSuccess: action.payload,
        getMessagesListError: false,
      };
    },
    [types.CHAT_MESSAGES_ERROR](state: any, action: any) {
      return {
        ...state,
        getMessagesListSuccess: false,
        getMessagesListError: action.payload,
      };
    },

    /* ------------- upload chat attachment ------------- */
    [types.UPLOAD_ATTACHMENT_TO_CHAT_SUCCESS](state: any, action: any) {
      return {
        ...state,
        uploadAttachmentChatSuccess: action.payload,
        uploadAttachmentChatError: false,
        attachmentsListSuccess: false,
        attachmentsListError: false,
      };
    },
    [types.UPLOAD_ATTACHMENT_TO_CHAT_ERROR](state: any, action: any) {
      return {
        ...state,
        uploadAttachmentChatSuccess: false,
        uploadAttachmentChatError: action.payload,
        attachmentsListSuccess: false,
        attachmentsListError: false,
      };
    },

    /* ------------- attachement ------------- */
    /* ------------- upload ------------- */
    [types.UPLOAD_ATTACHMENT_SUCCESS](state: any, action: any) {
      return {
        ...state,
        uploadAttachmentSuccess: action.payload,
        uploadAttachmentError: false,
        deleteAttachementError: false,
        deleteAttachementSuccess: false,
        attachmentsListSuccess: false,
        attachmentsListError: false,
      };
    },
    [types.UPLOAD_ATTACHMENT_ERROR](state: any, action: any) {
      return {
        ...state,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: action.payload,
        deleteAttachementError: false,
        deleteAttachementSuccess: false,
        attachmentsListSuccess: false,
        attachmentsListError: false,
      };
    },

    /* ------------- list ------------- */
    [types.ATTCHMENTS_LIST_SUCCESS](state: any, action: any) {
      return {
        ...state,
        attachmentsListSuccess: action.payload,
        attachmentsListError: false,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
        deleteAttachementSuccess: false,
        deleteAttachementError: false,
        downloadAttachementSuccess: false,
        downloadAttachementError: false,
      };
    },
    [types.ATTCHMENTS_LIST_ERROR](state: any, action: any) {
      return {
        ...state,
        attachmentsListSuccess: false,
        attachmentsListError: action.payload,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
        deleteAttachementSuccess: false,
        deleteAttachementError: false,
        downloadAttachementSuccess: false,
        downloadAttachementError: false,
      };
    },

    /* -------------  delete  ------------- */
    [types.DELETE_ATTCHMENTS_SUCCESS](state: any, action: any) {
      return {
        ...state,
        deleteAttachementSuccess: action.payload,
        deleteAttachementError: false,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
      };
    },
    [types.DELETE_ATTCHMENTS_ERROR](state: any, action: any) {
      return {
        ...state,
        deleteAttachementSuccess: false,
        deleteAttachementError: action.payload,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
      };
    },

    /* -------------  download  ------------- */
    [types.ATTCHMENTS_DOWNLOAD_SUCCESS](state: any, action: any) {
      return {
        ...state,
        downloadAttachementSuccess: action.payload,
        downloadAttachementError: false,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
      };
    },
    [types.ATTCHMENTS_DOWNLOAD_ERROR](state: any, action: any) {
      return {
        ...state,
        downloadAttachementSuccess: false,
        downloadAttachementError: action.payload,
        uploadAttachmentSuccess: false,
        uploadAttachmentError: false,
      };
    },

    /* -------------------- subject level --------------------- */
    /* ------------- subject list ------------- */
    [types.SUBJECT_LIST_SUCCESS](state: any, action: any) {
      return {
        ...state,
        subjectsListSuccess: action.payload,
        subjectsListError: false,
      };
    },
    [types.SUBJECT_LIST_ERROR](state: any, action: any) {
      return {
        ...state,
        subjectsListSuccess: false,
        subjectsListError: action.payload,
      };
    },

    /* ------------- level list ------------- */
    [types.LEVEL_LIST_SUCCESS](state: any, action: any) {
      return {
        ...state,
        levelsListSuccess: action.payload,
        levelsListError: false,
      };
    },
    [types.LEVEL_LIST_ERROR](state: any, action: any) {
      return {
        ...state,
        levelsListSuccess: false,
        levelsListError: action.payload,
      };
    },

    /* ------------- sleceted item  list ------------- */
    [types.SELECTED_LIST_SUCCESS](state: any, action: any) {
      return {
        ...state,
        selectedListSuccess: action.payload,
        subjectsListError: false,
        levelsListError: false,
        createRequestSuccess: false,
        createRequestError: false,
      };
    },

    [types.PROFILE_INFO_SUCCESS](state: any, action: any) {
      return {
        ...state,
        selectedListSuccess: false,
      };
    },

    /* ------------- logout ------------- */
    [types.LOGOUT_SUCCESS](state: any, action: any) {
      return {
        ...state,
        ...requestState,
      };
    },

    /* ------------- reset ------------- */
    [types.REQUEST_STATE_RESET](state: any, action: any) {
      return {
        ...state,
        ...requestState,
      };
    },
  },
);
