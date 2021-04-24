export const ONE_SIGNAL_ID = 'ONE_SIGNAL_ID';

/*------ navigation ------*/
export const ScreenName = {
  LOGIN: 'LOGIN',
  CHECK_OTA_UPDATE: 'CHECK_OTA_UPDATE',
  APP_INTRO_SLIDES: 'APP_INTRO_SLIDES',
  DRAWER_COMPONENT: 'DrawerComponent',
  DASHBOARD: 'Dashboard',
  PROFILE: 'Profile',
  TUTOR_PROFILE: 'TutorProfile',
  SETTINGS: 'Settings',
  REQUEST: 'Request',
  CANCEL_REQUEST: 'CancelRequest',
  MAIN_TAB: 'MAIN_TAB',
  PAYMENT_VIEW: 'PaymentView',
  PAYMENT: 'Payment',
  OFFER_LIST: 'OfferList',
  CHAT: 'Chat',
  REVIEW_RATING: 'Review_rating',
  SUBJECT_LEVEL_LIST: 'Subject_Level_List',
  TAC: 'TAC',
  MESSAGE_ALERT: 'MESSAGE_ALERT',
  UPDATE_PASSWORD: 'UpdatePassword',
  NOTIFICATION: 'Notification',
};

/*------ navigation ------*/
export const AppConst = {
  LANGUAGE: 'LANGUAGE',
  ONE_SIGNAL_ID: 'ONE_SIGNAL_ID',
  MESSAGE_BACK: 'MESSAGE_BACK'
};

/*------ navigation ------*/
export const OrderStatus = {
  ASSINED: 'assigned',
  WAITING: 'waiting',
  OPEN: 'open',
  ASSIGNED: 'assigned',
  COMPLETE: 'completed',
  CANCELLED: 'cancelled',
  INVESTIGATING: 'investigating',
};

/*------ api ------*/
export const USERS = `users/`;
export const POST = `posts/`;
export const BIDS = `bids/`;
export const ATTACHMENTS = `attachments/`;
export const SETTINGS_SHOW = `settings/show`;
export const CHATS = `chats/`;

export const ApiConst = {
  REGSITER: `${USERS}create`,
  LOGIN: `${USERS}login`,
  LOGOUT: `${USERS}logout`,
  UPDATE: `${USERS}update/`,
  SHOW: `${USERS}show/`,
  SUBJECT_LIST: `/subjects/list`,
  LEVEL_LIST: `/levels/list`,
  UPDATE_REQUEST: `${POST}update/`,
  CREATE_REQUEST: `${POST}create`,
  REQUEST_DETAILS: `${POST}show/`,
  REQUEST_LIST: `${POST}list`,
  BID_LIST: `${BIDS}list`,
  CREATE_BID: `${BIDS}create`,
  UPDATE_BID: `${BIDS}update/`,
  ATTACHMENTS_UPLOAD: `${ATTACHMENTS}upload/`,
  ATTACHMENTS_LIST: `${ATTACHMENTS}list/`,
  ATTACHMENTS_DELETE: `${ATTACHMENTS}delete/`,
  ATTACHMENTS_DOWNLOAD: `${ATTACHMENTS}download/`,
  CANCEL_REQUEST_REASON: `${SETTINGS_SHOW}/cancel_types`,
  CREATE_CHAT:`${CHATS}/create-chat`,
  UPLOAD_ATTACHMENT_TO_CHAT:`messages/upload/`,
  NOTIFICATION_LIST: `/notifications/list`,
  TUTOR_REVIEWS: `${USERS}reviews/?profile_type=tutor&profile_uuid`
};
