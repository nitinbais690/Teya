import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useExitApp} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- components ------------- */
import MainButton from 'components/Buttons';
import Header from 'components/Bars';

/* ------------- library ------------- */
import {WebView} from 'react-native-webview';
import RNExitApp from 'react-native-exit-app';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*--------- navigation ------*/
import {authenticateStack} from 'config/navigation/index';
import config from 'config/index';

/*------ interfaces ------*/
import {TACProps} from 'interfaces/containers';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';

/*------ containers ------*/
const TAC: React.FunctionComponent<TACProps> = (props) => {
  let {isTacAccepted, isDarkMode} = props;

  /*-------- backpress ----------*/
  useBackButton(useExitApp, props);

  useEffect(() => {
    if (props.isTacAccepted) {
      authenticateStack(isDarkMode);
    }
  }, [props.isTacAccepted]);

  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: Theme(props.isDarkMode).whiteF8},
      ]}>
      {/*------ Header ------*/}
      <Header title={i18n.t('terms_and_condition')} componentId={''} />

      {/*------ lanaguage ------*/}
      <View style={styles.mainContainer}>
        <WebView style={globalStyle.container} source={{uri: config.tacUrl}} />

        {/*------ MainButton ------*/}
        <View style={styles.buttonStyle}>
          {/*------ reject ------*/}
          <MainButton
            isDarkMode={props.isDarkMode}
            titleColor={Theme(props.isDarkMode).gray['E8']}
            title={i18n.t('i_dont_agree')}
            backgroundColor={Theme(props.isDarkMode).grayD5}
            onPress={() => {
              RNExitApp.exitApp();
            }}
          />

          {/*------ accept ------*/}
          <MainButton
            isDarkMode={props.isDarkMode}
            titleColor={Theme(false).white}
            title={i18n.t('i_agree')}
            onPress={() => {
              props.actions.isTACAccecpted();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

/* ------------- received  props ------------- */
const mapStateToProps = (state: any) => ({
  isTacAccepted: state.otherReducer.isTacAccepted,
  isDarkMode: state.otherReducer.isDarkMode,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/* ------------- export container ------------- */
export default connect(mapStateToProps, mapDispatchToProps)(TAC);
