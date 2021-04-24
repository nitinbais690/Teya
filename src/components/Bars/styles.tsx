import {Platform, StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, ScreenWidth} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: getScaleSize(15),
  },
  userImage: {
    height: getScaleSize(80),
    width: getScaleSize(80),
    borderRadius: getScaleSize(40),
    marginRight: getScaleSize(20),
    overflow: 'hidden',
  },
  nameText: {
    fontSize: getScaleSize(19),
    textTransform: 'capitalize',
  },
  iconStyle: {
    borderRadius: getScaleSize(50),
    height: getScaleSize(35),
    width: getScaleSize(35),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: getScaleSize(10),
    shadowOpacity: 0.2,
    elevation: getScaleSize(10),
  },
  buttonContainer: {
    paddingHorizontal: getScaleSize(15),
  },
  versionView: {
    marginTop: getScaleSize(5),
    alignSelf: 'center',
  },
  versionText: {
    fontSize: getScaleSize(15),
    textTransform: 'capitalize',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  textView: {
    alignSelf: 'center',
  },
  optionContainer: {
    marginTop: '20%',
    justifyContent: 'center',
  },
  optionRow: {
    paddingVertical: getScaleSize(10),
  },
  optionIcon: {
    height: getScaleSize(25),
    width: getScaleSize(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionView: {
    marginLeft: getScaleSize(10),
  },
  optionText: {
    fontSize: getScaleSize(15),
    textTransform: 'capitalize',
  },
  modeView: {
    marginTop: getScaleSize(5),
    paddingTop: getScaleSize(10),
    borderTopWidth: getScaleSize(1),
  },

  /* ------------- header ------------- */
  headerContainer: {
    height: getScaleSize(50),
    paddingHorizontal: getScaleSize(10),
  },
  headingText: {
    fontSize: getScaleSize(16),
    textTransform: 'uppercase',
  },
  profileImage: {
    marginLeft: getScaleSize(10),
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: getScaleSize(8),
    margin: getScaleSize(4),
  },
  coverStyle: {
    height: getScaleSize(40),
    width: getScaleSize(40),
    borderRadius: getScaleSize(20),
  },
  leftIconStyle: {
    height: getScaleSize(40),
    width: getScaleSize(40),
    borderRadius: getScaleSize(10),
    padding: getScaleSize(13),
  },
  leftText: {
    fontSize: getScaleSize(12),
    textTransform: 'uppercase',
  },
  saveView: {
    width: getScaleSize(55),
    alignItems: 'flex-end',
  },
  /* ------------- top tab ------------- */
  tabView: {
    justifyContent: 'center',
    paddingTop: getScaleSize(10),
    paddingBottom: getScaleSize(15),
    alignItems: 'center',
  },
  tabContainer: {
    width: '100%',
    height: getScaleSize(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getScaleSize(5),
  },
  tabText: {
    fontSize: getScaleSize(11),
    textTransform: 'uppercase',
  },
  tabLineStyle2: {
    height: getScaleSize(3),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomLine: {
    width: ScreenWidth,
    height: getScaleSize(10),
    backgroundColor: 'green',
  },

  /* ------------- bottom tabBarContainer ------------- */
  tabBarContainer: {
    width: ScreenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: getScaleSize(30),
    shadowOpacity: 0.07,
    shadowOffset: {height: -getScaleSize(2), width: 0},
    shadowRadius: getScaleSize(1),
    marginTop: getScaleSize(5),
    marginBottom: Platform.OS === 'ios' ? getScaleSize(5) : 0,
    elevation: getScaleSize(10),
  },
  tabStyle: {
    width: getScaleSize(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsStyle: {
    marginTop: getScaleSize(15),
    marginBottom: getScaleSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lineView: {
    width: '80%',
    height: getScaleSize(4),
    alignSelf: 'center',
    borderBottomLeftRadius: getScaleSize(10),
    borderBottomRightRadius: getScaleSize(10),
    position: 'absolute',
    top: 0,
  },
  textStyle: {
    fontSize: getScaleSize(10),
    textTransform: 'uppercase',
  },
  textViewBt: {
    alignSelf: 'center',
    marginBottom: getScaleSize(5),
  },
});
