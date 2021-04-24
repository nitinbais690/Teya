import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';

/* ------------- library ----------------- */
// import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {AUDIO_STATUS, startPlayer, stopPlayer, pausePlayer} from './Audio';

/* ------------- config ----------------- */
import globalStyle from 'config/globalStyle';
import i18n from 'config/i18n';
import styles from './styles';

/* ------------- utils ----------------- */
import {getFontStyle, getScaleSize, Theme} from 'utils/index';
import {chatLRTLayout} from 'utils/helperFun';

/* ------------- components ----------------- */
import Loader from 'components/Loaders';

/* --------- send time ------------- */
const SendTimeView = ({isUser, isDarkMode, time}) => {
  return (
    <View style={[styles.timeView, chatLRTLayout(styles, isUser)]}>
      <Text
        style={[
          styles.timeText,

          {
            color: Theme(isDarkMode).gray['A8'],
          },
          getFontStyle(i18n.locale).semibold,
        ]}>
        {time}
      </Text>
    </View>
  );
};

/* --------- text ------------- */
export function MessageText(props) {
  const {isUser, isDarkMode, styles, sendTime, message} = props;
  return (
    <View style={[styles.messageView, chatLRTLayout(styles, isUser)]}>
      <View
        style={[
          {
            ...styles.messageContainer,
            backgroundColor: isUser
              ? Theme(isDarkMode).primary
              : Theme(isDarkMode).white,
          },
          chatLRTLayout(styles, isUser),
        ]}>
        <Text
          style={[
            {
              ...styles.messageTextStyle,
              color: isUser ? Theme(false).white : Theme(isDarkMode).black22,
            },
            getFontStyle(i18n.locale).normal,
          ]}>
          {message}
        </Text>
      </View>
      <SendTimeView isUser={isUser} isDarkMode={isDarkMode} time={sendTime} />
    </View>
  );
}

/* -------------  image ----------------- */
export function MessageImage(props) {
  const {isUser, isDarkMode, sendTime, message, onPress, item} = props;
  return (
    <View style={[styles.messageView, chatLRTLayout(styles, isUser)]}>
      {item.uploading ? (
        <View style={[styles.messageImage, chatLRTLayout(styles, isUser)]}>
          <Image
            source={[
              {
                uri: message,
              },
            ]}
          />
          <View style={styles.loaderStyle}>
            <ActivityIndicator
              size="large"
              color={Theme(isDarkMode).primary}
              animating={true}
            />
          </View>
        </View>
      ) : (
        <Fragment>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.messageImage]}>
            <Image
              style={globalStyle.cover}
              source={{
                uri: message,
              }}
            />
          </TouchableOpacity>
          <SendTimeView
            isUser={isUser}
            isDarkMode={isDarkMode}
            time={sendTime}
          />
        </Fragment>
      )}
    </View>
  );
}

/* -------------  video ----------------- */
export function MessageVideo(props) {
  const {isUser, isDarkMode, sendTime, message, onPress, item} = props;
  return (
    <View style={[styles.messageView, chatLRTLayout(styles, isUser)]}>
      {item.uploading ? (
        <View style={[styles.messageImage, chatLRTLayout(styles, isUser)]}>
          <Image
            source={[
              {
                uri: message,
              },
            ]}
          />
          <View style={styles.loaderStyle}>
            <Loader />
          </View>
        </View>
      ) : (
        <Fragment>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.messageImage]}>
            <Image
              style={globalStyle.cover}
              source={{
                uri: message,
              }}
            />
          </TouchableOpacity>
          <SendTimeView
            isUser={isUser}
            isDarkMode={isDarkMode}
            time={sendTime}
          />
        </Fragment>
      )}
    </View>
  );
}

