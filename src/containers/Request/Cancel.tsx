import React, {useState, useEffect, Fragment} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/* ------------- library ------------- */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- components ------------- */
import Header from 'components/Bars';
import MainButton from 'components/Buttons';
import InputField from 'components/Inputs';
import {CheckBox} from 'components/Boxes';
import Loader from 'components/Loaders';
import ConfirmBox from 'components/Boxes';

/*-------- icon ----------*/
import IconAntDesign from 'react-native-vector-icons/AntDesign';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {
  navigatorPop,
  navigatorReset,
  showMessage,
} from 'config/navigation/navigatorOption';

/* ------------- interfaces ------------- */
import {CancelRequestProps} from 'interfaces/containers';

/*------ utils ------*/
import {CancelRequestOption} from 'utils/listArrays';
import {getScaleSize} from 'utils/index';
import {handleError} from 'utils/helperFun';
import {OrderStatus, ScreenName} from 'utils/contants';
import {getFontStyle, Theme} from 'utils/index';
import i18n from 'config/i18n';
import {SetupPayer} from 'containers/MainTab/Chat/Audio';

/*------ containers ------*/
const CancelRequest: React.FunctionComponent<CancelRequestProps> = (props) => {
  /*-------- props ----------*/
  let {
    isDarkMode,
    requestUuid,
    isAssigned,
    componentId,
    updatRequestInfoSuccess,
    updatRequestInfoError,
    cancelRequestReasonSuccess,
    cancelRequestReasonError,
    actions,
  } = props;

  /*-------- state ----------*/
  const [state, setState] = useState({
    desc: '',
    isTextAreaOpen: false,
    rating: 0,
    otherReason: '',
    isActive: 0,
    requestStatus: '',
    canceReasonArray: CancelRequestOption(),
  });
  const [isLoading, setIsLoading] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  let {otherReason, isActive, requestStatus, canceReasonArray} = state;

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*-------- cancelled ----------*/
  const requestToCancelled = () => {
    let formData = new FormData();
    formData.append(
      `status`,
      isAssigned ? OrderStatus.INVESTIGATING : OrderStatus.CANCELLED,
    );
    formData.append(
      `cancellation_reason`,
      canceReasonArray[isActive].en
        ? canceReasonArray[isActive].en
        : canceReasonArray[isActive].optionText,
    );
    otherReason && formData.append(`cancellation_details`, otherReason);

    actions.updateRequestAction(requestUuid, formData, 1);
    setIsLoading(2);
  };

  /*------- did mount -----*/
  useEffect(() => {
    actions.cancelReasonAction();
  }, []);

  /*-------- did update ----------*/
  useEffect(() => {
    /*-------- update ----------*/
    if (updatRequestInfoSuccess?.callFrom === 1) {
      let message = updatRequestInfoSuccess.data.message;
      message = i18n.locale === 'ar' ? message.ar : message.en;
      showMessage({message});
      SetupPayer('bid_bell.wav');
      setIsModalVisible(false);
      setTimeout(() => {
        navigatorReset(componentId, ScreenName.DASHBOARD, {
          statusBar: Theme(isDarkMode).whiteF8,
        });
      }, 2000);

      setIsLoading(0);
    }
    if (updatRequestInfoError?.callFrom === 1) {
      setIsLoading(0);
      handleError(updatRequestInfoError,actions);
    }

    /*-------- cancel ----------*/
    if (cancelRequestReasonSuccess) {
      if (cancelRequestReasonSuccess?.data?.data?.length > 0) {
        let array = cancelRequestReasonSuccess.data.data[0].values;
        array = JSON.parse(array);
        setState({
          ...state,
          canceReasonArray: array,
        });
      }

      setIsLoading(0);
    }
    if (cancelRequestReasonError) {
      setIsLoading(0);
      handleError(cancelRequestReasonError,actions);
    }
  }, [
    updatRequestInfoError,
    updatRequestInfoSuccess,
    cancelRequestReasonSuccess,
    cancelRequestReasonError,
  ]);

  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('cancel_request')}
        componentId={componentId}
        onBackPress={() => {
          navigatorPop(props);
        }}
      />
      {isLoading === 1 ? (
        <Loader />
      ) : (
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.cancelTop}>
            {/* ------------- circle ------------- */}
            <View
              style={[
                styles.imageView,
                {backgroundColor: Theme(isDarkMode).secondary},
              ]}>
              <IconAntDesign
                name={'close'}
                color={Theme(isDarkMode).white}
                size={getScaleSize(60)}
              />
            </View>

            <View style={styles.titleView}>
              <Text
                style={[
                  styles.cancelText,
                  {color: Theme(isDarkMode).black00},
                  getFontStyle(i18n.locale).bold,
                ]}>
                {i18n.t('cancel_request')}
              </Text>
            </View>

            {/* ------------- checkbox ------------- */}

            <View
              style={[
                styles.optionContainer,
                {backgroundColor: Theme(isDarkMode).white},
              ]}>
              {canceReasonArray.map((item, index) => {
                return (
                  <CheckBox
                    key={index}
                    item={item}
                    index={index}
                    isDarkMode={isDarkMode}
                    isActive={isActive}
                    onPress={() => {
                      setState({
                        ...state,
                        isActive: index,
                      });
                    }}
                  />
                );
              })}

              {/* ------------- textArea ------------- */}
              <View style={styles.textContainer}>
                <InputField
                  isDarkMode={isDarkMode}
                  label={i18n.t('description')}
                  placeholder={i18n.t('enter_here')}
                  value={otherReason}
                  isMultiline={true}
                  backgroundColor={Theme(isDarkMode).whiteF8}
                  onChangeText={(otherReason: string) => {
                    setState({
                      ...state,
                      otherReason,
                    });
                  }}
                />
              </View>
            </View>
          </View>
          {/* ------------- main button ------------- */}
          <View style={styles.buttonStyle}>
            <MainButton
              onPress={() => {
                setIsModalVisible(true);
              }}
              title={i18n.t('cancel_request')}
              isDarkMode={isDarkMode}
              backgroundColor={Theme(isDarkMode).secondary}
              titleColor={Theme(isDarkMode).white}
            />
          </View>
        </KeyboardAwareScrollView>
      )}

      {/*-------- delete address ----------*/}
      <ConfirmBox
        isVisible={isModalVisible}
        isDarkMode={isDarkMode}
        isShow={true}
        heading={i18n.t('cancel_request')}
        subtitle={i18n.t('cancel_request_message')}
        onPress={() => {
          requestToCancelled();
        }}
        isLoading={isLoading === 2 ? true : false}
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

  updatRequestInfoSuccess: state.requestReducer.updatRequestInfoSuccess,
  updatRequestInfoError: state.requestReducer.updatRequestInfoError,
  cancelRequestReasonSuccess: state.requestReducer.cancelRequestReasonSuccess,
  cancelRequestReasonError: state.requestReducer.cancelRequestReasonError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(CancelRequest);
