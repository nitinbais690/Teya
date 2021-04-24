import buildReducer from './buildReducer';

/* ------------- action type ------------- */
import * as types from '../actions/actionTypes';

/* ------------- initails ------------- */
const otherState = {
  isIntroSlideFinished: false,
  isDarkMode: false,
  priceWithTax: false,
  isOffline: false,
  activeCurrency: false,
  isTacAccepted: false,
};

/* ------------- reducer ------------- */
export const otherReducer = buildReducer(otherState, {
  /* ------------- app intro  ------------- */
  [types.INTRO_COMPLETE](state: any, action: any) {
    return {
      ...state,
      isIntroSlideFinished: action.payload,
    };
  },

  /* ------------- app intro  ------------- */
  [types.TAC_ACCECPTED](state: any, action: any) {
    return {
      ...state,
      isTacAccepted: action.payload,
    };
  },

  /* ------------- current currecy  ------------- */
  [types.CURRENT_CURRENCY](state: any, action: any) {
    return {
      ...state,
      activeCurrency: action.payload,
    };
  },

  /* -------------  isDark theme  ------------- */
  [types.IS_THEME_CHANGE](state: any, action: any) {
    return {
      ...state,
      isDarkMode: action.payload,
    };
  },
});
