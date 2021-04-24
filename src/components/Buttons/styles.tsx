import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  headingText: {
    fontSize: getScaleSize(22),
    textTransform: 'capitalize',
  },
  subtitleText: {
    fontSize: getScaleSize(18),
    textTransform: 'capitalize',
  },
  iconStyle: {
    marginRight: getScaleSize(10),
  },
  buttonContainer: {
    height: getScaleSize(50),
    borderRadius: getScaleSize(15),
    shadowOffset: {height: getScaleSize(5), width: getScaleSize(0)},
    marginBottom: getScaleSize(8),
    shadowRadius: getScaleSize(4),
    width: '100%',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  textView: {
    alignSelf: 'center',
  },

  /* ------------- actions ------------- */
  detailsText: {
    fontSize: getScaleSize(14),
    textTransform: 'uppercase',
  },
  leftButton: {
    borderBottomLeftRadius: getScaleSize(10),
    borderTopLeftRadius: getScaleSize(10),
  },
  rightButton: {
    borderBottomRightRadius: getScaleSize(10),
    borderTopRightRadius: getScaleSize(10),
  },
  buttonStyleAc: {
    alignSelf: 'center',
    height: getScaleSize(100),
    width: getScaleSize(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
