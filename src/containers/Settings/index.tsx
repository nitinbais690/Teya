import React, {useState} from 'react';
import {SafeAreaView, I18nManager, View} from 'react-native';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/* ------------- components ------------- */
import {LangaugeBox} from 'components/Boxes';
import MainButton from 'components/Buttons';
import {InputButton} from 'components/Inputs';

/* ------------- library ------------- */
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';
import Header from 'components/Bars';

/*------ navigation ------*/
import {navigatorPop} from 'config/navigation/navigatorOption';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import {LanguageOption} from 'utils/listArrays';
import i18n from 'config/i18n';
import {AppConst} from 'utils/contants';

/*--------  interfaces ----------*/
import {SettingsProps} from 'interfaces/containers';

/*------ containers ------*/
const Settings: React.FunctionComponent<SettingsProps> = (props) => {
  let {isDarkMode, componentId} = props;

  const [state, setState] = useState({
    ...LanguageOption()[i18n.locale === 'ar' ? 1 : 0],
    isActive: i18n.locale === 'ar' ? 1 : 0,
    isShow: false,
  });
  let {isActive, title, isShow} = state;

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);
  
  /*--------  change Language ----------*/
  const changeLanguage = () => {
    if (i18n.locale === LanguageOption()[isActive].value) {
      navigatorPop(props);
    } else {
      i18n.locale = LanguageOption()[isActive].value;
      if (LanguageOption()[isActive].value !== 'ar') {
        AsyncStorage.setItem(AppConst.LANGUAGE, 'en');
        if (I18nManager.isRTL) {
          RNRestart.Restart();
        }
        I18nManager.forceRTL(false);
      } else {
        AsyncStorage.setItem(AppConst.LANGUAGE, 'ar');

        if (!I18nManager.isRTL) {
          RNRestart.Restart();
        }
        I18nManager.forceRTL(true);
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      {/*------ Header ------*/}
      <Header
        title={i18n.t('settings')}
        componentId={componentId}
        onBackPress={() => navigatorPop(props)}
      />

      {/*------ lanaguage ------*/}
      <View style={styles.mainContainer}>
        <View
          style={[{backgroundColor: Theme(isDarkMode).white}, styles.boxStyle]}>
          <InputButton
            showIcon={true}
            isSpaceBetweenContain={true}
            placeholder={title}
            label={i18n.t('langauge_settings')}
            isDarkMode={isDarkMode}
            onChangeText={() => {
              setState({
                ...state,
                isShow: true,
              });
            }}
          />

          {isShow && (
            <View>
              {LanguageOption().map((item, index) => {
                return (
                  <LangaugeBox
                    key={item.uuid}
                    isDarkMode={isDarkMode}
                    item={item}
                    isActive={isActive === index ? true : false}
                    onPress={() => {
                      setState({
                        ...item,
                        isActive: index,
                        isShow: false,
                      });
                    }}
                  />
                );
              })}
            </View>
          )}
        </View>

        {/*------ MainButton ------*/}
        <MainButton
          isDarkMode={isDarkMode}
          titleColor={Theme(false).white}
          title={i18n.t('change_language')}
          onPress={changeLanguage}
        />
      </View>
    </SafeAreaView>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
