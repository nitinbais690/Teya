import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Platform,
  FlatList,
  AppState,
} from 'react-native';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- components ------------- */
import {CircleProfileImage} from 'components/Boxes';
import ZoomImageView from 'components/ZoomImageView';
import ChatInput from './ChatTools';
import MessageContainer from './Message';
import ConfirmBox from 'components/Boxes';
import Loader from 'components/Loaders';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {navigatorPop, navigatorPopTo} from 'config/navigation/navigatorOption';

/*------ interfaces ------*/
import {ChatProps} from 'interfaces/containers';
import {requestInfoFormat, chatUserInfo, userDetails} from 'utils/controller';

/*------ library ------*/
import uuid from 'uuid-random';
import OneSignal from 'react-native-onesignal';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';
import {SetupPayer} from './Audio';
import config from 'config/index';
import {
  handleError,
  imageURL,
  selectImageOption,
  uploadImage,
  isCloseToBottom,
} from 'utils/helperFun';
import {AppConst} from 'utils/contants';
import {getReadWritePermission} from 'utils/permissionFunction';

const audioPlayer = new AudioRecorderPlayer();

/*------ containers ------*/
const Chat: React.FunctionComponent<ChatProps> = props => {
  /*-------- props ----------*/
  let {
    isDarkMode,
    uploadAttachmentChatError,
    uploadAttachmentChatSuccess,
    updatRequestInfoError,
    updatRequestInfoSuccess,
    getMessagesListSuccess,
    getMessagesListError,
    requestInfoSuccess,
    createChatSuccess,
    createChatError,
    requestUuid,
    userInfoSuccess,
    actions,
  } = props;

  let {chatUuid, assignedUuid, userUuid} = requestInfoFormat(
    requestInfoSuccess ? requestInfoSuccess.data[0] : {},
  );

  /*-------- locale variable ----------*/
  let {userUuid: senderUuid, isTutor} = userDetails(userInfoSuccess);
  let {fullName, profileImageUrl} = chatUserInfo(
    requestInfoSuccess ? requestInfoSuccess.data[0] : {},
    isTutor,
  );

  /*-------- state ----------*/
  const [message, setMessage] = useState('');
  const [state, setState] = useState({
    imageUrl: '',
    messages: [],
    imageSource: {path: '', mime: ''},
    currentPage: 1,
    lastPage: 1,
  });

  const [isRecording, setIsRecording] = useState(0);
  const [isAppBackground, setAppBackground] = useState(AppState.currentState);
  const [ws, setWsConnection] = useState({
    OPEN: '',
    onopen: '',
    close: '',
    onmessage: '',
  });

  /*-------- audio ----------*/
  const [recordingPath, setRecordedPath] = useState('');
  const [recordingDuration, setRecordingDuration] = useState('0:00');

  const [isModalVisible, setIsModalVisible] = useState(0);
  const [isPaused, setPause] = useState(false);

  /*-------- state ----------*/
  const [isLoading, setLoading] = useState(1);
  let {imageUrl, messages, currentPage, lastPage, imageSource} = state;

  /*------- messages -----*/
  const getMessage = (chatUuid: string, page: number, perPage?: number) => {
    actions.chatMessagesAction(chatUuid, page, perPage);
  };

  /*------- messages -----*/
  const createChatUi = () => {
    let formData = new FormData();
    formData.append(`participants`, JSON.stringify([userUuid, assignedUuid]));
    actions.createChatAction(formData);
  };

  /*------- update request -----*/
  const requestUpdateRequest = (chatUuid: string) => {
    let formData = new FormData();
    formData.append(`chat_uuid`, chatUuid);
    actions.updateRequestAction(requestUuid, formData, 4);
  };

  /*------- upload Attachement Request -----*/
  const uploadAttachementRequest = (attachment: any, type?: number) => {
    let formData = new FormData();
    formData.append(`attachment`, attachment);
    formData.append('sender_uuid', senderUuid);
    actions.uploadAttachementChatAction(chatUuid, formData, type);
  };

  /*------------------ audio -------------------*/
  const handleRecording = async () => {
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const path = Platform.select({
      ios: `${uuid()}.m4a`,
      android: `sdcard/${uuid()}.mp4`,
    });

    const uri = await audioPlayer.startRecorder(path, audioSet);
    setRecordedPath(uri);
    setIsRecording(1);
    audioPlayer.addRecordBackListener(e => {
      setRecordingDuration(audioPlayer.mmssss(Math.floor(e.current_position)));
      return;
    });
  };

  const handleRecordingStatus = async (type: number) => {
    if (isRecording) {
      setIsRecording(type === 3 ? 0 : type);
      if (isRecording === 1) {
        const result = await audioPlayer.stopRecorder();
        audioPlayer.removeRecordBackListener();
      }
      if (type === 1) {
        setRecordingDuration('0:00');
        setRecordedPath('');
      } else if (type === 3) {
        var path = recordingPath;
        var extension = path.substr(path.lastIndexOf('.') + 1);
        var name = `${uuid()}.${extension}`;

        const attachment = {
          uri: path,
          name: name,
          type: Platform.OS === 'android' ? 'audio/mp4' : 'audio',
        };
        uploadAttachementRequest(attachment);
        setRecordingDuration('0:00');
        setRecordedPath('');
      }
    } else if (Platform.OS === 'android') {
      let granted = await getReadWritePermission();
      granted && handleRecording();
    } else {
      setTimeout(() => {
        handleRecording();
      }, 2000)
    }
  };

  const getOpenConnection = () => {
    if (ws.OPEN) {
      ws.onopen = e => {
        ws.send(JSON.stringify({action: 'set-chat', chat_uuid: chatUuid}));
        setPause(true);
      };
      ws.onclose = e => {
        // console.log(
        //   `Socket is closed. Reconnect will be attempted in ${Math.min(
        //     10000 / 1000,
        //   )} second.`,
        //   e.reason,
        // );
        checkConnection();
      };

      /*--------  connection error ----------*/

      ws.onerror = err => {
        ws.close();
      };
    }
  };

  useEffect(() => {
    getOpenConnection();
    return () => {};
  }, [ws]);

  /*--------  connect ----------*/
  const getWebConnect = () => {
    let ws = new WebSocket(config.WEBSOKET_BASE_URL);
    setWsConnection(ws);
  };

  /*-------- on message recevied ----------*/
  useEffect(() => {
    if (ws.OPEN) {
      ws.onmessage = d => {
        var finalizedData = JSON.parse(d.data);
        console.log('ws.onmessage ' + d.data);
        var msg = {
          uuid: finalizedData.uuid,
          sender_uuid: finalizedData.sender_uuid,
          chat_uuid: finalizedData.chat_uuid,
          type: finalizedData.type,
          content: finalizedData.content,
          created_at: finalizedData.created_at,
        };
        if (
          finalizedData.action === 'ping' ||
          finalizedData.action === 'pong'
        ) {
        } else {
          if (senderUuid !== finalizedData.sender_uuid) {
            SetupPayer('chat_message.wav');
            updateMessagesList(msg);
          } else {
            updateMessagesList(msg);
          }
        }
      };
    } else {
      checkConnection();
    }

    /*-------- timeInterval ----------*/
    let timeInterval = setInterval(() => {
      onSendMessage('text', 'keep connecting', 'pong');
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      /*-------- close connection ----------*/
      ws.OPEN && ws.close();
    };
  }, [isPaused]);

  /*------- select image -----*/
  const handleSelectImage = async (isCamera: boolean) => {
    let imageSource = await selectImageOption(isCamera, false);
    setState({
      ...state,
      imageSource,
    });
    setIsModalVisible(4);
  };

  /*-------- attachment ----------*/
  const handleAttachment = (isImage?: boolean) => {
    if (isImage) {
      let image = uploadImage(imageSource);
      uploadAttachementRequest(image, 1);
      setIsModalVisible(0);
      setState({
        ...state,
        imageSource: {path: ''},
      });
    } else {
      setIsModalVisible(1);
    }
  };

  /*-------- on send message ----------*/
  const onSendMessage = (type: string, content: any, action?: string) => {
    console.log('onSendMessage content', JSON.stringify(content));
    var msg = {
      uuid: uuid(),
      api_key: config.API_KEY,
      sender_uuid: senderUuid,
      chat_uuid: chatUuid,
      type: type,
      content,
      action: action ? action : 'send',
    };

    try {
      if (isPaused) {
        ws.send(JSON.stringify(msg));
      }
    } catch (e) {
      checkConnection();
      setTimeout(() => {
        ws.send(JSON.stringify(msg));
      }, 1000);
    }
    if (!action && type === 'text') {
      console.log('text clear ');
      setMessage('');
    }
  };

  /*-------- push message ----------*/
  const updateMessagesList = async (msg: any) => {
    let _state = state;
    let isActive = false;
    let array = _state.messages;
    if (_state.messages && _state.messages.length === 0) {
      let jsonData = await AsyncStorage.getItem(AppConst.MESSAGE_BACK);
      if (jsonData) {
        isActive = true;
        let a = JSON.parse(jsonData);
        array = a;
        a.unshift(msg);
        AsyncStorage.setItem(AppConst.MESSAGE_BACK, JSON.stringify(a));
      }
    }
    !isActive && array.unshift(msg);
    setState({
      ...state,
      messages: array,
    });
  };

  const checkConnection = () => {
    if (ws.readyState == WebSocket.CLOSED) getOpenConnection();
  };

  /*-------- on Loadmore ----------*/
  const onLoaderMore = (page: number) => {
    getMessage(chatUuid, page);
    setLoading(2);
  };

  /*-------- appState ----------*/
  const handleChange = (newState: string) => {
    setAppBackground(newState);
    if (newState === 'active') {
      getOpenConnection();
    } else if (newState === 'background') {
      AsyncStorage.setItem(
        AppConst.MESSAGE_BACK,
        JSON.stringify(state.messages),
      );
    }
  };

  /*-------- did mount ----------*/
  useEffect(() => {
    AppState.addEventListener('change', handleChange);
    if (chatUuid) {
      getWebConnect();
      getMessage(chatUuid, 1);
    } else if (props.chatUuid) {
      actions.requestDetailsAction(props.requestUuid);
      getWebConnect();
      getMessage(props.chatUuid, 1);
    } else {
      createChatUi();
    }

    /*------------- O N E S I G N A L  H A N D L E R S ---------------*/
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      let notif = notifReceivedEvent.getNotification();
      let noifyData = notif.additionalData;
      if (
        noifyData.chat_uuid === chatUuid ||
        noifyData.chat_uuid === props.chatUuid
      ) {
        if (isAppBackground === 'active') {
          setTimeout(() => notifReceivedEvent.complete(), 0);
        } else {
          setTimeout(() => notifReceivedEvent.complete(notif), 0);
        }
      } else {
        setTimeout(() => notifReceivedEvent.complete(notif), 0);
      }
    });

    return async () => {
      if (isRecording) {
        await audioPlayer.stopRecorder();
        audioPlayer.removeRecordBackListener();
      }
      AppState.removeEventListener('change', handleChange);
    };
  }, []);

  /*-------- did update ----------*/
  useEffect(() => {
    /*-------- chat ----------*/
    if (createChatError) {
      handleError(updatRequestInfoError, actions);
      setLoading(0);
    }

    if (
      createChatSuccess &&
      createChatSuccess.data &&
      createChatSuccess.data.data &&
      createChatSuccess.data.data.uuid
    ) {
      requestUpdateRequest(createChatSuccess.data.data.uuid);
    }

    /*-------- update post ----------*/
    if (updatRequestInfoSuccess?.callFrom === 4) {
      getWebConnect();
      getMessage(chatUuid, 1);
    }
    if (updatRequestInfoError?.callFrom === 4) {
      setLoading(0);
      handleError(updatRequestInfoError, actions);
    }
  }, [
    updatRequestInfoError,
    updatRequestInfoSuccess,
    createChatError,
    createChatSuccess,
  ]);

  /*-------- attachment ----------*/
  useEffect(() => {
    if (uploadAttachmentChatError) {
      handleError(uploadAttachmentChatError, actions);
      setLoading(0);
    }
    if (
      uploadAttachmentChatSuccess &&
      uploadAttachmentChatSuccess.data &&
      uploadAttachmentChatSuccess.data.data &&
      uploadAttachmentChatSuccess.data.data.uri
    ) {
      onSendMessage(
        uploadAttachmentChatSuccess.type === 1 ? 'image' : 'audio',
        uploadAttachmentChatSuccess.data.data.uri,
      );
    }
  }, [uploadAttachmentChatError, uploadAttachmentChatSuccess]);

  /*-------- did update attachment ----------*/
  useEffect(() => {
    /*-------- chat messages ----------*/
    if (getMessagesListSuccess?.data?.data) {
      let messagesArray = getMessagesListSuccess.data.data;
      if (getMessagesListSuccess.data.current_page === 1) {
        console.log(
          'current_page 1 ',
          getMessagesListSuccess.data.current_page,
        );
        setState({
          ...state,
          messages: messagesArray,
          currentPage: parseInt(getMessagesListSuccess.data.current_page),
        });
      } else {
        let array = messages;
        messagesArray.length > 0 &&
          messagesArray.forEach(message => {
            array.push(message);
          });
        setState({
          ...state,
          messages: array,
          currentPage: parseInt(getMessagesListSuccess.data.current_page),
          lastPage: messagesArray.length,
        });
      }
      AsyncStorage.setItem(
        AppConst.MESSAGE_BACK,
        JSON.stringify(messagesArray),
      );
      setLoading(0);
    }

    if (getMessagesListError) {
      handleError(uploadAttachmentChatError, actions);
      setLoading(0);
    }
  }, [getMessagesListSuccess, getMessagesListError]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      <SafeAreaView />
      {/* ------------- KeyboardAvoidingView ------------- */}
      {isLoading === 1 ? (
        <Loader />
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          {...(Platform.OS === 'ios' && {behavior: 'padding'})}>
          <View style={[styles.mainChatScreen]}>
            <View style={globalStyle.container}>
              {/* ------------- message list ------------- */}
              {messages.length > 0 && (
                <FlatList
                  data={messages}
                  inverted
                  showsVerticalScrollIndicator={false}
                  refreshing={false}
                  onRefresh={() => {
                    onLoaderMore(1);
                  }}
                  onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                      isLoading !== 2 &&
                        lastPage &&
                        onLoaderMore(currentPage + 1);
                    }
                  }}
                  style={{flex: 1}}
                  // extraData={messages}
                  renderItem={({item, index}) => {
                    let messagesType =
                      item.type === 'audio'
                        ? 3
                        : item.type === 'image'
                        ? 2
                        : item.type === 'text'
                        ? 1
                        : 0;
                    return (
                      <MessageContainer
                        item={item}
                        index={index}
                        key={item.uuid}
                        senderUuid={senderUuid}
                        isDarkMode={isDarkMode}
                        messagesType={messagesType}
                        onPress={() => {
                          messagesType === 2 &&
                            setState({
                              ...state,
                              imageUrl: item.content,
                            });
                          setIsModalVisible(3);
                        }}
                      />
                    );
                  }}
                  onEndReachedThreshold={0.9}
                  ListFooterComponent={
                    isLoading === 2 ? (
                      <View style={styles.bottomLoader}>
                        <Loader />
                      </View>
                    ) : null
                  }
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>

            {/* ------------- input box ------------- */}
            <ChatInput
              onChangeText={(message: string) => {
                setMessage(message);
              }}
              chatText={message}
              isDarkMode={isDarkMode}
              recordingDuration={recordingDuration}
              isRecording={isRecording}
              onPressAttachment={() => {
                handleAttachment();
              }}
              senderUUid={senderUuid}
              recordingPath={recordingPath}
              handleRecording={(type: number) => {
                handleRecordingStatus(type);
              }}
              onSendMessage={() => {
                message && onSendMessage('text', message);
                isRecording && handleRecordingStatus(3);
              }}
            />

            {/* ------------- user info ------------- */}
            <View
              style={[
                styles.topView,
                {backgroundColor: Theme(isDarkMode).whiteF8},
              ]}>
              <View style={styles.contentStyle}>
                <CircleProfileImage
                  name={fullName}
                  url={imageURL(
                    isTutor ? userUuid : assignedUuid,
                    profileImageUrl,
                  )}
                  isHorizental={true}
                  onPress={() => {
                    props.fromCreate
                      ? navigatorPopTo(props)
                      : navigatorPop(props);
                  }}
                  isDarkMode={isDarkMode}
                />
              </View>
            </View>
          </View>

          {/* ------------- preview ------------- */}
          <ZoomImageView
            isDarkMode={isDarkMode}
            url={imageUrl}
            isActive={isModalVisible === 3 ? true : false}
            onPress={() => {
              setIsModalVisible(0);
              setTimeout(() => {
                setState({
                  ...state,
                  imageUrl: '',
                });
              }, 1000);
            }}
          />

          {/* ------------- upload image ------------- */}
          <ConfirmBox
            isDarkMode={isDarkMode}
            isConfirmToSend={isModalVisible === 4 ? true : false}
            type={isModalVisible}
            isShow={isModalVisible === 4 ? true : false}
            onPress={(isCamera: boolean) => {
              if (isModalVisible === 4) {
                handleAttachment(true);
              } else {
                setTimeout(() => {
                  handleSelectImage(isCamera);
                }, 2000);
              }
              setIsModalVisible(0);
            }}
            onCancel={() => {
              setIsModalVisible(0);
            }}
            url={imageSource.path}
            heading={i18n.t('upload_image')}
            subtitle={
              isModalVisible === 4
                ? i18n.t('do_you_want_to_upload')
                : i18n.t('upload_image_desc')
            }
            isVisible={
              isModalVisible === 1 ? true : isModalVisible === 4 ? true : false
            }
          />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

/* ------------- received props ------------- */
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  updatRequestInfoSuccess: state.requestReducer.updatRequestInfoSuccess,
  updatRequestInfoError: state.requestReducer.updatRequestInfoError,
  requestInfoSuccess: state.requestReducer.requestInfoSuccess,

  getMessagesListSuccess: state.requestReducer.getMessagesListSuccess,
  getMessagesListError: state.requestReducer.getMessagesListError,

  createChatSuccess: state.requestReducer.createChatSuccess,
  createChatError: state.requestReducer.createChatError,
  uploadAttachmentChatError: state.requestReducer.uploadAttachmentChatError,
  uploadAttachmentChatSuccess: state.requestReducer.uploadAttachmentChatSuccess,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
