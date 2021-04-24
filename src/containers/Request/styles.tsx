import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    marginBottom: getScaleSize(10),
    marginTop: getScaleSize(20),
    paddingHorizontal: getScaleSize(15),
  },
  inputStyle: {
    marginBottom: getScaleSize(20),
  },
  iconStyles: {
    position: 'absolute',
    bottom: getScaleSize(70),
    right: getScaleSize(20),
    height: getScaleSize(60),
    width: getScaleSize(60),
    borderRadius: getScaleSize(40),
    padding: getScaleSize(18),
    shadowRadius: getScaleSize(5),
    shadowOpacity: 0.2,
    shadowOffset: {height: getScaleSize(10), width: getScaleSize(5)},
  },
  buttonStyle: {
    paddingHorizontal: getScaleSize(15),
  },
  wrapStyle: {
    flexWrap: 'wrap',
  },
  bidView: {
    marginVertical: getScaleSize(10),
  },
  bidText: {
    fontSize: getScaleSize(15),
    textTransform: 'uppercase',
  },
  marginStyle: {
    marginBottom: getScaleSize(20),
    marginTop: getScaleSize(10),
  },

  /*------ cancel ------*/
  screenContainer: {
    flex: 1,
  },
  cancelTop: {
    flex: 1,
    alignItems: 'center',
    marginTop: getScaleSize(40),
    paddingLeft: getScaleSize(20),
    paddingRight: getScaleSize(20),
  },
  titleView: {
    marginTop: getScaleSize(20),
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  subTitleView: {
    marginTop: getScaleSize(10),
    marginBottom: getScaleSize(10),
  },
  imageView: {
    borderRadius: getScaleSize(103) / 2,
    padding: getScaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: getScaleSize(28),
    width: '100%',
  },

  textContainer: {
    marginTop: getScaleSize(15),
    width: '100%',
  },
  optionContainer: {
    marginTop: getScaleSize(25),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    padding: getScaleSize(15),
    borderRadius: getScaleSize(15),
  },
  cancelText: {
    fontSize: getScaleSize(20),
    textTransform: 'uppercase',
  },
  messageText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: getScaleSize(13),
  },
});
