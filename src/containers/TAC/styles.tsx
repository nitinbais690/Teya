import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: getScaleSize(15),
  },
  buttonStyle: {
    marginTop: getScaleSize(10),
  },
});
