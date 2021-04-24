import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';
import {getScaleSize} from 'utils/index';

/*--------- library ------*/
import Swiper from 'react-native-swiper';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Axios from 'axios';

/*--------- icon ------*/
import Icon from 'react-native-vector-icons/FontAwesome5';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import {introList} from 'utils/listArrays';
import {SlideItem} from 'interfaces/components';
import i18n from 'config/i18n';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*--------- compoents ------*/
import IntroSlide from 'components/IntroSlide';

/*--------- navigation ------*/
import {
  authenticateStack,
  dashboardStack,
  TACShowStack,
} from 'config/navigation/index';

interface Props {
  isIntroSlideFinished: any;
  isTacAccepted: boolean;
  actions: any;
  isDarkMode: boolean;
  loginSuccess: any;
}

/*------ containers ------*/
const IntroSlides = (props: Props) => {
  let {
    actions,
    isDarkMode,
    isTacAccepted,
    isIntroSlideFinished,
    loginSuccess,
  } = props;

  const [isActiveIntro, setIsActiveIntro] = useState(0);

  useEffect(() => {
    if (loginSuccess?.data?.user?.auth_token) {
      Axios.defaults.headers.common['Authorization'] =
        'Bearer ' + loginSuccess.data.user.auth_token;
      dashboardStack(isDarkMode);
    } else if (isIntroSlideFinished) {
      
      if (!isTacAccepted) {
        TACShowStack(isDarkMode);
      } else {
        authenticateStack(isDarkMode);
      }
    }
  }, [isIntroSlideFinished, loginSuccess]);

  /* ------------- next ------------- */
  const onPressNext = (index: number, isComplete?: boolean) => {
    setIsActiveIntro(index);
    isComplete && actions.appIntroCompleteAction();
  };

  return (
    <SafeAreaView
      style={[
        globalStyle.centerContainer,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Theme(isDarkMode).whiteF8}
      />
      {/* ------------- swiper ------------- */}
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: Theme(isDarkMode).whiteF8},
        ]}>
        <Swiper
          showsButtons={false}
          showsPagination={false}
          loop={false}
          index={isActiveIntro}
          onIndexChanged={(isActiveIntro: number) =>
            onPressNext(isActiveIntro, isActiveIntro === 3)
          }>
          {introList().map((slide: SlideItem, index) => {
            return (
              <IntroSlide key={slide.uuid} slide={slide} theme={isDarkMode} />
            );
          })}
        </Swiper>
      </View>

      {/* ------------- circle button ------------- */}
      <View style={styles.indicatorContainer}>
        <TouchableOpacity
          onPress={() => onPressNext(isActiveIntro + 1, isActiveIntro === 3)}
          style={styles.circleContainer}>
          <AnimatedCircularProgress
            size={getScaleSize(90)}
            width={getScaleSize(2)}
            fill={25 * (isActiveIntro + 1)}
            tintColor={Theme(isDarkMode).primary}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor={Theme(isDarkMode).white}>
            {(fill) => (
              <View
                style={[
                  styles.circleView,
                  {backgroundColor: Theme(isDarkMode).primary},
                  {
                    transform: [
                      {rotate: i18n.locale === 'ar' ? '0deg' : '180deg'},
                    ],
                  },
                ]}>
                <Icon
                  name={'chevron-left'}
                  color={Theme(isDarkMode).whiteF8}
                  size={getScaleSize(20)}
                />
              </View>
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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

/* ------------- export container ------------- */
export default connect(mapStateToProps, mapDispatchToProps)(IntroSlides);
