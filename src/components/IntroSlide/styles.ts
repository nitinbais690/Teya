import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, ScreenWidth} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: ScreenWidth - 20,
    height: ScreenWidth - 20,
    marginBottom: getScaleSize(20),
    alignSelf: 'center',
    alignItems: 'center'
  },
  titleView: {},
  infoTitle: {
    textAlign: 'center',
    fontSize: getScaleSize(22),
  },
  descView: {
    marginTop: getScaleSize(10),
    alignSelf: 'center',
    paddingHorizontal: getScaleSize(20),
  },
  infoDescription: {
    fontSize: getScaleSize(18),
    textAlign: 'center',
  },
  buttonTitle: {
    fontSize: getScaleSize(18),
    textTransform: 'uppercase',
  },
});
