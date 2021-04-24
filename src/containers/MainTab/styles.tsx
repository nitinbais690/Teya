import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize, ScreenHeight, ScreenWidth} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: getScaleSize(10),
  },
  textStyle: {
    fontSize: getScaleSize(25),
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  subtitleTextStyle: {
    fontSize: getScaleSize(11),
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  topTextView: {
    marginTop: getScaleSize(10),
    marginBottom: getScaleSize(20),
    alignSelf: 'center',
  },
  wrapStyle: {
    marginTop: '5%',
    flexWrap: 'wrap',
  },
  zoomImageStyle: {
    position: 'absolute',
    width: ScreenWidth,
    height: ScreenHeight,
  },
  notFound: {
    marginLeft: ScreenWidth / 5,
  },
  imageGifView:{
    height: getScaleSize(100),
    width: getScaleSize(100),
    alignSelf: 'center'
  }
});
