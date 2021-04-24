import React from 'react';
import {
  Pressable,
  Text,
  Image,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- icon ------------- */
import AntDesign from 'react-native-vector-icons/AntDesign';

/* ------------- config ------------- */
import i18n from 'config/i18n';
import config from 'config/index';

/* ------------- utils ------------- */
import {ScreenWidth, Theme} from 'utils/index';
import {getScaleSize, getFontStyle} from 'utils/index';
import {userDetails} from 'utils/controller';
import {imageURL} from 'utils/helperFun';
import {navigatorPush} from 'config/navigation/navigatorOption';
import {ScreenName} from 'utils/contants';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/* ------------- interfaces ------------- */
import {HeaderProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const Header = ({
  onDrawerOpen,
  onBackPress,
  title,
  isDarkMode,
  userInfoSuccess,
  componentId,
  isTextAreaHeader,
  isProfile,
  isNotification,
}: HeaderProps) => {
  let {profileImageUrl, userUuid} = userDetails(userInfoSuccess);
  return (
    <View>
      {Platform.OS === 'ios' && (
        <SafeAreaView style={{backgroundColor: Theme(isDarkMode).whiteF8}} />
      )}
      <View style={[globalStyle.rowSpaceBetween, styles.headerContainer]}>
        {isTextAreaHeader ? (
          <Pressable onPress={onBackPress}>
            <Text
              style={[
                styles.leftText,
                {color: Theme(isDarkMode).secondary},
                getFontStyle(i18n.locale).semibold,
              ]}>
              {i18n.t('cancel')}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.leftIconStyle,
              {backgroundColor: Theme(isDarkMode).grayEE},
            ]}
            onPress={onDrawerOpen ? onDrawerOpen : onBackPress}>
            <Image
              style={[
                globalStyle.contain,
                !onDrawerOpen && {
                  transform: [
                    {rotate: i18n.locale === 'ar' ? '180deg' : '0deg'},
                  ],
                },
              ]}
              source={
                onDrawerOpen
                  ? require('../../assets/icons/menu_lines.svg')
                  : require('../../assets/icons/back.svg')
              }
            />
          </Pressable>
        )}

        {/* ------------- title middle ------------- */}
        <View style={[styles.textView, {marginLeft: ScreenWidth / 12}]}>
          <Text
            numberOfLines={2}
            style={[
              styles.headingText,
              {color: Theme(isDarkMode).black00},
              getFontStyle(i18n.locale).semibold,
            ]}>
            {title}
          </Text>
        </View>

        {isTextAreaHeader ? (
          <Pressable style={styles.saveView} onPress={onDrawerOpen}>
            <Text
              style={[
                styles.leftText,
                {color: Theme(isDarkMode).primary},
                getFontStyle(i18n.locale).semibold,
              ]}>
              {i18n.t('save')}
            </Text>
          </Pressable>
        ) : (
          <View style={globalStyle.rowCenter}>
            {/* ------------- right ------------- */}
            <Pressable
              onPress={() => {
                !isNotification &&
                  componentId &&
                  navigatorPush(componentId, ScreenName.NOTIFICATION, {
                    isDarkMode,
                  });
              }}>
              <AntDesign
                name={'bells'}
                color={Theme(isDarkMode).black00}
                size={getScaleSize(20)}
              />
            </Pressable>
            {/* ------------- profile ------------- */}
            <Pressable
              onPress={() => {
                !isProfile &&
                  componentId &&
                  navigatorPush(componentId, ScreenName.PROFILE, {isDarkMode});
              }}
              style={styles.profileImage}>
              <Image
                source={
                  profileImageUrl
                    ? {uri: imageURL(userUuid, profileImageUrl)}
                    : config.logoUrl
                }
                style={[globalStyle.cover, styles.coverStyle]}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,

  userInfoSuccess: state.profileReducer.userInfoSuccess,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/* ------------- make this component available to the app ------------- */
export default connect(mapStateToProps, mapDispatchToProps)(Header);
