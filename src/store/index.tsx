/*-------- rootReducer ----------*/
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*-------- middleware ----------*/
import thunk from 'redux-thunk';

/*-------- rootReducer ----------*/
import rootReducer from '../reducers';

/*-------- check ----------*/
import array from './array';
import promise from './promise';
import {AppConst} from 'utils/contants';

/*-------- library ----------*/
import Axios from 'axios';
import i18n from 'config/i18n';
import * as RNLocalize from 'react-native-localize';

/*-------- config ----------*/
import config from 'config/index';
import {CheckOTAUpdateStack} from 'config/navigation';

/*-------- persist config ----------*/
const persistConfig = {
  timeout: 15000,
  whitelist: ['otherReducer', 'authReducer'],
  key: 'root',
  storage: AsyncStorage,
};

/*--------  middle ware ----------*/
const middlewares = [];

if (__DEV__) {
  middlewares.push(createLogger());
}

/*--------  reducers ----------*/
const persistedReducer = persistReducer(persistConfig, rootReducer);

/*-------- store ----------*/
export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares, ...[thunk, promise, array]),
);

/*-------- persistor ----------*/
export const persistor = persistStore(store, {}, () => {
  /* ------------- system ------------- */
  let sysLang = RNLocalize.getLocales();

  /* ------------- axois ------------- */
  Axios.defaults.baseURL = config.API_BASE_URL;
  Axios.defaults.headers.post['Content-Type'] = 'application/json';
  Axios.defaults.headers.put['Content-Type'] = 'application/json';
  Axios.defaults.headers.common['X-Api-Key'] = config.API_KEY;

  /* ------------- check language ------------- */
  AsyncStorage.getItem(AppConst.LANGUAGE).then((value) => {
    if (value) {
      i18n.locale = value;
      Axios.defaults.headers.common['X-localization'] = value;
    } else {
      i18n.locale = sysLang[0].languageCode;
      Axios.defaults.headers.common['X-localization'] = sysLang[0].languageCode;
    }
  });
  CheckOTAUpdateStack();
  return store;
});
