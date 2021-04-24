import React, {Fragment, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Image, View, Text} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- components ------------- */
import InputField, {InputButton} from 'components/Inputs';
import ConfirmBox from 'components/Boxes';
import MainButton from 'components/Buttons';
import {CircleProfileImage} from 'components/Boxes';
import Header from 'components/Bars';

/*--------- library ------*/
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {
  changeSideMenuVisibility,
  navigatorPush,
  showMessage,
} from 'config/navigation/navigatorOption';

/*------ interfaces ------*/
import {ProfileProps} from 'interfaces/containers';

/*--------- helper ------*/
import {getFontStyle, Theme, ScreenHeight} from 'utils/index';
import i18n from 'config/i18n';
import {ProfileInputs} from 'utils/listArrays';
import {ScreenName} from 'utils/contants';
import {SelectedSubjectLevel} from 'components/Rows';
import {
  emailValidation,
  handleError,
  handlePhoneValidation,
  imageURL,
  messageFormat,
  selectImageOption,
  uploadImage,
} from 'utils/helperFun';
import {subjectLevelMap, userDetails} from 'utils/controller';

/*------ containers ------*/
const Profile: React.FunctionComponent<ProfileProps> = (props) => {
  let {
    updatUserInfoError,
    updatUserInfoSuccess,
    selectedListSuccess,
    subjectsListSuccess,
    levelsListSuccess,
    userInfoSuccess,
    isDarkMode,
    actions,
    componentId,
  } = props;

  /*-------- locale variable ----------*/
  let {profileImageUrl, isTutor, userUuid} = userDetails(userInfoSuccess);

  /*-------- state ----------*/
  const [state, setState] = useState({
    inputs: isTutor
      ? ProfileInputs(userDetails(userInfoSuccess))
      : ProfileInputs(userDetails(userInfoSuccess)).slice(0, 6),
    isCountryPickerVisible: -1,
    isImageSelectOption: false,
    profilePhotoUrl: '',
    profileImageUrl,
    desc: '',
    isTextAreaOpen: false,
  });

  const [isUpdate, setIsUpdate] = useState(false);

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*------- state -----*/
  let {isTextAreaOpen, desc} = state;

  /*--------  select country ----------*/
  const onSelectCountry = (country: {
    cca2: string;
    callingCode: Array<any>;
  }) => {
    let array = state.inputs;
    array[5].countryCode = '+' + country.callingCode[0];

    setState({
      ...state,
      isCountryPickerVisible: -1,
      inputs: array,
    });
  };

  /*--------  validation ----------*/
  const handleValidation = async (email: string, numberVal?: object) => {
    let checkError = '';
    if (email) {
      checkError = await emailValidation(email);
    } else {
      checkError = await handlePhoneValidation(
        numberVal.phone,
        numberVal.countryCode,
      );
    }
    if (checkError.length === 0) {
      return false;
    } else {
      showMessage({message: checkError, isError: true});
      return true;
    }
  };

  /*------- select image -----*/
  const OnSelectImage = async (isCemara: boolean) => {
    let imageSource = await selectImageOption(isCemara, false);
    setState({
      ...state,
      profilePhotoUrl: imageSource,
      isImageSelectOption: false,
    });
  };

  /*------- update profile -----*/
  const updateRequest = async () => {
    let {profilePhotoUrl, inputs} = state;
    let formData = new FormData();
    let phoneObj = {phone: inputs[5].value, countryCode: inputs[5].countryCode};

    let isErrorPhone = inputs[5].value
      ? await handleValidation('', phoneObj)
      : false;

    let isErrorEmail = inputs[4].value
      ? await handleValidation(inputs[4].value)
      : false;

    /*------- email -----*/
    if (profilePhotoUrl) {
      let image = uploadImage(profilePhotoUrl);
      image.uri && formData.append(`profile_image`, image);
    }

    /*------- other -----*/
    if (!isErrorPhone && !isErrorEmail) {
      inputs.forEach((element, index) => {
        if (index !== 1) {
          if (element.list && element.list.length > 0) {
            var selectedSubLevel = [];
            element.list.forEach((data) => {
              selectedSubLevel.push(data.uuid);
            });
            formData.append(
              element.uuid === 'level' ? `levels_pref` : 'subjects_pref',
              JSON.stringify(selectedSubLevel),
            );
          } else if (element.value) {
            formData.append(`${element.uuid}`, element.value);
            element.uuid === 'phone' &&
              formData.append(`country_code`, phoneObj.countryCode);
          }
        }
      });

      setIsUpdate(true);
      actions.updateProfileAction(userUuid, formData, 1);
    }
  };

  /*------- load more data -----*/
  const onHandleChange = (value: any, index: number) => {
    let array = state.inputs;

    array[index] = {
      ...state.inputs[index],
      value,
    };

    setState({
      ...state,
      desc: '',
      inputs: array,
      isTextAreaOpen: false,
    });
  };

  /*------- user profile -----*/
  const getProfile = () => {
    actions.profileAction(userUuid, 1);
  };

  /*------- load more data -----*/
  const onEndReached = () => {};

  /*------- load more data -----*/
  const onLoadMore = (page: number) => {};

  /*------- did mount -----*/
  useEffect(() => {
    if (updatUserInfoError?.callFrom === 1) {
      handleError(updatUserInfoError,actions);
      setIsUpdate(false);
    }
    if (updatUserInfoSuccess?.callFrom === 1) {
      showMessage({message: messageFormat(updatUserInfoSuccess)});
      setIsUpdate(false);
      getProfile();
    }

    if (selectedListSuccess) {
      getParams();
    }
  }, [updatUserInfoError, updatUserInfoSuccess, selectedListSuccess]);

  /*------- set value -----*/
  const SetSubjectValue = (listArray: any, isSubject: boolean) => {
    let arr = state.inputs;
    if (isSubject) {
      arr[8].list = listArray;
    } else {
      arr[7].list = listArray;
    }
    setState({
      ...state,
      inputs: arr,
    });
  };

  /*------- params -----*/
  const getParams = () => {
    // let _props = props;
    // let {selectedListSuccess} = _props;
    if (selectedListSuccess.isSubject && selectedListSuccess.selectedSubjects) {
      SetSubjectValue(
        selectedListSuccess.selectedSubjects,
        selectedListSuccess.isSubject,
      );
    } else if (selectedListSuccess.selectedLevels) {
      SetSubjectValue(
        selectedListSuccess.selectedLevels,
        selectedListSuccess.isSubject,
      );
    }
  };

  /*------- did mount -----*/
  useEffect(() => {
    let {levelUuidArray, subjectUuidArray} = userDetails(userInfoSuccess);
    if (levelUuidArray.length > 0 && levelsListSuccess) {
      let levelArr = subjectLevelMap(levelUuidArray, levelsListSuccess);
      SetSubjectValue(levelArr, false);
    }

    if (subjectUuidArray.length > 0 && subjectsListSuccess) {
      let subjectArr = subjectLevelMap(subjectUuidArray, subjectsListSuccess);
      SetSubjectValue(subjectArr, true);
    }
  }, [userInfoSuccess]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('profile')}
        componentId={componentId}
        isProfile={true}
        isTextAreaHeader={isTextAreaOpen}
        onBackPress={
          isTextAreaOpen
            ? () => {
                setState({
                  ...state,
                  desc: '',
                  isTextAreaOpen: false,
                });
              }
            : false
        }
        onDrawerOpen={() => {
          isTextAreaOpen
            ? onHandleChange(desc, 6)
            : changeSideMenuVisibility(componentId, true);
        }}
      />

      {/*------- form -----*/}
      <KeyboardAwareScrollView
        bounces={false}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
          {/*------- profile image -----*/}
          {!isTextAreaOpen && (
            <CircleProfileImage
              isDarkMode={isDarkMode}
              url={
                state.profilePhotoUrl
                  ? state.profilePhotoUrl.path
                  : profileImageUrl
                  ? imageURL(userUuid, profileImageUrl)
                  : ''
              }
              onPress={() => {
                setState({
                  ...state,
                  isImageSelectOption: true,
                });
              }}
            />
          )}

          {isTextAreaOpen ? (
            <InputField
              isDarkMode={isDarkMode}
              placeholder={i18n.t('enter_here')}
              label={i18n.t('description')}
              value={desc}
              isMultiline={true}
              inceaseSize={ScreenHeight / 2}
              onChangeText={(desc: string) => {
                setState({
                  ...state,
                  desc,
                });
              }}
            />
          ) : (
            <View style={styles.formStyle}>
              {/*------- form -----*/}
              {state.inputs.map((field, index: number) => {
                return (
                  <Fragment key={field.uuid}>
                    {field.title && (
                      <View
                        style={[globalStyle.rowSpaceBetween, styles.headView]}>
                        <View>
                          <Text
                            style={[
                              styles.headingText,
                              {color: Theme(isDarkMode).black00},
                              getFontStyle(i18n.locale).bold,
                            ]}>
                            {field.title}
                          </Text>
                        </View>

                        {/*------- arrow -----*/}
                        {field.isList && (
                          <Pressable
                            onPress={() => {
                              navigatorPush(
                                componentId,
                                ScreenName.SUBJECT_LEVEL_LIST,
                                {
                                  statusBarColor: Theme(isDarkMode).whiteF8,
                                  isSubject:
                                    field.uuid === 'subject' ? true : false,
                                  title: field.label,
                                  callFrom: 1,
                                  selectedItem: field.list,
                                },
                              );
                            }}>
                            <Icon
                              color={Theme(isDarkMode).primary}
                              name={
                                i18n.locale === 'ar'
                                  ? 'arrow-left'
                                  : 'arrow-right'
                              }
                              size={30}
                            />
                          </Pressable>
                        )}
                      </View>
                    )}

                    {field.isInput ? (
                      <InputField
                        placeholder={field.placeholder}
                        label={field.label}
                        isEditableFalse={field.isEditableFalse}
                        secureTextEntryTrue={field.secureTextEntryTrue}
                        isCountryPickerVisible={
                          state.isCountryPickerVisible === index ? true : false
                        }
                        value={field.value}
                        isDarkMode={isDarkMode}
                        callingCode={field.countryCode}
                        keyboardType={field.keyboardType}
                        isNotRTL={field.isNotRTL}
                        onPressCountryPicker={() => {
                          setState({
                            ...state,
                            isCountryPickerVisible: index,
                          });
                        }}
                        onChangeText={(value: string) => {
                          let array = state.inputs;
                          array[index].value = value;
                          setState({
                            ...state,
                            inputs: array,
                          });
                        }}
                        rightTitle={field.isPassword ? i18n.t('change') : ''}
                        onPressUpdate={
                          field.isPassword
                            ? () => {
                                navigatorPush(
                                  componentId,
                                  ScreenName.UPDATE_PASSWORD,
                                  {
                                    isDarkMode,
                                    userUuid,
                                  },
                                );
                              }
                            : false
                        }
                        onSelectCountryCode={onSelectCountry}
                        marginBottom={20}
                      />
                    ) : field.isList ? (
                      <Fragment>
                        {/*------- array -----*/}
                        {field.list?.length > 0 &&
                          field.list.map((item, index) => {
                            return (
                              <SelectedSubjectLevel
                                key={item.uuid}
                                isDarkMode={isDarkMode}
                                item={item}
                              />
                            );
                          })}
                      </Fragment>
                    ) : (
                      <InputButton
                        key={field.uuid}
                        value={field.value}
                        placeholder={field.placeholder}
                        label={field.label}
                        onChangeText={() => {
                          setState({
                            ...state,
                            desc: field.value,
                            isTextAreaOpen: true,
                          });
                        }}
                        inceaseSize={field.inceaseSize}
                        marginBottom={20}
                        isDarkMode={isDarkMode}
                      />
                    )}
                  </Fragment>
                );
              })}
            </View>
          )}
        </View>
        {/*------ confirm ------*/}
        <ConfirmBox
          isDarkMode={isDarkMode}
          onPress={(isCamera: boolean) => {
            setState({
              ...state,
              isImageSelectOption: false,
            });
            setTimeout(() => {
              OnSelectImage(isCamera);
            }, 1000);
          }}
          onCancel={() => {
            setState({
              ...state,
              isImageSelectOption: false,
            });
          }}
          heading={i18n.t('upload_image')}
          subtitle={i18n.t('upload_image_desc')}
          isVisible={state.isImageSelectOption}
        />

        {/*------- button -----*/}
        <View style={styles.buttonView}>
          <MainButton
            isDarkMode={isDarkMode}
            isLoading={isUpdate}
            titleColor={Theme(false).white}
            title={i18n.t('update')}
            onPress={() => {
              isTextAreaOpen ? onHandleChange(desc, 6) : updateRequest();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  userInfoSuccess: state.profileReducer.userInfoSuccess,
  updatUserInfoSuccess: state.profileReducer.updatUserInfoSuccess,
  updatUserInfoError: state.profileReducer.updatUserInfoError,
  selectedListSuccess: state.requestReducer.selectedListSuccess,

  subjectsListSuccess: state.requestReducer.subjectsListSuccess,
  levelsListSuccess: state.requestReducer.levelsListSuccess,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
