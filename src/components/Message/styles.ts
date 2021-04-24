import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, ScreenWidth} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  errorView: {
    flex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    width: ScreenWidth,
    elevation: getScaleSize(10),
    padding: getScaleSize(16),
    borderBottomWidth: getScaleSize(5),
  },
  iconStyle: {
    height: getScaleSize(40),
    width: getScaleSize(40),
    marginRight: getScaleSize(20),
  },
  messageText: {
    fontSize: getScaleSize(12),
    textTransform: 'capitalize',
  },
});
