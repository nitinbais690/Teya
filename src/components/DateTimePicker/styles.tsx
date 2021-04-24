import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, ScreenWidth, Theme} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  dateIosStyle: {
    width: ScreenWidth - getScaleSize(80),
    height: getScaleSize(60),
  },
  pickerStyle: {
    flex: 1,
  },
});
