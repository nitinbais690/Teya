import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: getScaleSize(15),
  },
  paymentTop: {
    marginTop: getScaleSize(20),
  },
  buttonStyle: {
    paddingHorizontal: getScaleSize(15),
    marginBottom: getScaleSize(10),
  },
  questionView: {
    marginHorizontal: getScaleSize(15),
    marginBottom: getScaleSize(20),
  },
});
