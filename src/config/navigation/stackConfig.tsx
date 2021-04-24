import i18n from 'config/i18n';
import {Theme} from 'utils/index';

/*-------- status bar   ----------*/
export function StatusBarColor(passProps) {
  let statusBarColor: string = Theme(false).white;
  let drawerStatusBarColor: string = Theme(false).white;
  if (passProps) {
    if (passProps.drawerStatusBarColor) {
      drawerStatusBarColor = passProps.drawerStatusBarColor;
    }
    if (passProps.statusBarColor) {
      statusBarColor = passProps.statusBarColor;
    }
  }
  return {
    statusBar: {backgroundColor: statusBarColor, style: 'white'},
    drawerStatusBarColor,
  };
}

/*-------- status bar   ----------*/
export function SideMenuDirection() {
  let obj = i18n.locale === 'ar' ? 'right' : 'left';

  return obj;
}

/*-------- defaultNavigationStyle  ----------*/
export function defaultNavigationStyle(
  passProps: {isDarkMode: boolean},
  isDrawer?: boolean,
) {
  let isDarkMode = false;
  if (passProps?.isDarkMode) {
    isDarkMode = true;
  }

  return {
    statusBar: {
      visible: true,
      style: isDarkMode ? 'light' : 'dark',
      hideWithTopBar: true,
      drawBehind: false,
      blur: true,
      backgroundColor: isDrawer
        ? Theme(isDarkMode, isDarkMode).primary
        : Theme(isDarkMode).whiteF8,
    },
    topBar: {
      visible: false,
      height: 0,
    },
    animations: {
      push: {
        waitForRender: true,
      },
    },
  };
}

/*-------- navigationStyleWithTopBar  ----------*/
export function navigationStyleWithTopBar(title: string, passProps: any) {
  let isDarkMode = false;
  if (passProps?.isDarkMode) {
    isDarkMode = true;
  }
  return {
    statusBar: {
      visible: true,
      style: isDarkMode ? 'light' : 'dark',
      hideWithTopBar: false,
      blur: false,
      backgroundColor: Theme(isDarkMode).whiteF8,
    },
    topBar: {
      visible: true,
      height: 0,
      title: {
        text: title,
      },
    },
    animations: {
      push: {
        waitForRender: true,
      },
    },
  };
}