/* -------------  image ----------------- */
export function MessageAudio(props) {
  const {
    isUser,
    isDarkMode,
    sendTime,
    onPress,
    message,
    index,
    info,
    isPlay,
    isLoading,
    fromInput,
  } = props;

  var playingState = 0;
  if (info.duration) {
    playingState = (info.playDuration * 100) / info.duration;
  }

  return (
    <View style={[!fromInput && styles.audioView]}>
      <View
        style={[
          {
            ...styles.messageView,
            backgroundColor: isUser
              ? Theme(isDarkMode).primary
              : Theme(isDarkMode).white,
            width: getScaleSize(150),
            marginBottom: 0,
          },
          chatLRTLayout(styles, isUser),
        ]}>
        <View style={styles.messageContainer}>
          {isLoading === index ? (
            <Loader isAudio={true} size={18} />
          ) : (
            <View style={[globalStyle.rowCenter]}>
              <TouchableOpacity
                style={styles.audioButtons}
                onPress={() => onPress()}>
                {/* ------------- icon ----------------- */}
                {isPlay ? (
                  <Icon
                    name="stop"
                    size={getScaleSize(18)}
                    color={
                      isUser
                        ? Theme(isDarkMode).white
                        : Theme(isDarkMode).primary
                    }
                  />
                ) : (
                  <Icon
                    name="play"
                    size={getScaleSize(18)}
                    color={
                      isUser
                        ? Theme(isDarkMode).white
                        : Theme(isDarkMode).primary
                    }
                  />
                )}
              </TouchableOpacity>

              {/* ------------- duration ----------------- */}
              {/* <Text
                style={[
                  styles.audioTimerText,
                  getFontStyle(i18n.locale).semibold,
                  {
                    color: isUser
                      ? Theme(isDarkMode).white
                      : Theme(isDarkMode).black22,
                  },
                ]}>
                {isPlay === index ? i18n.t('playing') : i18n.t('play')}
              </Text> */}
              {/* ------------- bar ----------------- */}
              <View
                style={[
                  styles.audioBarContainer,
                  {backgroundColor: Theme(isDarkMode).grayD5},
                ]}>
                <View
                  style={[
                    styles.audioBarProgress,
                    {
                      flex: playingState / 100,
                      backgroundColor: isUser
                        ? Theme(isDarkMode).white
                        : Theme(isDarkMode).primary,
                    },
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      </View>

      {!fromInput && (
        <SendTimeView isUser={isUser} isDarkMode={isDarkMode} time={sendTime} />
      )}
    </View>
  );
}

/* -------------  image ----------------- */
const MessageContainer = ({
  item,
  senderUuid,
  messagesType,
  index,
  onPress,
  isDarkMode,
  fromInput,
}) => {
  const [isPlay, setIsPlay] = useState(-1);
  const [isLoading, setLoading] = useState(-1);
  const [info, setInfo] = useState({});

  let isUser = senderUuid === item.sender_uuid ? true : false;
  let sendTime = item.created_at
    ? moment(item.created_at).format('HH:MM a')
    : '';
  let message = item.content ? item.content : '';

  const pauseAudio = async () => {
    await pausePlayer();
  };

  const onStartPlay = async (url: string) => {
    setLoading(index);
    await startPlayer(url, res => {
      const {status} = res;
      switch (status) {
        case AUDIO_STATUS.begin: {
          setIsPlay(index);
          break;
        }
        case AUDIO_STATUS.play: {
          const {current_position, duration} = res.data;
          setLoading(-1);
          setInfo({
            duration: duration,
            playDuration: current_position,
            playPositionString: res.playPositionString,
          });
          setLoading(-1);
          break;
        }
        case AUDIO_STATUS.pause: {
          setInfo({isPause: true});
          setLoading(-1);
          break;
        }
        case AUDIO_STATUS.resume: {
          setInfo({isPause: false});
          setLoading(-1);
          break;
        }
        case AUDIO_STATUS.stop: {
          setIsPlay(-1);
          setLoading(-1);
          break;
        }
      }
    });
  };

  /*--------- unmount --------*/
  useEffect(() => {
    return () => {
      isPlay === index && stopPlayer();
    };
  }, []);

  if (messagesType === 3) {
    return (
      <MessageAudio
        sendTime={sendTime}
        message={message}
        index={index}
        isUser={isUser}
        isLoading={isLoading}
        info={info}
        fromInput={fromInput}
        isDarkMode={isDarkMode}
        onPress={() => (isPlay === index ? pauseAudio() : onStartPlay(message))}
      />
    );
  } else if (messagesType === 2) {
    return (
      <MessageImage
        sendTime={sendTime}
        styles={styles}
        item={item}
        message={message}
        isDarkMode={isDarkMode}
        isUser={isUser}
        onPress={() => onPress()}
      />
    );
  } else if (messagesType === 1) {
    return (
      <MessageText
        sendTime={sendTime}
        isUser={isUser}
        styles={styles}
        isDarkMode={isDarkMode}
        message={message}
      />
    );
  } else return null;
};

export default MessageContainer;
