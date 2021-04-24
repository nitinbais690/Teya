import React, {PureComponent} from 'react';
import {I18nManager} from 'react-native';

/*-------- library ----------*/
import AsyncStorage from '@react-native-async-storage/async-storage';

/*-------- components ----------*/
import Loader from 'components/Loaders';

/*-------- utils ----------*/
import {AppConst} from 'utils/contants';
import config from 'config/index';
import i18n from 'config/i18n';
import { configAxois } from 'config/index';

/*-------- codepush ----------*/
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

/*-------- language ----------*/
import * as RNLocalize from 'react-native-localize';
import RNRestart from 'react-native-restart';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*--------- navigation ------*/
import {
  authenticateStack,
  dashboardStack,
  TACShowStack,
  introSlidesStack,
} from 'config/navigation/index';

/*-------- interfaces ----------*/
import {CheckOTAUpdateProps} from 'interfaces/containers';

/*-------- codepush ----------*/
let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {appendReleaseDescription: true},
};

class CheckOTAUpdate extends PureComponent<CheckOTAUpdateProps> {
  constructor(props: CheckOTAUpdateProps) {
    super(props);
    OneSignal.setAppId(config.oneSignalAppId);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    this.state = {
      progress: false,
    };
  }

  /* ------------- check navigation ------------- */
  CheckNavigation = () => {
    let {
      isIntroSlideFinished,
      isDarkMode,
      isTacAccepted,
      loginSuccess,
    } = this.props;

    if (loginSuccess?.data?.user?.auth_token) {
      configAxois(loginSuccess)
      dashboardStack(isDarkMode);
    } else if (isIntroSlideFinished) {
      if (!isTacAccepted) {
        TACShowStack(isDarkMode);
      } else {
        authenticateStack(isDarkMode);
      }
    } else {
      introSlidesStack(isDarkMode);
    }
  };

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({syncMessage: 'Checking for update.'});
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({syncMessage: 'Downloading package.'});
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({syncMessage: 'Awaiting user action.'});
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({syncMessage: 'Installing update.'});
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.CheckNavigation();
        this.setState({syncMessage: 'App up to date.', progress: false});
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: 'Update cancelled by user.',
          progress: false,
        });
        this.CheckNavigation();
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: 'Update installed and will be applied on restart.',
          progress: false,
        });
        this.CheckNavigation();
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: 'An unknown error occurred.',
          progress: false,
        });
        this.CheckNavigation();
        break;
    }
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  handleUpdate = () => {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  };

  /*-------- progress ----------*/
  codePushDownloadDidProgress(progress: string) {
    this.setState({progress});
  }

  /*-------- rtl change ----------*/
  changeToRTL = async (language: string) => {
    if (language !== 'ar') {
      if (I18nManager.isRTL) {
        await I18nManager.forceRTL(false);
        RNRestart.Restart();
      }
    } else {
      if (!I18nManager.isRTL) {
        await I18nManager.forceRTL(true);
        RNRestart.Restart();
      }
    }
  };

  /*-------- value ----------*/
  getValue = async () => {
    let lang = await AsyncStorage.getItem(AppConst.LANGUAGE);
    let sysLang = RNLocalize.getLocales();
    if (lang) {
      this.changeToRTL(lang);
    } else {
      i18n.locale = sysLang[0].languageCode;
      this.changeToRTL(sysLang[0].languageCode);
      AsyncStorage.setItem(AppConst.LANGUAGE, sysLang[0].languageCode);
    }
  };

  /*-------- mount ----------*/
  componentDidMount = async () => {
    this.getValue();
    this.handleUpdate();
    this.props.actions.currentCurrencyAction(i18n.t('sar'));
  };

  render() {
    return <Loader />;
  }
}

const CheckOTAUpdateCodePush = CodePush(codePushOptions)(CheckOTAUpdate);

/* ------------- received  props ------------- */
const mapStateToProps = (state: any) => ({
  loginSuccess: state.authReducer.loginSuccess,

  isIntroSlideFinished: state.otherReducer.isIntroSlideFinished,
  isDarkMode: state.otherReducer.isDarkMode,
  isTacAccepted: state.otherReducer.isTacAccepted,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckOTAUpdateCodePush);
