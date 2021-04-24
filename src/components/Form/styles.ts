import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  headingText: {
    fontSize: getScaleSize(22),
    textTransform: 'uppercase',
  },
  subtitleText: {
    fontSize: getScaleSize(16),
    textTransform: 'capitalize',
  },
  formContainer: {
    paddingHorizontal: getScaleSize(15),
    paddingTop: getScaleSize(10),
    flex: 1,
  },
  subtitleView: {
    marginTop: getScaleSize(8),
  },
  userInput: {
    marginTop: getScaleSize(30),
    marginBottom: getScaleSize(10),
  },
  selectView: {
    marginTop: getScaleSize(10),
  },
  textView: {
    marginRight: getScaleSize(10),
    marginTop: -getScaleSize(10),
  },
  textStyle: {
    fontSize: getScaleSize(15),
    textTransform: 'capitalize',
  },
  providerStyle: {
    marginTop: getScaleSize(10),
  },
});
