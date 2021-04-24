import React, {useEffect} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {Navigation} from 'react-native-navigation';

/* ------------- utils ------------- */
import {Theme, getFontStyle} from 'utils/index';

/* ------------- styles ------------- */
import styles from './styles';
import globalStyle from 'config/globalStyle';

/* ------------- library ------------- */
import LottieView from 'lottie-react-native';
import i18n from 'config/i18n';

/* ------------- interfaces ------------- */
import {ErrorProps} from 'interfaces/components';

/* ------------- alert ------------- */
function NavigationAlert(props: ErrorProps) {
  /* ------------- error ------------- */
  let {isError, componentId, showDuration, isDarkMode, message} = props;

  /* ------------- did mount ------------- */
  useEffect(() => {
    if (showDuration) {
      setTimeout(() => {
        Navigation.dismissOverlay(componentId);
      }, showDuration);
    } else {
      setTimeout(() => {
        Navigation.dismissOverlay(componentId);
      }, 2000);
    }
  }, []);

  let backColorObj = {backgroundColor: Theme(isDarkMode).whiteF8};
  let textColor = isError ? Theme(false).secondary : Theme(false).green['EC'];

  /* ------------- did mount ------------- */
  return (
    <View style={styles.errorView}>
      <SafeAreaView style={backColorObj}>
        <View
          style={[
            styles.errorContainer,
            globalStyle.rowCenter,
            backColorObj,
            {borderBottomColor: textColor},
          ]}>
          {/* ------------- error icon ------------- */}
          <View>
            <LottieView
              style={styles.iconStyle}
              source={
                isError
                  ? require('../../assets/loaderjson/error.json')
                  : require('../../assets/loaderjson/success.json')
              }
              autoPlay={true}
              loop={true}
            />
          </View>

          {/* ------------- message ------------- */}
          <View>
            <Text
              numberOfLines={3}
              style={[
                styles.messageText,
                getFontStyle(i18n.locale).semibold,
                {
                  color: textColor,
                },
              ]}>
              {message ? message : 'error'}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default NavigationAlert;
