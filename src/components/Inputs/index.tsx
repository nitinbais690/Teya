import React from 'react';
import {
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  View,
} from 'react-native';

/* ------------- interfaces ------------- */
import {InputFieldProps} from 'interfaces/components';

/*-------- country picker ----------*/
import CountryPicker, {
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Entypo';

/* ------------- helper ------------- */
import styles from './styles';
import {getFontStyle, getScaleSize} from 'utils/index';
import {Theme} from 'utils/index';
import i18n from 'config/i18n';
import globalStyle from 'config/globalStyle';

/* ------------- create a component ------------- */
const InputField = ({
  placeholder,
  label,
  value,
  onChangeText,
  isEditableFalse,
  isDarkMode,
  secureTextEntryTrue,
  inceaseSize,
  isMultiline,
  marginBottom,
  isNotRTL,
  onPressCountryPicker,
  callingCode,
  isCountryPickerVisible,
  onSelectCountryCode,
  keyboardType,
  backgroundColor,
  onPressUpdate,
  rightTitle,
}: InputFieldProps) => {
  let inputStyle: object = {
    backgroundColor: backgroundColor
      ? backgroundColor
      : Theme(isDarkMode).white,
  };

  let rowInput = {
    flexDirection: 'row',
  };
  /*--------  trl ----------*/
  if (isNotRTL) {
    rowInput = {
      flexDirection: i18n.locale === 'ar' ? 'row-reverse' : 'row',
    };
  }

  /*--------  marginBottom ----------*/
  if (marginBottom) {
    inputStyle = {
      ...inputStyle,
      marginBottom: getScaleSize(marginBottom),
    };
  }

  /*--------  size ----------*/
  inputStyle = inceaseSize
    ? {...inputStyle, flex: 1, alignItems: 'flex-start'}
    : {...inputStyle, width: '100%', height: getScaleSize(60)};

  let isPhoneInput = false;
  if (callingCode) {
    isPhoneInput = true;
  }

  let isWidth = false;
  if (isCountryPickerVisible || onPressUpdate) {
    isWidth = true;
  }

  let inputTextColor = Theme(isDarkMode).black66;

  let labelStyle = false;
  if (i18n.locale === 'ar' && isPhoneInput) {
    labelStyle = true;
  }
  return (
    <View
      style={[
        styles.inputContainer,
        inputStyle,
        !isMultiline && globalStyle.rowCenter,
      ]}>
      <View>
        <View
          style={[
            rowInput,
            styles.labelView,
            labelStyle && {
              marginLeft: getScaleSize(10),
            },
          ]}>
          <Text
            style={[
              styles.labelText,
              {color: inputTextColor},
              getFontStyle(i18n.locale).semibold,
            ]}>
            {label}
          </Text>
        </View>

        {/*--------  code ----------*/}
        <View style={[rowInput]}>
          {isPhoneInput ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                onPressCountryPicker &&
                onPressCountryPicker({isCountryPickerVisible: true})
              }
              style={[
                styles.countryField,
                labelStyle && {marginLeft: getScaleSize(5)},
                i18n.locale === 'ar' && styles.rtlCountryCode,
              ]}>
              <Text
                style={[
                  {...styles.textStyle, color: Theme(isDarkMode).black00},
                  getFontStyle(i18n.locale).semibold,
                ]}>
                {callingCode}
              </Text>

              {/*--------  country picker ----------*/}
              {isCountryPickerVisible && (
                <CountryPicker
                  key={'councodePicker'}
                  onSelect={(value) => {
                    onSelectCountryCode(value);
                  }}
                  containerButtonStyle={styles.countryStyle}
                  translation="eng"
                  closeButtonImageStyle={styles.closeButtonStyle}
                  onClose={() =>
                    onPressCountryPicker({isCountryPickerVisible: false})
                  }
                  theme={isDarkMode ? DARK_THEME : DEFAULT_THEME}
                  withFilter={true}
                  withCallingCode={true}
                  visible={isCountryPickerVisible}
                />
              )}
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <TextInput
            placeholder={placeholder ? placeholder : ''}
            placeholderTextColor={inputTextColor}
            value={value ? value : ''}
            multiline={isMultiline ? true : false}
            onChangeText={onChangeText}
            editable={isEditableFalse ? false : true}
            keyboardType={keyboardType ? keyboardType : 'default'}
            returnKeyType={isMultiline ? 'default' : 'done'}
            //returnKeyLabel={isMultiline ? 'return' : 'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={secureTextEntryTrue}
            style={[
              {
                ...styles.inputStyle,
                color: inputTextColor,
                paddingLeft: isPhoneInput ? getScaleSize(10) : 0,
                textAlign: isNotRTL
                  ? 'left'
                  : i18n.locale === 'ar'
                  ? 'right'
                  : 'left',
              },
              {width: isWidth ? '83%' : labelStyle ? '90%' : '100%'},
            ]}
          />
        </View>
      </View>

      {/*--------  code ----------*/}
      {onPressUpdate && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            onPressUpdate && onPressUpdate({isCountryPickerVisible: true})
          }
          style={styles.rightField}>
          <Text
            style={[
              {...styles.textStyle, color: Theme(isDarkMode).primary},
              getFontStyle(i18n.locale).semibold,
            ]}>
            {rightTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/* ------------- make this component available to the app ------------- */
export default InputField;

/* ------------- create a component ------------- */
export const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  isEditableFalse,
  isDarkMode,
  onResetInput,
}: InputFieldProps) => {
  return (
    <View
      style={[
        styles.inputContainer,
        globalStyle.rowCenter,
        {backgroundColor: Theme(isDarkMode).white, height: getScaleSize(50)},
      ]}>
      <TextInput
        placeholder={placeholder ? placeholder : ''}
        autoCapitalize={'none'}
        placeholderTextColor={Theme(isDarkMode).black66}
        value={value ? value : ''}
        onChangeText={onChangeText}
        editable={isEditableFalse}
        style={{
          ...styles.inputStyle,
          flex: 1,
          textAlign: i18n.locale === 'ar' ? 'right' : 'left',
          color: Theme(isDarkMode).black00,
        }}
      />

      {/* ------------- cross ------------- */}
      {value && value.length > 0 ? (
        <Pressable style={styles.iconStyle} onPress={onResetInput}>
          <Image
            style={[
              globalStyle.contain,
              {tintColor: Theme(isDarkMode).secondary},
            ]}
            source={require('../../assets/icons/cross_icon.svg')}
          />
        </Pressable>
      ) : (
        <View style={styles.iconStyle}>
          <Image
            style={globalStyle.contain}
            source={require('../../assets/icons/search_icon.svg')}
          />
        </View>
      )}
    </View>
  );
};

/* ------------- create a component ------------- */
export const InputButton = ({
  placeholder,
  value,
  isDarkMode,
  onChangeText,
  inceaseSize,
  marginBottom,
  isSpaceBetweenContain,
  label,
  showIcon,
  onPressUpdate,
}: InputFieldProps) => {
  let inputStyle = styles.inputContainer;

  /*--------  marginBottom ----------*/
  if (marginBottom) {
    inputStyle = {
      ...inputStyle,
      marginBottom: getScaleSize(marginBottom),
      justifyContent: 'center',
    };
  }
  let isLable = label ? true : false;

  return (
    <Pressable
      style={[
        inputStyle,
        {
          backgroundColor: Theme(isDarkMode).white,
          height: inceaseSize ? getScaleSize(inceaseSize) : getScaleSize(60),
        },
      ]}
      onPress={onChangeText}>
      {isLable && (
        <View style={[globalStyle.row, styles.labelView]}>
          <Text
            style={[
              styles.labelText,
              {color: Theme(isDarkMode).black66},
              getFontStyle(i18n.locale).semibold,
            ]}>
            {label}
          </Text>
        </View>
      )}

      {/* ------------- left ------------- */}
      <View
        style={[
          isSpaceBetweenContain ? globalStyle.rowSpaceBetween : globalStyle.row,
        ]}>
        <View>
          <Text
            style={[
              styles.textStyle,
              {
                color: value
                  ? Theme(isDarkMode).black66
                  : Theme(isDarkMode).black00,
                textTransform: 'none',
              },
              getFontStyle(i18n.locale).normal,
            ]}>
            {isSpaceBetweenContain ? placeholder : value ? value : placeholder}
          </Text>
        </View>

        {/* ------------- right ------------- */}
        {!showIcon && isSpaceBetweenContain && (
          <View>
            <Text
              style={[
                styles.textStyle2,
                {
                  color: value
                    ? Theme(isDarkMode).black66
                    : Theme(isDarkMode).black00,
                },
                getFontStyle(i18n.locale).normal,
              ]}>
              {value}
            </Text>
          </View>
        )}

        {showIcon && onPressUpdate && (
          <Pressable onPress={onPressUpdate} style={[styles.righIcon]}>
            <Icon
              name={'circle-with-cross'}
              size={getScaleSize(20)}
              color={Theme(isDarkMode).secondary}
            />
          </Pressable>
        )}
        {showIcon && !onPressUpdate && (
          <View style={[styles.iconStyle]}>
            <Image
              source={require('../../assets/icons/right_arrow.svg')}
              style={globalStyle.contain}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};
