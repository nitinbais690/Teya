import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useExitApp} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*--------- components ------*/
import Form from 'components/Form';

/*--------- library ------*/
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OneSignal from 'react-native-onesignal';

/*--------- navigation ------*/
import {dashboardStack} from 'config/navigation';
import {handleError} from 'utils/helperFun';
import { configAxois } from 'config/index';

/*--------- notificitaion ------*/
import {AuthProps} from 'interfaces/containers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppConst} from 'utils/contants';
import {showMessage} from 'config/navigation/navigatorOption';

/*------ containers ------*/
const Auth: React.FunctionComponent<AuthProps> = props => {
  /*------ props ------*/
  let {
    registerError,
    registerSuccess,
    loginSuccess,
    loginError,
    isDarkMode,
  } = props;

  /*------ State ------*/
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /*-------- backpress ----------*/
  useBackButton(useExitApp, props);

  /*------ handle Submit ------*/
  const handleSubmit = (requestBody: any) => {
    setIsLoading(true);
    if (isLoginScreen) {
      loginRequest(requestBody);
    } else {
      props.actions.signUpAction(requestBody);
    }
  };

  /*------ login Request ------*/
  const loginRequest = async (obj: any) => {
    let push_token = await AsyncStorage.getItem(AppConst.ONE_SIGNAL_ID);
    props.actions.loginAction({...obj, push_token});
    !push_token &&
      showMessage({message: 'oneSignal push token missing', isError: true});
  };

  const getPushToken = async () => {
    const deviceState = await OneSignal.getDeviceState();
    if (deviceState?.userId) {
      AsyncStorage.setItem(AppConst.ONE_SIGNAL_ID, deviceState.userId);
    }
  };
  /*------ did mount ------*/
  useEffect(() => {
    if (Platform.OS === 'android') {
      getPushToken();
    } else {
      OneSignal.promptForPushNotificationsWithUserResponse(async response => {
        getPushToken();
      });
    }
  }, []);

  /*------ props ------*/
  useEffect(() => {
    /*------ register ------*/
    if (registerError) {
      handleError(registerError);
      setIsLoading(false);
    }
    if (registerSuccess && !loginSuccess) {
      loginRequest({
        username: registerSuccess.username,
        password: registerSuccess.password,
      });
    }

    /*------ login ------*/
    if (loginSuccess?.data?.user?.auth_token) {
      setIsLoading(false);
      configAxois(loginSuccess)
      dashboardStack(isDarkMode);
    }
    if (loginError) {
      setIsLoading(false);
      handleError(loginError);
    }
  }, [registerError, registerSuccess, loginSuccess, loginError]);

  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      {/*------ Form ------*/}
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Form
            isDarkMode={isDarkMode}
            heading={isLoginScreen ? i18n.t('login') : i18n.t('register')}
            subtitle={
              isLoginScreen
                ? i18n.t('loginSubtitle')
                : i18n.t('signup_subtitle')
            }
            buttonTitle={isLoginScreen ? i18n.t('login') : i18n.t('register')}
            upperButtonTitle={
              isLoginScreen ? i18n.t('create_new_account') : i18n.t('login')
            }
            isLoginScreen={isLoginScreen}
            onSubmit={(obj: any) => {
              handleSubmit(obj);
            }}
            isLoading={isLoading}
            onUpperButton={() => {
              setIsLoginScreen(!isLoginScreen);
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,

  registerSuccess: state.authReducer.registerSuccess,
  registerError: state.authReducer.registerError,
  loginSuccess: state.authReducer.loginSuccess,
  loginError: state.authReducer.loginError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
