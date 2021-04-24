import {Platform, StyleSheet} from 'react-native';

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
    marginTop: getScaleSize(20),
  },
});
