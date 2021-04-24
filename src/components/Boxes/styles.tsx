import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, ScreenWidth} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  boxContainer: {
    padding: getScaleSize(20),
    paddingVertical: getScaleSize(30),
    borderRadius: getScaleSize(20),
    shadowOpacity: 0.1,
    shadowRadius: getScaleSize(10),
    shadowOffset: {height: 0, width: 0},
    elevation: 1,
  },
  topImage: {
    alignSelf: 'center',
    marginBottom: getScaleSize(30),
  },
  subtitleDesc: {
    marginTop: getScaleSize(10),
  },
  mainBox: {
    marginBottom: getScaleSize(20),
  },
  boxView: {
    overflow: 'hidden',
  },
  boxStyle1: {
    height: getScaleSize(80),
    width: getScaleSize(80),
    borderRadius: getScaleSize(15),
  },
  boxStyle2: {
    height: ScreenWidth / 2 - getScaleSize(20),
    width: ScreenWidth / 2 - getScaleSize(20),
    borderRadius: ScreenWidth / 16,
  },
  pickerStyle: {
    borderStyle: 'dashed',
    borderWidth: 1.0,
  },
  headingText: {
    fontSize: getScaleSize(18),
    textTransform: 'uppercase',
  },
  optionBox: {
    paddingHorizontal: getScaleSize(15),
    padding: getScaleSize(5),
    borderRadius: getScaleSize(20),
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: getScaleSize(10),
    elevation: getScaleSize(2),
  },
  optionImage: {
    height: getScaleSize(70),
    width: getScaleSize(70),
    marginBottom: getScaleSize(5),
  },
  subtitleText: {
    fontSize: getScaleSize(14),
    alignSelf: 'center',
  },
  buttonStyle: {
    width: '48%',
  },
  smallImage: {
    borderRadius: getScaleSize(30),
    height: getScaleSize(40),
    width: getScaleSize(40),
    marginRight: getScaleSize(10),
  },
  leftIconStyle: {
    height: getScaleSize(40),
    width: getScaleSize(40),
    borderRadius: getScaleSize(10),
    padding: getScaleSize(13),
    marginRight: getScaleSize(15),
  },
  loaderView: {
    position: 'absolute',
    left: ScreenWidth / 7,
    top: ScreenWidth / 7,
  },

  /* ------------- profile ------------- */
  circleView: {
    borderRadius: getScaleSize(60),
    height: getScaleSize(120),
    width: getScaleSize(120),
    shadowOpacity: 0.03,
    shadowRadius: getScaleSize(10),
    shadowOffset: {height: 0, width: 0},
    elevation: getScaleSize(2),
    alignSelf: 'center',
  },
  squareStyle: {
    height: getScaleSize(80),
    width: getScaleSize(80),
    borderRadius: getScaleSize(15),
    alignSelf: 'center',
    overflow: 'hidden',
  },
  titleText: {
    fontSize: getScaleSize(22),
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  smallTitleText: {
    fontSize: getScaleSize(12),
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  bottomTextView: {
    marginTop: getScaleSize(10),
    marginBottom: getScaleSize(15),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: getScaleSize(60),
  },
  imageContainer: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: getScaleSize(15),
  },
  degiView: {
    // marginVertical: getScaleSize(5),
  },
  degiText: {
    fontSize: getScaleSize(14),
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    bottom: -getScaleSize(10),
    borderRadius: getScaleSize(30),
    backgroundColor: 'red',
  },
  iconStyle: {
    height: getScaleSize(40),
    width: getScaleSize(40),
    borderRadius: getScaleSize(20),
    shadowOpacity: 0.2,
    shadowRadius: getScaleSize(10),
    shadowOffset: {height: 0, width: 0},
    elevation: getScaleSize(2),
    position: 'absolute',
    right: getScaleSize(0),
    padding: getScaleSize(10),
    bottom: 0,
  },

  /* ------------- lanaguage ------------- */
  flagImage: {
    borderRadius: getScaleSize(10),
    height: getScaleSize(60),
    width: getScaleSize(60),
    overflow: 'hidden',
  },
  langBox: {
    marginVertical: getScaleSize(5),
    paddingVertical: getScaleSize(5),
    marginHorizontal: getScaleSize(8),
    width: '96%',
  },
  subView: {
    marginLeft: getScaleSize(10),
  },

  /* ------------- checkBox ------------- */
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getScaleSize(8),
  },
  boxCircleStyle: {
    height: getScaleSize(16),
    width: getScaleSize(16),
    borderRadius: getScaleSize(10),
    borderWidth: getScaleSize(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: getScaleSize(10),
    height: getScaleSize(10),
    borderRadius: getScaleSize(7),
  },
  checkBoxView: {
    marginLeft: getScaleSize(10),
  },
  checkText: {
    fontSize: getScaleSize(14),
  },
});
