import React from 'react';
import {Pressable, View} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- icon ------------- */
import {Theme} from 'utils/index';

/* ------------- interfaces ------------- */
import {SwitchProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const SwitchContainer = ({isActive, onPress, isDarkMode}: SwitchProps) => {
  return (
    <View>
      <Pressable onPress={onPress} style={globalStyle.rowCenter}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: isActive
                ? Theme(isDarkMode).white
                : Theme(isDarkMode).grayD5,
            },
          ]}>
          <View
            style={[
              styles.innerCircle,
              isActive && {right: 0},
              {
                backgroundColor: isActive
                  ? Theme(isDarkMode).primary
                  : Theme(isDarkMode).white,
              },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};

/* ------------- make this component available to the app ------------- */
export default SwitchContainer;
