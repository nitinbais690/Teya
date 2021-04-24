import React from 'react';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- icon ------------- */
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

/* ------------- components ------------- */
import MainButton from 'components/Buttons';
import SwitchContainer from 'components/Switch';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/* ------------- config ------------- */
import config from 'config/index';
import i18n from 'config/i18n';

/* ------------- Navigation ------------- */
import {Navigation} from 'react-native-navigation';
import {
  changeSideMenuVisibility,
  navigateFromDrawerToOther,
  navigatorReset,
} from 'config/navigation/navigatorOption';

/* ------------- utils ------------- */
import {DrawerOptions} from 'utils/listArrays';
import {dashboardStack} from 'config/navigation';
import {ScreenName} from 'utils/contants';
import {imageURL, onLogout} from 'utils/helperFun';
import {Theme, getFontStyle} from 'utils/index';
import {getScaleSize} from 'utils/index';
import {userDetails} from 'utils/controller';

/* ------------- interfaces ------------- */
import {
  DrawerHeadProps,
  DrawerOptionProps,
  DrawerProps,
} from 'interfaces/components';

/*------ export container ------*/
const DrawerHead = ({
  name,
  isDarkMode,
  onPress,
  profileImageUrl,
}: DrawerHeadProps) => {
  return (
    <View style={globalStyle.rowSpaceBetween}>
      <View style={globalStyle.rowCenter}>
        {/*------ image ------*/}
        <Pressable
          onPress={() => {
            onPress();
          }}
          style={[styles.userImage]}>
          <Image
            source={profileImageUrl ? {uri: profileImageUrl} : config.logoUrl}
            style={globalStyle.cover}
          />
        </Pressable>

        {/*------ middle ------*/}
        <View>
          <Text
            style={[
              styles.nameText,
              {color: Theme(isDarkMode, isDarkMode).white},
              getFontStyle(i18n.locale).semibold,
            ]}>
            {name}
          </Text>
        </View>
      </View>

      {/*------ close ------*/}
      <Pressable
        onPress={() => onPress(true)}
        style={[
          styles.iconStyle,
          {
            backgroundColor: Theme(isDarkMode, isDarkMode).white,
            shadowColor: Theme(isDarkMode).gray99,
          },
        ]}>
        <Icon
          size={getScaleSize(25)}
          name={'close'}
          color={Theme(isDarkMode).secondary}
        />
      </Pressable>
    </View>
  );
};

/*------ export container ------*/
const DrawerOption = ({option, isDarkMode, onPress}: DrawerOptionProps) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[globalStyle.rowCenter, styles.optionRow]}>
        <View style={styles.optionIcon}>
          <FontAwesomeIcon
            size={getScaleSize(25)}
            name={option.iconName}
            color={Theme(isDarkMode, isDarkMode).white}
          />
        </View>

        <View style={styles.optionView}>
          <Text
            style={[
              styles.optionText,
              {color: Theme(isDarkMode, isDarkMode).white},
              getFontStyle(i18n.locale).semibold,
            ]}>
            {option.title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

/* ------------- create a component ------------- */
const DrawerComponent = ({
  rootStack,
  isDarkMode,
  actions,
  componentId,
  userInfoSuccess,
}: DrawerProps) => {
  let {fullName, username, profileImageUrl, userUuid} = userDetails(
    userInfoSuccess,
  );
  return (
    <SafeAreaView
      style={[
        globalStyle.contain,
        {backgroundColor: Theme(isDarkMode, isDarkMode).primary},
      ]}>
      <View style={styles.mainContainer}>
        {/*------ DrawerHead ------*/}
        <DrawerHead
          isDarkMode={isDarkMode}
          profileImageUrl={
            profileImageUrl ? imageURL(userUuid, profileImageUrl) : ''
          }
          name={fullName ? 'Hi ' + fullName : username ? username : 'Hi'}
          onPress={(isClose: boolean) => {
            isClose
              ? changeSideMenuVisibility(componentId, false)
              : navigateFromDrawerToOther(
                  rootStack,
                  ScreenName.PROFILE,
                  isDarkMode,
                  {},
                );
          }}
        />

        {/*------ options ------*/}
        <View style={styles.optionContainer}>
          {DrawerOptions().map((option, index) => {
            return (
              <DrawerOption
                key={option.uuid}
                option={option}
                isDarkMode={isDarkMode}
                onPress={() => {
                  index === 0
                    ? dashboardStack(isDarkMode)
                    : navigateFromDrawerToOther(
                        rootStack,
                        option.navigateTo,
                        false,
                        {isDarkMode},
                      );
                }}
              />
            );
          })}

          {/*------ dark mode ------*/}
          <View
            style={[
              globalStyle.rowSpaceBetween,
              {borderTopColor: Theme(isDarkMode, isDarkMode).white},
              styles.modeView,
            ]}>
            {/* <View style={styles.optionView}>
              <Text
                style={[
                  styles.optionText,
                  {color: Theme(isDarkMode, isDarkMode).white},
                  getFontStyle(i18n.locale).semibold,
                ]}>
                {i18n.t('dark_mode')}
              </Text>
            </View> */}

            {/* ------------- SwitchContainer ------------- */}
            {/* <SwitchContainer
              isDarkMode={isDarkMode}
              isActive={isDarkMode}
              onPress={() => {
                Navigation.setDefaultOptions({
                  statusBar: {
                    style: isDarkMode ? 'light' : 'dark',
                  },
                });
                actions.changeAppTheme(isDarkMode);
              }}
            /> */}
          </View>
        </View>
      </View>
      {/*------ logout ------*/}
      <View style={styles.buttonContainer}>
        <MainButton
          isLoading={false}
          isDarkMode={isDarkMode}
          onPress={() => onLogout(actions)}
          title={i18n.t('logout')}
          backgroundColor={Theme(isDarkMode, isDarkMode).white}
          titleColor={Theme(isDarkMode, isDarkMode).secondary}
        />

        {/*------ versionView ------*/}
        <View style={[styles.versionView, globalStyle.rowCenter]}>
          <View>
            <Text
              style={[
                styles.versionText,
                {color: Theme(isDarkMode, isDarkMode).white},
                getFontStyle(i18n.locale).semibold,
              ]}>
              {i18n.t('version')}
            </Text>
          </View>

          <View>
            <Text
              style={[
                styles.versionText,
                {color: Theme(isDarkMode, isDarkMode).white},
                getFontStyle(i18n.locale).semibold,
              ]}>
              {' ' + config.versionCode}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  userInfoSuccess: state.profileReducer.userInfoSuccess,
  userInfoError: state.profileReducer.userInfoError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
