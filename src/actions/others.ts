/* ------------- actions types ------------- */
import * as types from './actionTypes';

/* ------------- app intro ------------- */
export const appIntroCompleteAction = () => async (dispatch: any) => {
  dispatch({
    type: types.INTRO_COMPLETE,
    payload: true,
  });
};

/* ------------- app intro ------------- */
export const isTACAccecpted = () => async (dispatch: any) => {
  dispatch({
    type: types.TAC_ACCECPTED,
    payload: true,
  });
};

/* ------------- app intro ------------- */
export const changeAppTheme = (currentMode: boolean) => async (
  dispatch: any,
) => {
  dispatch({
    type: types.IS_THEME_CHANGE,
    payload: !currentMode,
  });
};

/* ------------- change currency ------------- */
export const currentCurrencyAction = (currency: string) => async (
  dispatch: any,
) => {
  dispatch({
    type: types.CURRENT_CURRENCY,
    payload: currency,
  });
};
