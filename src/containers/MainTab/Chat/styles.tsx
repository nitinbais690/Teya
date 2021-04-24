import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize, ScreenWidth} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  /*-------- message  ----------*/
  mainChatScreen: {
    flex: 1,
    paddingHorizontal: getScaleSize(15),
    paddingBottom: getScaleSize(5),
    backgroundColor: 'transparent',
  },
  inputContainer: {
    width: '60%',
  },
  recordInput: {
    width: '70%',
  },
  recodingStyle: {
    flex: 1,
    paddingLeft: getScaleSize(15)
  },
  messageView: {
    marginBottom: getScaleSize(20),
    borderTopRightRadius: getScaleSize(15),
    borderTopLeftRadius: getScaleSize(15),
    borderWidth: 0
  },
  audioView: {
    marginBottom: getScaleSize(20),
  },
  messageContainer: {
    padding: getScaleSize(20),
    paddingVertical: getScaleSize(10),
    borderTopRightRadius: getScaleSize(15),
    borderTopLeftRadius: getScaleSize(15),
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomLeftRadius: getScaleSize(15),
    borderBottomRightRadius: 0,
  },
  clientMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: getScaleSize(15),
  },
  timeView: {
    padding: getScaleSize(5),
  },
  timeText: {
    fontSize: getScaleSize(9),
    textTransform: 'uppercase',
  },
  messageTextStyle: {
    fontSize: getScaleSize(12),
  },
  messageImage: {
    width: ScreenWidth / 2,
    height: getScaleSize(130),
    borderRadius: getScaleSize(20),
    overflow: 'hidden',
  },
  imageView: {
    aspectRatio: 2 / 1.5,
    borderRadius: getScaleSize(10),
  },
  audioTimerText: {
    marginHorizontal: getScaleSize(10),
    fontSize: getScaleSize(11),
  },
  audioBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: getScaleSize(5),
    marginLeft: getScaleSize(10)
  },
  audioBarProgress: {
    borderRightWidth: getScaleSize(3),
  },
  audioButtons: {
    margin: 0,
    padding: 0,
  },
  inputStyle: {
    margin: 0,
    padding: 0,
  },
  loaderStyle: {
    position: 'absolute',
    top: getScaleSize(90),
    right: getScaleSize(35),
  },
  bottomLoader: {
    margin: getScaleSize(20),
  },

  /*-------- chat-tools  ----------*/
  mainTextInput: {
    width: '100%',
    borderRadius: getScaleSize(15),
    padding: getScaleSize(10),
    paddingLeft: getScaleSize(25),
    borderWidth: 0,
    shadowRadius: getScaleSize(5),
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.1,
    elevation: getScaleSize(1),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer2: {
    alignItems: 'center',
  },
  senderIcon: {
    height: getScaleSize(35),
    width: getScaleSize(35),
    borderRadius: getScaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScaleSize(9),
  },
  microIcon: {
    height: getScaleSize(22),
    width: getScaleSize(22),
    borderRadius: getScaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getScaleSize(8)
  },
  imageIcon: {
    height: getScaleSize(28),
    width: getScaleSize(28),
    marginRight: getScaleSize(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  textStyle: {
    fontSize: getScaleSize(12),
    textTransform: 'capitalize',
  },

  /*-------- main  ----------*/
  topView: {
    position: 'absolute',
    top: 0,
    width: ScreenWidth,
    height: getScaleSize(40),
  },
  backBurl: {
    opacity: 0.6,
    width: ScreenWidth,
    // position: 'absolute',
    height: getScaleSize(40),
  },
  contentStyle: {
    position: 'absolute',
    paddingHorizontal: getScaleSize(15),
  },
});
