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
  searchContainer: {
    marginTop: getScaleSize(10),
    paddingHorizontal: getScaleSize(15),
  },
});
