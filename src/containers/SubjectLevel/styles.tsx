import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: getScaleSize(15),
    flex: 1,
  },
  topView: {
    marginVertical: getScaleSize(20),
  },
  headText: {
    fontSize: getScaleSize(19),
    textTransform: 'capitalize',
  },
});
