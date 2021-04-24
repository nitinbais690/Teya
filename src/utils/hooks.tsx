import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import RNExitApp from 'react-native-exit-app';

/*----------- navigation ----------*/
import {navigatorPop, navigatorPopTo} from 'config/navigation/navigatorOption';

/*----------- useBackButton ----------*/
export function useBackButton(handler: any, props: any) {
  // Frustration isolated! Yay! 🎉
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      handler(props);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
}

/*----------- exit app ----------*/
export const useExitApp = () => {
  RNExitApp.exitApp();
  return true;
};

/*----------- go back ------------*/
export const useGoBack = (props: any) => {
  if (props.fromCreate) {
    props.componentId && navigatorPop(props);
  } else {
    props.componentId && navigatorPopTo(props);
  }

  return true;
};

