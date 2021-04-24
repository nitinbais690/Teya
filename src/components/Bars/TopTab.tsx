import React from 'react';
import {View, Text, Pressable, SafeAreaView} from 'react-native';

/* ------------- helper ------------- */
import styles from './styles';
import {getFontStyle, ScreenWidth, getScaleSize, Theme} from 'utils/index';
import {TopTapOptions} from 'utils/listArrays';
import i18n from 'config/i18n';

/* ------------- interfaces ------------- */
import {TopTabProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const TopTabBar = ({
  isActiveTopBar,
  onTapChange,
  isDarkMode,
  tabCount,
  isUserTab,
}: TopTabProps) => {
  let TabOption = TopTapOptions(tabCount, isUserTab);

  let tabNum: boolean = isUserTab ? true : tabCount ? true : false;
  return (
    <SafeAreaView>
      <View style={styles.tabContainer}>
        {/*-------- tab 1 ----------*/}
        {TabOption.map((option, index: number) => (
          <Pressable
            key={option.uuid}
            onPress={() => onTapChange(index)}
            style={[
              styles.tabView,
              {width: tabNum ? ScreenWidth / 2 : ScreenWidth / 3},
            ]}>
            <View>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      isActiveTopBar === index
                        ? Theme(isDarkMode).primary
                        : Theme(isDarkMode).grayB8,
                  },
                  getFontStyle(i18n.locale).semibold,
                ]}>
                {option.title}
              </Text>
            </View>
            <View
              style={{
                ...styles.tabLineStyle2,
                backgroundColor:
                  isActiveTopBar === index
                    ? Theme(isDarkMode).primary
                    : Theme(isDarkMode).grayB8,

                width: tabNum
                  ? ScreenWidth / 2
                  : ScreenWidth / 3 + getScaleSize(20),
              }}
            />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

/* ------------- make this component available to the app ------------- */
export default TopTabBar;
