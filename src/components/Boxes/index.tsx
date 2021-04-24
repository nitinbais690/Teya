import React from 'react';
import {Pressable, TouchableOpacity, Image, Text, View} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- library ------------- */
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';

/* ------------- helper ------------- */
import {getFontStyle, getScaleSize, ScreenWidth, Theme} from 'utils/index';
import {uploadImageOption} from 'utils/listArrays';
import i18n from 'config/i18n';
import config from 'config/index';
import {reasonFormat} from 'utils/controller';

/* ------------- components ------------- */
import RatingContainer from 'components/Rating';
import Loader from 'components/Loaders';
import MainButton from 'components/Buttons';

/* ------------- interfaces ------------- */
import {
  LangaugeBoxProps,
  ProfileBoxProps,
  BoxProps,
  CancelRowProps,
  ConfirmBoxProps,
} from 'interfaces/components';

/* ------------- Components Define ------------- */
export const CheckBox = ({
  isActive,
  item,
  index,
  onPress,
  isDarkMode,
}: CancelRowProps) => {
  let {title, titleAr} = reasonFormat(item);
  let titleOption = i18n.locale === 'ar' ? titleAr : title;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.checkBoxContainer}
      onPress={onPress}>
      <View
        style={[
          styles.boxCircleStyle,
          {
            borderColor:
              isActive === index
                ? Theme(isDarkMode).primary
                : Theme(isDarkMode).grayB8,
          },
        ]}>
        {isActive === index && (
          <View
            style={[
              styles.checkedCircle,
              {
                backgroundColor:
                  isActive === index
                    ? Theme(isDarkMode).primary
                    : Theme(isDarkMode).grayB8,
              },
            ]}
          />
        )}
      </View>

      {/* ------------- cancel ------------- */}
      <View style={styles.checkBoxView}>
        <Text
          style={[
            styles.checkText,
            {color: Theme(isDarkMode).black22},
            getFontStyle(i18n.locale).normal,
          ]}>
          {titleOption ? titleOption : item.optionText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

/* ------------- create a component ------------- */
export const LangaugeBox = ({
  isActive,
  item,
  onPress,
  isDarkMode,
}: LangaugeBoxProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        globalStyle.rowCenter,
        {backgroundColor: Theme(isDarkMode).whiteF8},
        styles.langBox,
      ]}>
      {/* ------------- ------------ */}
      <View style={styles.subView}>
        <Text
          style={[
            styles.subtitleText,
            {
              color: isActive
                ? Theme(isDarkMode).primary
                : Theme(isDarkMode).black00,
            },
            getFontStyle(i18n.locale).bold,
          ]}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

/* ------------- create a component ------------- */
export const CircleProfileImage = ({
  url,
  onPress,
  isDarkMode,
  name,
  degination,
  ratingCount,
  isHorizental,
}: ProfileBoxProps) => {
  let isShowDegination = false;
  if (degination) {
    isShowDegination = true;
  }
  return (
    <View
      style={[
        {
          backgroundColor: isHorizental
            ? 'transparent'
            : Theme(isDarkMode).whiteF8,
        },
        !isHorizental && onPress && styles.circleView,
        isHorizental && globalStyle.rowCenter,
      ]}>
      {isHorizental && (
        <Pressable
          style={[
            styles.leftIconStyle,
            {
              backgroundColor: Theme(isDarkMode).grayEE,
              transform: [{rotate: i18n.locale === 'ar' ? '180deg' : '0deg'}],
            },
          ]}
          onPress={onPress}>
          <Image
            style={globalStyle.contain}
            source={require('../../assets/icons/back.svg')}
          />
        </Pressable>
      )}
      <View
        style={[
          isHorizental
            ? styles.smallImage
            : onPress
            ? styles.circleView
            : styles.squareStyle,
        ]}>
        <Image
          style={[globalStyle.cover, onPress && styles.imageStyle]}
          source={url ? {uri: url} : config.logoUrl}
        />
      </View>

      {/* ------------- image------------ */}
      {!isHorizental && onPress ? (
        <Pressable
          onPress={onPress}
          style={[
            styles.iconStyle,
            {backgroundColor: Theme(isDarkMode).white},
          ]}>
          <Image
            style={globalStyle.cover}
            source={require('../../assets/icons/camera.svg')}
          />
        </Pressable>
      ) : (
        <View style={styles.bottomTextView}>
          <View>
            <Text
              style={[
                isHorizental ? styles.smallTitleText : styles.titleText,
                getFontStyle(i18n.locale).bold,
                {color: Theme(isDarkMode).black00},
              ]}>
              {name}
            </Text>
          </View>

          {/* ------------- degination------------ */}
          {isShowDegination && (
            <View style={styles.degiView}>
              <Text
                style={[
                  styles.degiText,
                  getFontStyle(i18n.locale).normal,
                  {color: Theme(isDarkMode).grayB8},
                ]}>
                {degination}
              </Text>
            </View>
          )}

          {/* ------------- degination ------------ */}
          {!isHorizental && (
            <RatingContainer
              isDarkMode={isDarkMode}
              ratingCount={ratingCount}
            />
          )}
        </View>
      )}
    </View>
  );
};

