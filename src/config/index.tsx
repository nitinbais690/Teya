/*-------- time zone  ----------*/
import Axios from 'axios';
import * as RNLocalize from 'react-native-localize';
import i18n from './i18n';

/*-------- api base url  ----------*/
const staggingBaseUrl = `https://core.teya.io:5088/`;
const productionBaseUrl = `https://core.freshymart.com`;

/*-------- payment base url  ----------*/
const staggingPaymentURL = `https://staging.pay.dgera.com/08575502-a239-40d4-ac95-d0540d5bb046/`;
const productionPaymentURL = `https://staging.pay.dgera.com/08575502-a239-40d4-ac95-d0540d5bb046/`;
const tacUrl = `https://teya.io/terms-and-conditions`;

/*-------- active url  ----------*/
const baseURL = staggingBaseUrl;
const paymentUrl = staggingPaymentURL;

/*-------- active url  ----------*/
const config = {
  API_BASE_URL: `${baseURL}`,
  SOKET_BASE_URL: `https://cloud.peit.io:5080/`,
  WEBSOKET_BASE_URL: `wss://cloud.peit.io:5080`,
  API_KEY: 'ff61c1d8-r8te-46ef-9900-66724ea60ip3',
  paymentUrl,
  build: '10',
  versionCode: '1.4.10',
  imageSize: 500,
  userDefaultName: i18n.t('hi'),
  timeZone: RNLocalize.getTimeZone(),
  logoUrl: require('../assets/icons/logo.svg'),
  imageBaseUrl: `${baseURL}profile-images/`,
  attachementBaseUrl: `${baseURL}posts-files/`,
  tacUrl,
  cancelPrice: '70.00',
  oneSignalAppId: '90922ead-6bad-46bb-bdd1-a8934cfa2a7e',
  paymentApiKey: '6040aeb596cee6040aeb596cf06040aeb596cf1',
};

export default config;

export const configAxois = (loginSuccess: any) => {
  Axios.defaults.headers.common['Authorization'] =
    'Bearer ' + loginSuccess.data.user.auth_token;

  Axios.defaults.headers.common['device_uuid'] =
    loginSuccess.data.user.device_uuid;

  return true;
};
