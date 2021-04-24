import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: getScaleSize(10),
    marginTop: getScaleSize(20),
    paddingHorizontal: getScaleSize(15),
  },
  textInputContainer: {
    flex: 1,
    borderRadius: getScaleSize(20),
    marginTop: getScaleSize(30),
    overflow: 'hidden',
  },
  rateTextBox: {
    alignItems: 'center',
    marginTop: getScaleSize(10)
  },
  rateText: {
    fontSize: getScaleSize(17),
    textTransform: 'capitalize',
  },
  ratingContainer: {
    height: getScaleSize(87),
    borderRadius: getScaleSize(20),
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: getScaleSize(10)
  },
  buttonContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getScaleSize(10),
    marginTop: getScaleSize(10),
    justifyContent: 'space-between',
    marginHorizontal: getScaleSize(15),
  },
  buttonStyle1: {
    paddingHorizontal: getScaleSize(15)
  },
});
