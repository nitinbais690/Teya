import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  inputContainer: {
    borderRadius: getScaleSize(15),
    overflow: 'hidden',
    width: '100%',
    padding: getScaleSize(10),
    paddingHorizontal: getScaleSize(15),
  },
  labelView: {
    marginBottom: getScaleSize(5),
  },
  labelText: {
    fontSize: getScaleSize(12),
  },
  inputStyle: {
    padding: 0,
    margin: 0,
    fontSize: getScaleSize(14),
  },
  iconStyle: {
    height: getScaleSize(18),
    width: getScaleSize(18),
    borderRadius: getScaleSize(18),
    marginLeft: getScaleSize(10),
  },
  righIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 9999
  },
  iconStyle2: {
    height: getScaleSize(12),
    width: getScaleSize(12),
  },
  textStyle: {
    fontSize: getScaleSize(14),
    textTransform: 'capitalize',
  },
  textStyle2: {
    fontSize: getScaleSize(14),
    textTransform: 'uppercase',
  },
  countryField: {
    padding: getScaleSize(5),
    paddingLeft: 0,
    marginRight: 0,
    // marginLeft: getScaleSize(3),
  },
  rtlCountryCode: {
    marginTop: getScaleSize(3),
  },
  rightField: {
    padding: getScaleSize(5),
    marginRight: getScaleSize(10),
    marginLeft: getScaleSize(3),
  },
  countryStyle: {
    top: -getScaleSize(40),
    padding: getScaleSize(20),
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  closeButtonStyle: {
    height: getScaleSize(30),
    width: getScaleSize(43),
  },
});
