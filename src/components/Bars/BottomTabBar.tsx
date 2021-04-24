import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

/* ------------- helper ------------- */
import styles from './styles';
import i18n from 'config/i18n';
import {getFontStyle, getScaleSize, Theme} from 'utils/index';
import {BottomTabOption} from 'utils/listArrays';

/* ------------- icon ------------- */
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

/* ------------- interfaces ------------- */
import {BottomTabBarProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const BottomTabBar = ({
  isActiveBottomTab,
  onTapChange,
  isBidAccepted,
  isTutor,
  isDarkMode,
}: BottomTabBarProps) => {
  return (
    <SafeAreaView style={{backgroundColor: Theme(isDarkMode).whiteF8}}>
      <View
        style={[
          styles.tabBarContainer,
          {
            shadowColor: Theme(isDarkMode).black00,
            backgroundColor: Theme(isDarkMode).whiteF8,
          },
        ]}>
        {BottomTabOption(isBidAccepted, isTutor).map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onTapChange(index);
              }}
              key={item.uuid}
              style={styles.tabStyle}>
              {/* ------------- active line ------------- */}
              {isActiveBottomTab === index && (
                <View
                  style={{
                    ...styles.lineView,
                    backgroundColor: Theme(isDarkMode).primary,
                  }}
                />
              )}
              <View style={styles.iconsStyle}>
                {/* ------------- icon ------------- */}
                {item.isOffer ? (
                  <MaterialIcon
                    name={item.iconName}
                    size={getScaleSize(28)}
                    color={
                      isActiveBottomTab === index
                        ? Theme(isDarkMode).primary
                        : Theme(isDarkMode).gray99
                    }
                  />
                ) : (
                  <Icon
                    name={item.iconName}
                    size={getScaleSize(28)}
                    color={
                      isActiveBottomTab === index
                        ? Theme(isDarkMode).primary
                        : Theme(isDarkMode).gray99
                    }
                  />
                )}
              </View>

              {/* ------------- tax ------------- */}
              <View style={styles.textView}>
                <Text
                  style={[
                    {
                      ...styles.textStyle,
                      color:
                        isActiveBottomTab === index
                          ? Theme(isDarkMode).primary
                          : Theme(isDarkMode).gray99,
                    },
                    getFontStyle(i18n.locale).bold,
                  ]}>
                  {item.optionText}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

/* ------------- make this component available to the app ------------- */
export default BottomTabBar;
