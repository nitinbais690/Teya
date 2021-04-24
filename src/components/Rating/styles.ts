import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, Theme} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  ratingView: {
    marginRight: getScaleSize(10),
  },
  degiView: {
    //marginVertical: getScaleSize(5),
  },
  degiText: {
    fontSize: getScaleSize(14),
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  starStyle2:{
    
  }
});
