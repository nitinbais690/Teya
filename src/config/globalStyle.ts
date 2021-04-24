import {StyleSheet} from 'react-native';

/*-------- utils  ----------*/
import {getScaleSize, ScreenHeight, ScreenWidth} from 'utils/index';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contain: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowSpaceBetweenNotCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowSpaceEvently: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  loaderStyle1: {
    height: ScreenWidth / 1.5,
    width: ScreenWidth / 1.5,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: getScaleSize(1),
  },
  notFoundstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScreenHeight / 4,
    height: ScreenWidth / 2,
    width: ScreenWidth / 2,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: getScaleSize(18),
    textTransform: 'capitalize',
  },
});
