import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  headingText: {
    fontSize: getScaleSize(22),
    textTransform: 'capitalize'
  },
  mainContainer: {
    flex: 2,
  },
  circleContainer: {
    alignSelf: 'center',
  },
  circleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getScaleSize(70),
    width: getScaleSize(70),
    borderRadius: getScaleSize(40),
    margin: getScaleSize(15),
  },
  indicatorContainer: {
    justifyContent: 'flex-end',
    paddingBottom: getScaleSize(10)
  },
});
