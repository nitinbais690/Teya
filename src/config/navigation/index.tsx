import {ScreenName} from '../../utils/contants';
import {navigatorRoot, setSideMenuWithRoot} from './navigatorOption';

/*----------- rootstack  ----------*/
export const CheckOTAUpdateStack = () =>
  navigatorRoot(ScreenName.CHECK_OTA_UPDATE);
export const introSlidesStack = (isDarkMode: boolean) =>
  navigatorRoot(ScreenName.APP_INTRO_SLIDES, {isDarkMode});
export const authenticateStack = (isDarkMode: boolean) =>
  navigatorRoot(ScreenName.LOGIN, {isDarkMode});

export const TACShowStack = (isDarkMode: boolean) =>
  navigatorRoot(ScreenName.TAC, {isDarkMode});

/*-------- root stack with drawer  ----------*/
export const dashboardStack = (isDarkMode: boolean) =>
  setSideMenuWithRoot(ScreenName.DASHBOARD, ScreenName.DRAWER_COMPONENT, {
    isDarkMode,
  });
