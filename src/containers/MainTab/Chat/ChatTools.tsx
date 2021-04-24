import React from 'react';
import {View, TouchableOpacity, Image, Text, TextInput} from 'react-native';

/* ------------- utils ------------- */
import styles from './styles';
import globalStyle from 'config/globalStyle';
import i18n from 'config/i18n';
import {getScaleSize, Theme} from 'utils/index';

/* ------------- interfaces ------------- */
import {ChatInputProps} from 'interfaces/components';
import MessageContainer from './Message';

/* ------------- button ------------- */
const ChatInputButton = ({onPress, type}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
       onPress={() => {
        type !== 1 && onPress();
      }}
      onLongPress={() => {
        type === 1
          ? 
           onPress(1)
          : {};
      }}
      onPressOut={()=> {type === 1 ? onPress(2) :  {}}}
      style={[
        type === 0
          ? {...styles.senderIcon, backgroundColor: Theme(false).primary}
          : styles.microIcon,
        {marginLeft: getScaleSize(10)},
      ]}>
      <Image
        source={
          type === 4
            ? require('../../../assets/icons/stop.svg')
            : type === 3
            ? require('../../../assets/icons/trash.svg')
            : type === 2
            ? require('../../../assets/icons/attach.svg')
            : type === 1
            ? require('../../../assets/icons/microphone.svg')
            : require('../../../assets/icons/paper_plane.svg')
        }
        style={globalStyle.contain}
      />
    </TouchableOpacity>
  );
};

/* ------------- components ------------- */
const ChatInput = (props: ChatInputProps) => {
  const {
    chatText,
    recordingDuration,
    onPressAttachment,
    onChangeText,
    handleRecording,
    onSendMessage,
    isDarkMode,
    isRecording,
    senderUuid,
    recordingPath,
  } = props;

  let isRecordingTime = false;
  if (recordingDuration) {
    isRecordingTime = true;
  }

  return (
    <View
      style={[
        styles.mainTextInput,
        {
          backgroundColor: Theme(isDarkMode).white,
          shadowColor: Theme(isDarkMode).grayB8,
          flexDirection: i18n.locale === 'ar' ? 'row-reverse' : 'row',
        },
        isRecording && recordingDuration && {paddingLeft: 0},
      ]}>
      {!isRecording ? (
        <View style={styles.inputContainer}>
          {/* ------------- input ------------- */}
          <TextInput
            style={{
              ...styles.inputStyle,
              // textAlign: i18n.locale === 'ar' ? 'right' : 'left',
              color: Theme(isDarkMode).black00,
            }}
            value={chatText}
            autoCapitalize={'none'}
            autoCorrect={true}
            multiline={true}
            // blurOnSubmit={true}
            onChangeText={onChangeText}
            placeholderTextColor={Theme(isDarkMode).black00}
            placeholder={i18n.t('type_message')}
          />
        </View>
      ) : isRecording === 2 ? (
        <View style={[globalStyle.rowSpaceBetween, styles.recordInput]}>
          <ChatInputButton type={3} onPress={() => handleRecording(0)} />
          <MessageContainer
            item={{sender_uuid: senderUuid, content: recordingPath}}
            senderUuid={senderUuid}
            isDarkMode={isDarkMode}
            index={0}
            isUser={false}
            messagesType={3}
            fromInput={true}
          />
        </View>
      ) : (
        <View style={styles.recodingStyle}>
          <View>
            <Text
              style={[styles.textStyle, {color: Theme(isDarkMode).black00}]}>
              {recordingDuration.replace('.', ':')}{' '}
            </Text>
          </View>

          <View />
        </View>
      )}

      {/* ------------- image ------------- */}
      <View
        style={[
          styles.rowContainer2,
          {flexDirection: i18n.locale === 'ar' ? 'row-reverse' : 'row'},
        ]}>
        {!isRecording && (
          <ChatInputButton onPress={() => onPressAttachment()} type={2} />
        )}

        {/* ------------- recording ------------- */}
        {isRecording !== 2 && (
          <ChatInputButton
            onPress={(val) => handleRecording(val)}
            type={1}
          />
        )}

        {/* ------------- send ------------- */}
        <ChatInputButton onPress={() => onSendMessage()} type={0} />
      </View>
    </View>
  );
};

export default ChatInput;
