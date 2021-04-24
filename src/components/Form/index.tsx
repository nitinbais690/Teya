import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';

/* ------------- helper ------------- */
import styles from './styles';
import {getFontStyle} from 'utils/index';
import {Theme} from 'utils/index';
import i18n from 'config/i18n';

/*------------ components -------------*/
import InputField from '../Inputs';
import MainButton from '../Buttons';
import globalStyle from 'config/globalStyle';
import SwitchContainer from 'components/Switch';

/*------------ utils -------------*/
import {passwordValidation} from 'utils/helperFun';
import {showMessage} from 'config/navigation/navigatorOption';

/*------------ interfaces -------------*/
import {FormProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const Form = ({
  heading,
  subtitle,
  isDarkMode,
  buttonTitle,
  onSubmit,
  upperButtonTitle,
  onUpperButton,
  isLoginScreen,
  isLoading,
}: FormProps) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState(isLoginScreen ? '' : '');
  const [isProvider, setProvider] = useState(false);

  /* ------------- subumit ------------- */
  const handleSubmit = async () => {
    if (userName) {
      let passwordError = await passwordValidation(password);
      if (passwordError.isSuccess) {
        let obj = {
          username: userName,
          password,
          type: isProvider ? 'tutor' : 'normal',
        };
        onSubmit(obj);
      } else {
        showMessage({
          message: passwordError.message,
          isError: true,
          isDarkMode,
        });
      }
    } else {
      showMessage({
        message: i18n.t('user_name_required'),
        isError: true,
        isDarkMode,
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={globalStyle.container}>
        {/* ------------- heading ------------- */}
        <View>
          <Text
            style={[
              styles.headingText,
              {color: Theme(isDarkMode).black22},
              getFontStyle(i18n.locale).bold,
            ]}>
            {heading}
          </Text>
        </View>

        {/* ------------- subtitle ------------- */}
        <View style={styles.subtitleView}>
          <Text
            style={[
              styles.subtitleText,
              {color: Theme(isDarkMode).gray99},
              getFontStyle(i18n.locale).normal,
            ]}>
            {subtitle}
          </Text>
        </View>

        {/* ------------- username ------------- */}
        <View style={styles.userInput}>
          <InputField
            value={userName}
            isDarkMode={isDarkMode}
            isNotRTL={true}
            label={i18n.t('user_name')}
            placeholder={i18n.t('enter_here')}
            onChangeText={(name: string) => setUserName(name)}
          />
        </View>
        {/* ------------- password ------------- */}
        <View>
          <InputField
            value={password}
            isNotRTL={true}
            isDarkMode={isDarkMode}
            secureTextEntryTrue={true}
            label={i18n.t('password')}
            placeholder={i18n.t('enter_here')}
            onChangeText={(password: string) => setPassword(password)}
          />
        </View>

        {/* ------------- upper button ------------- */}
        <View style={[styles.selectView, globalStyle.rowCenter]}>
          {!isLoginScreen && (
            <View style={styles.textView}>
              <Text
                style={[
                  styles.textStyle,
                  getFontStyle(i18n.locale).normal,
                  {color: Theme(isDarkMode).gray99},
                ]}>
                {i18n.t('already_have_account')}
              </Text>
            </View>
          )}
          <MainButton
            isDarkMode={isDarkMode}
            title={upperButtonTitle}
            onPress={() => {
              setPassword('');
              onUpperButton();
            }}
            isLeftText={true}
            isHideIcon={isLoginScreen}
            titleColor={
              isLoginScreen
                ? Theme(isDarkMode).primary
                : Theme(isDarkMode).secondary
            }
            textSize={15}
            backgroundColor={Theme(isDarkMode).whiteF8}
          />
        </View>

        {/* ------------- provider ------------- */}
        {!isLoginScreen && (
          <View style={styles.providerStyle}>
            <View style={globalStyle.rowSpaceBetween}>
              <View>
                <Text
                  style={[
                    styles.headingText,
                    {color: Theme(isDarkMode).black22},
                    getFontStyle(i18n.locale).bold,
                  ]}>
                  {i18n.t('help_provider')}
                </Text>
              </View>

              {/* ------------- SwitchContainer ------------- */}
              <SwitchContainer
                isDarkMode={isDarkMode}
                isActive={isProvider}
                onPress={() => setProvider(!isProvider)}
              />
            </View>

            {/* ------------- help_subtitle ------------- */}
            <View style={styles.subtitleView}>
              <Text
                style={[
                  styles.subtitleText,
                  {color: Theme(isDarkMode).gray99},
                  getFontStyle(i18n.locale).normal,
                ]}>
                {i18n.t('help_subtitle')}
              </Text>
            </View>
          </View>
        )}
      </View>

      <MainButton
        isDarkMode={isDarkMode}
        title={buttonTitle}
        onPress={() => {
          handleSubmit();
        }}
        isLoading={isLoading}
        titleColor={Theme(false).white}
        backgroundColor={Theme(isDarkMode).primary}
      />
    </View>
  );
};

/* ------------- make this component available to the app ------------- */
export default Form;
