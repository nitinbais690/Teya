import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, ScreenHeight, ScreenWidth, Theme} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  innerCircle: {
    height: getScaleSize(28),
    width: getScaleSize(28),
    borderRadius: getScaleSize(20),
    position: 'absolute',
    top: -getScaleSize(4),
    shadowColor: Theme(false).gray99,
    shadowOpacity: 0.3,
    shadowRadius: getScaleSize(5),
    shadowOffset: {height: 0, width: 0},
    elevation: getScaleSize(2),
  },
  container: {
    borderRadius: getScaleSize(20),
    width: getScaleSize(55),
    height: getScaleSize(20),
  },
  deleteIcon: {
    alignSelf: 'flex-end',
    right: getScaleSize(15),
    top: getScaleSize(25),
    position: 'absolute',
  },
  modalStyle: {
    position: 'absolute',
    left: -getScaleSize(20),
    width: ScreenWidth,
    height: ScreenHeight,
  },
});