/* ------------- create a component ------------- */
export const ImageBox = ({
  url,
  onCancel,
  onPress,
  isLoading,
  isDeleting,
  isDarkMode,
  OnPressDelete,
  index,
  isShow,
  hideDelete,
}: BoxProps) => {
  return (
    <View
      style={[
        styles.mainBox,
        index % 2 === 0 && {marginRight: getScaleSize(10)},
      ]}>
      <View
        style={[
          styles.boxView,

          {backgroundColor: Theme(isDarkMode).white},
          onCancel && {
            ...styles.pickerStyle,
            padding: isShow ? getScaleSize(40) : getScaleSize(15),
            borderColor: Theme(isDarkMode).gray99,
          },
          isShow ? styles.boxStyle2 : styles.boxStyle1,
        ]}>
        <Pressable onPress={onPress}>
          <FastImage
            style={onCancel ? globalStyle.contain : globalStyle.cover}
            resizeMode={
              onCancel
                ? FastImage.resizeMode.contain
                : FastImage.resizeMode.cover
            }
            source={
              url ? {uri: url} : require('../../assets/icons/gallery_icon.svg')
            }
          />
        </Pressable>
        <View style={styles.loaderView}>
          {isLoading ? (
            <Loader size={50} />
          ) : (
            isDeleting === index && <Loader size={50} />
          )}
        </View>
      </View>

      {/* ------------- delete ------------- */}
      {!hideDelete && (
        <Pressable
          onPress={OnPressDelete}
          style={[
            styles.deleteIcon,
            {
              backgroundColor: Theme(isDarkMode).white,
              right: isShow
                ? ScreenWidth / 4 - getScaleSize(20)
                : getScaleSize(25),
            },
          ]}>
          <Icon
            name={'circle-with-cross'}
            size={getScaleSize(25)}
            color={Theme(isDarkMode).secondary}
          />
        </Pressable>
      )}
    </View>
  );
};

/* ------------- create a component ------------- */
const ConfirmBox = ({
  onCancel,
  heading,
  subtitle,
  onPress,
  isVisible,
  isDarkMode,
  isShow,
  isConfirmToSend,
  type,
  url,
  isLoading,
}: ConfirmBoxProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onCancel}
      backdropOpacity={0.5}
      backdropColor={Theme(isDarkMode).black00}
      onBackdropPress={onCancel}>
      <View
        style={[
          styles.boxContainer,
          {backgroundColor: Theme(isDarkMode).whiteF8},
        ]}>
        <View style={styles.topImage}>
          {/* ------------- headingt ------------- */}
          <View>
            <Text
              style={[
                styles.headingText,
                {color: Theme(isDarkMode).black00, alignSelf: 'center'},
                getFontStyle(i18n.locale).bold,
              ]}>
              {heading}
            </Text>
          </View>

          {/* ------------- subtitle ------------- */}
          <View style={styles.subtitleDesc}>
            <Text
              style={[
                styles.subtitleText,
                {color: Theme(isDarkMode).gray99},
                getFontStyle(i18n.locale).normal,
              ]}>
              {subtitle}
            </Text>
          </View>

          {/* ------------- message preview ------------- */}
          {isConfirmToSend && (
            <View style={styles.subtitleDesc}>
              {type === 4 && (
                <View style={styles.imageContainer}>
                  <FastImage source={{uri: url}} style={globalStyle.contain} />
                </View>
              )}
            </View>
          )}
        </View>

        {/* ------------- options ------------- */}
        <View style={globalStyle.rowSpaceEvently}>
          {!isShow ? (
            uploadImageOption().map((op, key) => {
              return (
                <Pressable
                  onPress={() => onPress(op.isCamera)}
                  style={[
                    styles.optionBox,
                    {backgroundColor: Theme(isDarkMode).white},
                  ]}
                  key={key}>
                  <LottieView
                    style={styles.optionImage}
                    source={op.url}
                    autoPlay={true}
                    loop={true}
                  />

                  {/* ------------- option text ------------- */}
                  <View>
                    <Text
                      style={[
                        styles.subtitleText,
                        {color: Theme(isDarkMode).black00},
                        getFontStyle(i18n.locale).semibold,
                      ]}>
                      {op.option}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <View style={[globalStyle.rowSpaceBetween]}>
              <View style={styles.buttonStyle}>
                <MainButton
                  isDarkMode={isDarkMode}
                  titleColor={Theme(false).white}
                  backgroundColor={Theme(isDarkMode).secondary}
                  title={isConfirmToSend ? i18n.t('cancel') : i18n.t('no')}
                  onPress={onCancel}
                />
              </View>

              <View style={styles.buttonStyle}>
                <MainButton
                  isDarkMode={isDarkMode}
                  titleColor={Theme(false).white}
                  isLoading={isLoading}
                  title={isConfirmToSend ? i18n.t('send') : i18n.t('yes')}
                  onPress={onPress}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

/* ------------- make this component available to the app ------------- */
export default ConfirmBox;
