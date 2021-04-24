import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: getScaleSize(15),
    marginTop: getScaleSize(10),
    justifyContent: 'space-between',
  },
  boxStyle: {
    borderRadius: getScaleSize(20),
    paddingBottom: getScaleSize(10),
  },
  headText: {
    fontSize: getScaleSize(19),
    textTransform: 'capitalize',
  },
});
