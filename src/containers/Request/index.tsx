import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Platform} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- library ------*/
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

/* ------------- components ------------- */
import InputField, {InputButton} from 'components/Inputs';
import Header from 'components/Bars';
import DateTimePickerModal from 'components/DateTimePicker';
import MainButton from 'components/Buttons';
import Loader from 'components/Loaders';
import ConfirmBox from 'components/Boxes';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {
  navigatorPush,
  navigatorReset,
  navigatorPop,
  showMessage,
  navigatorPopToRoot,
} from 'config/navigation/navigatorOption';

/*------ utils ------*/
import {RequestInputs} from 'utils/listArrays';
import {handleError, messageFormat} from 'utils/helperFun';
import {OrderStatus, ScreenName} from 'utils/contants';
import {subjectLevelData} from 'utils/controller';

/* ------------- interfaces ------------- */
import {CreateRequestProps} from 'interfaces/containers';

/*--------- helper ------*/
import {getFontStyle, ScreenHeight, Theme} from 'utils/index';
import {requestInfoFormat, userDetails} from 'utils/controller';
import i18n from 'config/i18n';
import {SetupPayer} from 'containers/MainTab/Chat/Audio';

/*------ containers ------*/
const CreateRequest: React.FunctionComponent<CreateRequestProps> = props => {
  /*------- props -----*/
  let {
    requestUuid,
    isDarkMode,
    componentId,
    selectedListSuccess,
    createRequestError,
    createRequestSuccess,
    requestInfoSuccess,
    requestInfoError,
    updatRequestInfoError,
    updatRequestInfoSuccess,

    userInfoSuccess,
    subjectsListSuccess,
    levelsListSuccess,
    createBidError,
    createBidSuccess,
    updatBidInfoSuccess,
    updatBidInfoError,
    actions,
    isAssigned,
    isHistory,
  } = props;

  /*------- state -----*/
  const [state, setState] = useState({
    desc: '',
    bidAmount: '',
    bidUUid: '',
    isTextAreaOpen: false,
    isDatePickerShow: false,
    dueDate: new Date(),
    fields: RequestInputs(),
    selectedLevel: '',
    selectedSubject: '',
    attachments: [],
    isDelete: -1,
    isUpdateBid: false,
  });
  const [isLoading, setIsLoading] = useState(2);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let {
    isDatePickerShow,
    desc,
    isTextAreaOpen,
    fields,
    dueDate,
    bidAmount,
    isUpdateBid,
    bidUUid,
  } = state;

  /*-------- locale variable ----------*/
  let {isTutor} = userDetails(userInfoSuccess);

  /*-------- backpress ----------*/
  if (!requestUuid || isHistory) {
    useBackButton(useGoBack, props);
  }

  /*------- input value change -----*/
  const onHandleChange = (value: any, isDate?: boolean, index?: number) => {
    let array = state.fields;

    if (isDate) {
      array[3] = {
        ...state.fields[3],
        value: moment(value).format('YYYY-MM-DD'),
      };

      setState({
        ...state,
        dueDate: value,
        fields: array,
        isDatePickerShow: Platform.OS === 'ios',
      });
    } else {
      array[index] = {
        ...state.fields[index],
        value,
      };

      setState({
        ...state,
        desc: '',
        fields: array,
        isTextAreaOpen: false,
      });
    }
  };

  /*------- create request -----*/
  const handleRequestCreate = () => {
    let title = state.fields[0].value;
    let description = state.fields[4].value;
    let {selectedLevel, selectedSubject} = state;

    if (title && description && selectedLevel && selectedSubject) {
      setIsLoading(1);
      let formData = new FormData();
      formData.append(`title`, title);
      formData.append(`description`, description);
      formData.append(`subject_uuid`, selectedSubject.uuid);
      formData.append(`level_uuid`, selectedLevel.uuid);
      state.fields[3].value &&
        formData.append(`due_date`, state.fields[3].value);
      props.actions.createRequestAction(formData);
    } else {
      let message = !title
        ? i18n.t('title_not_empty')
        : !selectedLevel
        ? i18n.t('please_select_level')
        : !selectedSubject
        ? i18n.t('please_select_subject')
        : !description && i18n.t('desciption_not_empty');

      showMessage({message: message, isError: true});
    }
  };

  /*-------- complete ----------*/
  const requestToComplete = () => {
    let formData = new FormData();
    formData.append(`status`, OrderStatus.COMPLETE);

    actions.updateRequestAction(requestUuid, formData, 2);
    setIsLoading(4);
  };

  /*------- Create Bid -----*/
  const requestCreateBid = () => {
    let formData = new FormData();
    if (bidAmount) {
      formData.append(`amount`, bidAmount);
      actions.createBidAction(requestUuid, formData);
      setIsLoading(1);
    } else {
      showMessage({message: i18n.t('amount_empty'), isError: true});
    }
  };

  /*------- update Bid -----*/
  const requestUpdateBid = (bidUuid: string) => {
    let formData = new FormData();

    formData.append(`post_uuid`, requestUuid);
    if (isUpdateBid) {
      formData.append(`amount`, bidAmount);
    } else {
      formData.append(`cancelled_at`, bidAmount);
    }

    actions.updateBidAction(bidUuid, formData, 1);
    setIsLoading(1);
  };

  /*------- did mount -----*/
  useEffect(() => {
    if (requestUuid) {
      actions.requestDetailsAction(requestUuid);
    } else {
      setIsLoading(0);
    }
  }, []);

  /*------- did update -----*/
  useEffect(() => {
    if (selectedListSuccess) {
      let arr = state.fields;
      let obj = state;
      if (
        selectedListSuccess.selectedSubject &&
        selectedListSuccess.isSubject
      ) {
        let {title, titleAr} = subjectLevelData(
          selectedListSuccess.selectedSubject,
        );
        arr[1].value = title;
        obj = {...obj, selectedSubject: selectedListSuccess.selectedSubject};
      } else if (selectedListSuccess.selectedLevel) {
        let {title, titleAr} = subjectLevelData(
          selectedListSuccess.selectedLevel,
        );
        arr[2].value = title;
        obj = {...obj, selectedLevel: selectedListSuccess.selectedLevel};
      }
      obj = {...obj, fields: arr};
      setState(obj);
    }

    /*------- request -----*/
    if (createRequestSuccess?.data?.message) {
      setIsLoading(0);
      showMessage({message: messageFormat(createRequestSuccess)});
      SetupPayer('bid_bell.wav');
      setTimeout(() => {
        actions.resetRequestAction();
        navigatorPush(componentId, ScreenName.MAIN_TAB, {
          isDarkMode,
          requestUuid: createRequestSuccess.data.data.uuid,
          fromCreate: true,
        });
      }, 2000);

      // setTimeout(() => {
      //   navigatorReset(componentId, ScreenName.DASHBOARD, {
      //     isDarkMode,
      //   });
      // }, 2000);
    }
    if (createRequestError) {
      setIsLoading(0);
      handleError(createRequestError,actions);
    }

    /*------- request details -----*/
    if (requestInfoSuccess?.data && requestInfoSuccess.data.length > 0) {
      let obj = requestInfoFormat(
        requestInfoSuccess.data[0],
        subjectsListSuccess,
        levelsListSuccess,
      );
      let array = RequestInputs(obj);
      setState({
        ...state,
        bidAmount: obj.bidAmount,
        bidUUid: obj.bidUuid,
        fields: array,
      });

      setIsLoading(0);
    }

    if (requestInfoError) {
      handleError(requestInfoError,actions);
      setIsLoading(0);
    }

    /*-------- update ----------*/
    if (updatRequestInfoSuccess?.callFrom === 2) {
      SetupPayer('bid_bell.wav');
      showMessage({message: messageFormat(updatRequestInfoSuccess)});
      setTimeout(() => {
        navigatorReset(componentId, ScreenName.DASHBOARD, {
          isDarkMode,
        });
      }, 2000);
      setIsModalVisible(false);
      setIsLoading(0);
    }
    if (updatRequestInfoError?.callFrom === 2) {
      setIsLoading(0);
      handleError(updatRequestInfoError,actions);
    }
  }, [
    selectedListSuccess,
    createRequestSuccess,
    createRequestError,
    requestInfoSuccess,
    requestInfoError,
    updatRequestInfoError,
    updatRequestInfoSuccess,
  ]);

  /*------- did update -----*/
  useEffect(() => {
    if (createBidSuccess) {
      showMessage({message: messageFormat(createBidSuccess)});
      setIsLoading(0);
      SetupPayer('bid_bell.wav');
      setTimeout(() => {
        navigatorReset(componentId, ScreenName.DASHBOARD, {
          isDarkMode,
        });
      }, 2000);
    }
    if (createBidError) {
      setIsLoading(0);
      handleError(createBidError,actions);
    }

    /*------- update  bid -----*/
    if (updatBidInfoSuccess?.callFrom === 1) {
      showMessage({message: messageFormat(updatBidInfoSuccess)});
      setIsLoading(0);
      SetupPayer('bid_bell.wav');
      setTimeout(() => {
        navigatorReset(componentId, ScreenName.DASHBOARD, {
          isDarkMode,
        });
      }, 2000);
    }
    if (updatBidInfoError?.callFrom === 1) {
      setIsLoading(0);
      handleError(updatBidInfoError,actions);
    }
  }, [
    createBidError,
    createBidSuccess,
    updatBidInfoSuccess,
    updatBidInfoError,
  ]);

  /*------- locales -----*/
  let isRequestUpdateBid = true;
  let isRequestRemoveBid = false;
  if (isAssigned && bidUUid && isTutor) {
    isRequestUpdateBid = false;
  }
  if (isTutor && bidUUid) {
    isRequestRemoveBid = true;
  }
  if (isHistory) {
    isRequestUpdateBid = false;
  }

  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      {/*------ Header ------*/}
      <Header
        componentId={componentId}
        title={
          requestUuid ? i18n.t('request_details') : i18n.t('create_request')
        }
        isTextAreaHeader={isTextAreaOpen}
        onBackPress={() =>
          isTextAreaOpen
            ? setState({
                ...state,
                desc: '',
                isTextAreaOpen: false,
              })
            : props.fromCreate
            ? navigatorPopToRoot(props)
            : navigatorPop(props)
        }
        onDrawerOpen={
          isTextAreaOpen
            ? () => {
                onHandleChange(desc, false, 4);
              }
            : false
        }
      />

      {/*------ InputField ------*/}
      {isLoading === 2 ? (
        <Loader />
      ) : (
        <KeyboardAwareScrollView
          bounces={false}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          {isTextAreaOpen ? (
            <View style={styles.mainContainer}>
              <InputField
                isDarkMode={isDarkMode}
                placeholder={i18n.t('enter_here')}
                label={i18n.t('description')}
                value={desc}
                isEditableFalse={requestUuid ? true : false}
                isMultiline={true}
                inceaseSize={ScreenHeight / 2}
                onChangeText={(desc: string) => {
                  setState({
                    ...state,
                    desc,
                  });
                }}
              />
            </View>
          ) : (
            <View style={styles.mainContainer}>
              {fields.map((input, index) => {
                if (index === 3 && requestUuid && !input.value) return null;
                return (
                  <View key={input.uuid} style={styles.inputStyle}>
                    {input.isInput ? (
                      <InputField
                        isDarkMode={isDarkMode}
                        placeholder={input.placeholder}
                        label={input.label}
                        value={input.value}
                        isEditableFalse={requestUuid ? true : false}
                        onChangeText={(value: string) => {
                          onHandleChange(value, false, index);
                        }}
                      />
                    ) : (
                      <InputButton
                        value={input.value}
                        placeholder={input.placeholder}
                        label={input.label}
                        onChangeText={() => {
                          !requestUuid && index > 2
                            ? setState({
                                ...state,
                                desc: input.value,
                                isTextAreaOpen: index === 4,
                                isDatePickerShow: index === 3,
                              })
                            : !requestUuid &&
                              navigatorPush(
                                componentId,
                                ScreenName.SUBJECT_LEVEL_LIST,
                                {
                                  isDarkMode,
                                  listType: index,
                                  title: input.label,
                                  isSubject: index === 1,
                                },
                              );
                        }}
                        showIcon={
                          !requestUuid && index === 3 && input.value
                            ? true
                            : false
                        }
                        onPressUpdate={() => {
                          !requestUuid && index === 3 && input.value
                            ? onHandleChange('', false, index)
                            : false;
                        }}
                        inceaseSize={input.inceaseSize}
                        isDarkMode={isDarkMode}
                      />
                    )}

                    {/*----------------- date ----------------*/}
                    {!requestUuid && input.uuid === 'due_date' && (
                      <View style={{position: 'absolute', opacity: 0}}>
                        <DateTimePickerModal
                          minimumDate={new Date()}
                          onClose={() => {
                            setState({
                              ...state,
                              isDatePickerShow: false,
                            });
                          }}
                          onChange={(e: any, date: Date) => {
                            onHandleChange(date, true);
                          }}
                          isDarkMode={isDarkMode}
                          isDatePickerShow={isDatePickerShow}
                          value={dueDate}
                        />
                      </View>
                    )}
                  </View>
                );
              })}

              {/*------ bid amount ------*/}
              {!isAssigned && isTutor && !isHistory && (
                <View>
                  <View style={[styles.bidView, globalStyle.row]}>
                    <Text
                      style={[
                        styles.bidText,
                        {color: Theme(isDarkMode).black00},
                        getFontStyle(i18n.locale).bold,
                      ]}>
                      {i18n.t('what_is_your_offer')}
                    </Text>
                  </View>
                  <InputField
                    isDarkMode={isDarkMode}
                    label={i18n.t('bid_amount')}
                    placeholder={'0.00'}
                    value={bidAmount}
                    isEditableFalse={
                      isUpdateBid ? false : bidUUid ? true : false
                    }
                    rightTitle={
                      isUpdateBid ? i18n.t('cancel') : i18n.t('update')
                    }
                    keyboardType={'numeric'}
                    marginBottom={30}
                    onPressUpdate={
                      bidUUid
                        ? () => {
                            setState({
                              ...state,
                              isUpdateBid: !isUpdateBid,
                            });
                          }
                        : false
                    }
                    onChangeText={(bidAmount: string) => {
                      setState({
                        ...state,
                        bidAmount,
                      });
                    }}
                  />
                </View>
              )}
            </View>
          )}

          {/*------ main button ------*/}
          {isRequestUpdateBid && (
            <View style={styles.buttonStyle}>
              <MainButton
                title={
                  isUpdateBid
                    ? i18n.t('update_bid')
                    : isRequestRemoveBid
                    ? i18n.t('remove_my_bid')
                    : isTutor
                    ? i18n.t('submit')
                    : requestUuid
                    ? i18n.t('cancel_request')
                    : i18n.t('save')
                }
                isDarkMode={isDarkMode}
                backgroundColor={
                  isUpdateBid
                    ? Theme(isDarkMode).primary
                    : isRequestRemoveBid
                    ? Theme(isDarkMode).orange
                    : requestUuid
                    ? Theme(isDarkMode).secondary
                    : Theme(isDarkMode).primary
                }
                titleColor={Theme(false).white}
                isLoading={isLoading === 1 ? true : false}
                onPress={() => {
                  isRequestRemoveBid
                    ? requestUpdateBid(bidUUid)
                    : isTutor
                    ? requestCreateBid()
                    : requestUuid
                    ? navigatorPush(componentId, ScreenName.CANCEL_REQUEST, {
                        requestUuid,
                        isAssigned,
                        isDarkMode,
                      })
                    : isTextAreaOpen
                    ? onHandleChange(desc, false, 4)
                    : handleRequestCreate();
                }}
              />

              {/*------ complete_request ------*/}
              {isAssigned && isRequestUpdateBid && (
                <View style={styles.marginStyle}>
                  <MainButton
                    title={i18n.t('complete_request')}
                    isDarkMode={isDarkMode}
                    backgroundColor={Theme(isDarkMode).primary}
                    titleColor={Theme(false).white}
                    onPress={() => {
                      setIsModalVisible(true);
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </KeyboardAwareScrollView>
      )}

      {/*-------- delete address ----------*/}
      <ConfirmBox
        isVisible={isModalVisible}
        isDarkMode={isDarkMode}
        isShow={true}
        heading={i18n.t('complete_request')}
        subtitle={i18n.t('complete_request_message')}
        onPress={() => {
          requestToComplete();
        }}
        isLoading={isLoading === 4 ? true : false}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  selectedListSuccess: state.requestReducer.selectedListSuccess,

  createRequestSuccess: state.requestReducer.createRequestSuccess,
  createRequestError: state.requestReducer.createRequestError,
  requestInfoSuccess: state.requestReducer.requestInfoSuccess,
  requestInfoError: state.requestReducer.requestInfoError,
  updatRequestInfoSuccess: state.requestReducer.updatRequestInfoSuccess,
  updatRequestInfoError: state.requestReducer.updatRequestInfoError,

  subjectsListSuccess: state.requestReducer.subjectsListSuccess,
  levelsListSuccess: state.requestReducer.levelsListSuccess,

  createBidSuccess: state.bidReducer.createBidSuccess,
  createBidError: state.bidReducer.createBidError,
  updatBidInfoSuccess: state.bidReducer.updatBidInfoSuccess,
  updatBidInfoError: state.bidReducer.updatBidInfoError,

  userInfoSuccess: state.profileReducer.userInfoSuccess,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);
