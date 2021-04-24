/*------------- navigation --------------*/
import {Navigation} from 'react-native-navigation';
import {defaultNavigationStyle, navigationStyleWithTopBar} from './stackConfig';

/*-------------- utils ---------------*/
import {ScreenHeight, ScreenWidth, Theme} from 'utils/index';
import {ScreenName} from 'utils/contants';
import i18n from 'config/i18n';

/*--------------- for android back ----------------*/
import {Platform} from 'react-native';
import {useExitApp} from 'utils/hooks';

/*------------ push ---------------*/
export const navigatorPush = (
  componentId: string,
  screenName: string,
  passProps?: object,
) => {
  Navigation.push(componentId, {
    component: {
      name: screenName,
      passProps: passProps,
      options: defaultNavigationStyle(passProps),
    },
  });
};

/*------------ top tapbar ---------------*/
export const navigatorPushWithTopBar = ({
  componentId,
  screenName,
  passProps,
  title,
}) => {
  Navigation.push(componentId, {
    component: {
      name: screenName,
      passProps: passProps,
      options: navigationStyleWithTopBar(title, passProps),
    },
  });
};

/*-------- pop  with props ----------*/
export const navigatorPop = (props: {componentId: string}) => {
  Navigation.pop(props.componentId).catch((e) => {
    Platform.OS === 'android' && useExitApp();
  });
};

/*------------ pop  ---------------*/
export const navigatorPopTo = (props: any) => {
  Navigation.popTo(props.componentId);
};

export const navigatorPopToRoot = (props: any) => {
  Navigation.popToRoot(props.componentId);
};

/*-------- rootstack  ----------*/
export const navigatorRoot = (screenName: string, passProps?: object) => {
  Navigation.setRoot({
    root: {
      stack: {
        id: screenName,
        children: [
          {
            component: {
              name: screenName,
              options: defaultNavigationStyle(passProps),
              passProps: passProps,
            },
          },
        ],
      },
    },
  });
};

/*---------- reset ------------*/
export const navigatorReset = (
  componentId: string,
  screenName: string,
  passProps,
) => {
  Navigation.setStackRoot(componentId, [
    {
      component: {
        name: screenName,
        options: defaultNavigationStyle(passProps),
      },
    },
  ]);
};

/*-------- side bar ----------*/
export const setSideMenuWithRoot = (
  screenName: string,
  sideMenuName: string,
  passProps: {isDarkMode: boolean},
) => {
  let isDarkMode = false;
  if (passProps?.isDarkMode) {
    isDarkMode = true;
  }

  Navigation.setRoot({
    root: {
      sideMenu: {
        [i18n.locale === 'ar' ? 'right' : 'left']: {
          component: {
            name: sideMenuName,
            id: sideMenuName,
            passProps: {
              rootStack: screenName,
            },
            options: defaultNavigationStyle(passProps, true),
          },
        },
        center: {
          stack: {
            id: screenName,
            children: [
              {
                component: {
                  name: screenName,
                  options: defaultNavigationStyle(passProps),
                  passProps: passProps,
                },
              },
            ],
          },
        },
        options: {
          sideMenu: {
            [i18n.locale === 'ar' ? 'right' : 'left']: {
              height: ScreenHeight,
              width: ScreenWidth,
            },
          },
          statusBar: {
            visible: true,
            style: isDarkMode ? 'light' : 'dark',
            backgroundColor: Theme(isDarkMode).whiteF8,
          },
        },
      },
    },
  });
};

/*------------ drawer toggle ----------*/
export const changeSideMenuVisibility = (
  componentId: string,
  setVisibility: boolean,
) => {
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      [i18n.locale === 'ar' ? 'right' : 'left']: {
        visible: setVisibility,
      },
    },
  });
};

/*-------- navigate to other from drawer ----------*/
export const navigateFromDrawerToOther = (
  rootStack: string,
  navigationScreen: string,
  isDarkMode: boolean,
  passProps: any,
) => {
  Navigation.push(rootStack, {
    component: {
      name: navigationScreen,
      options: {
        sideMenu: {
          [i18n.locale === 'ar' ? 'right' : 'left']: {
            visible: false,
          },
        },
        topBar: {
          visible: false,
        },
        statusBar: {
          visible: true,
          drawBehind: false,
          style: isDarkMode ? 'light' : 'dark',
          backgroundColor: Theme(isDarkMode).whiteF8,
        },
      },
      passProps: passProps,
    },
  });
};

/*----------- show message -------------*/
export const showMessage = (props: any) => {
  Navigation.showOverlay({
    component: {
      name: ScreenName.MESSAGE_ALERT,
      passProps: props,
      options: {
        layout: {
          componentBackgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  });
};
