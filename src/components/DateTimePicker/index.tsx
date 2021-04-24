import React from 'react';
import {View, Platform} from 'react-native';

/* ------------- style ------------- */
import styles from './styles';

/* ------------- utils ------------- */
import {Theme} from 'utils/index';

/* ------------- DateTimePicker ------------- */
import DateTimePicker from '@react-native-community/datetimepicker';

/* ------------- interfaces ------------- */
import {DateTimePickerProps} from 'interfaces/components';

/* ------------- create a component ------------- */
export const DateTimePickerContainer = ({
  onClose,
  value,
  mode,
  isDarkMode,
  onChange,
  minimumDate,
}: DateTimePickerProps) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={value}
      style={[styles.dateIosStyle, {backgroundColor: Theme(isDarkMode).white}]}
      mode={mode ? mode : 'date'}
      minimumDate={minimumDate ? minimumDate : new Date()}
      display="default"
      onChange={onChange}
    />
  );
};

/* ------------- create a component ------------- */
export const DateTimePickerModal = (props: DateTimePickerProps) => {
  if (Platform.OS === 'ios') {
    return <DateTimePickerContainer {...props} />;
  } else if (props.isDatePickerShow) {
    return <DateTimePickerContainer {...props} />;
  } else {
    return <View />;
  }
};

/* ------------- make this component available to the app ------------- */
export default DateTimePickerModal;
