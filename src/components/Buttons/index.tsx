import React from 'react';
import {Pressable, Animated, TouchableOpacity, Text, View} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- icon ------------- */
import Icon from 'react-native-vector-icons/Entypo';
import {Theme} from 'utils/index';
import {getScaleSize, getFontStyle} from 'utils/index';

/* ------------- loader ------------- */
import Loader from '../Loaders';
import i18n from 'config/i18n';

/* ------------- interfaces ------------- */
import {ButtonProps} from 'interfaces/components';

export const ActionButton = (
  progress: any,
  dragX: any,
  onPressRight: any,
  isRight: number,
  offerItem: any,
) => {
  const trans = isRight
    ? dragX.interpolate({
        inputRange: [-10, 50, 100, 101],
        outputRange: [0, 0, 0, 1],
        extrapolate: 'clamp',
      })
    : dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [0, 0, 0, 1],
        extrapolate: 'clamp',
      });

  return (
    <Animated.View
      style={[
        styles.buttonStyleAc,
        {
          transform: [{translateX: trans}],
          backgroundColor: isRight
            ? Theme(false).primary
            : Theme(false).secondary,
        },
        !isRight ? styles.leftButton : styles.rightButton,
      ]}>
      <TouchableOpacity
        onPress={() => onPressRight(isRight, offerItem)}
        style={styles.buttonStyleAc}>
        <Text
          style={[
            [
              styles.detailsText,
              {color: Theme(false).white},
              getFontStyle(i18n.locale).semibold,
            ],
          ]}>
          {!isRight ? i18n.t('reject') : i18n.t('accept')}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

/* ------------- create a component ------------- */
const MainButton = ({
  isDarkMode,
  isLeftText,
  title,
  onPress,
  backgroundColor,
  titleColor,
  isHideIcon,
  textSize,
  isLoading,
}: ButtonProps) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        !isLeftText && {
          backgroundColor: backgroundColor
            ? backgroundColor
            : Theme(isDarkMode).primary,
          shadowOpacity: 0.4,
          elevation: isLeftText ? 0 : getScaleSize(6),
          shadowColor: backgroundColor
            ? backgroundColor
            : Theme(isDarkMode).primary,
        },
      ]}>
      {isLoading ? (
        <Loader isButtonLoading={true} />
      ) : (
        <Pressable style={styles.buttonStyle} onPress={onPress}>
          <View style={[isLeftText ? globalStyle.rowCenter : styles.textView]}>
            {isHideIcon && isLeftText && (
              <Icon
                name={'plus'}
                color={Theme(isDarkMode).primary}
                style={styles.iconStyle}
              />
            )}

            <View>
              <Text
                style={[
                  {textTransform: isLeftText ? 'uppercase' : 'uppercase'},
                  {
                    color: titleColor ? titleColor : Theme(false).white,
                    fontSize: textSize
                      ? getScaleSize(textSize)
                      : getScaleSize(18),
                  },
                  getFontStyle(i18n.locale).semibold,
                ]}>
                {title}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
};

/* ------------- make this component available to the app ------------- */
export default MainButton;
