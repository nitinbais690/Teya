import React, {Fragment, useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- components ------------- */
import Header from 'components/Bars';
import InputField from 'components/Inputs';
import MainButton from 'components/Buttons';

/* ------------- library ------------- */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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

/*------ interfaces ------*/
import {UpdatePasswordProps} from 'interfaces/containers';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';
import {handleError, passwordValidation} from 'utils/helperFun';
import {PasswordInputFields} from 'utils/listArrays';
import {ScreenName} from 'utils/contants';

/*------ containers ------*/
const UpdatePassword: React.FunctionComponent<UpdatePasswordProps> = (
  props,
) => {
  /*------- props -----*/
  let {
    isDarkMode,
    actions,
    updatUserInfoSuccess,
    updatUserInfoError,
    userUuid,
    componentId,
  } = props;
  /*-------- locale variable ----------*/

  /*-------- stat
  /*------- state -----*/
  const [state, setState] = useState({
    passwordInputFields: PasswordInputFields(),
    isLoading: false,
  });
  let {passwordInputFields, isLoading} = state;

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*------- update password -----*/
  const onUpdateRequest = async () => {
    let currentPass = await passwordValidation(passwordInputFields[0].value);
    if (currentPass.isSuccess) {
      let newPass = await passwordValidation(
        passwordInputFields[1].value,
        i18n.t('new_pasword_required'),
      );
      if (newPass.isSuccess) {
        let formData = new FormData();
        formData.append(`current_password`, passwordInputFields[0].value);
        formData.append(`password`, passwordInputFields[1].value);
        actions.updateProfileAction(userUuid, formData, 2);
      } else {
        showMessage({message: newPass.message, isError: true});
      }
    } else {
      showMessage({message: currentPass.message, isError: true});
    }
  };

  /*------- load more data -----*/
  const onLoadMore = (page: number) => {};

  /*-------- update value ----------*/
  const getValue = async () => {
    passwordInputFields.map((item, index) => {
      passwordInputFields[index].value = '';
    });
    setState({
      ...state,
      passwordInputFields,
    });
  };

  /*-------- update value ----------*/
  const onChangeText = (text: string, index: number) => {
    passwordInputFields[index].value = text;
    setState({
      ...state,
      passwordInputFields,
    });
  };

  /*------- did mount -----*/
  useEffect(() => {
    getValue();

    /*-------- add listner back Press ----------*/
    // addListener({
    //   callback: handleBackPress,
    // });
    // return () => {
    //   removeListener();
    // };
  }, []);

  /*------- did mount -----*/
  useEffect(() => {
    if (updatUserInfoError?.callFrom === 2) {
      handleError(updatUserInfoError,actions);
      setState({...state, isLoading: false});
    }
    if (updatUserInfoSuccess?.callFrom === 2) {
      showMessage({message: i18n.t('password_update_success')});
      setState({...state, isLoading: false});
      setTimeout(() => {
        navigatorReset(componentId, ScreenName.DASHBOARD, {
          statusBar: Theme(isDarkMode).whiteF8,
        });
      }, 2000);
    }
  }, [updatUserInfoError, updatUserInfoSuccess]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(props.isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('change_password')}
        componentId={componentId}
        onBackPress={() => {
          navigatorPop(props);
        }}
      />
      <KeyboardAwareScrollView
        bounces={false}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainView}>
          {/*--------  input fields ----------*/}
          {passwordInputFields.map((field: any, index: number) => {
            return (
              <InputField
                key={field.uuid}
                isDarkMode={isDarkMode}
                placeholder={field.placeholder}
                label={field.label}
                secureTextEntryTrue={true}
                value={field.value}
                isNotRTL={true}
                onChangeText={(val: string) => {
                  onChangeText(val, index);
                }}
                marginBottom={20}
              />
            );
          })}
        </View>

        {/*--------  button ----------*/}
        <View style={styles.bottomView}>
          <MainButton
            onPress={() => onUpdateRequest()}
            title={i18n.t('save')}
            isLoading={isLoading}
            isDarkMode={isDarkMode}
            titleColor={Theme(false).white}
          />
        </View>
      </KeyboardAwareScrollView>
      <SafeAreaView />
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  updatUserInfoSuccess: state.profileReducer.updatUserInfoSuccess,
  updatUserInfoError: state.profileReducer.updatUserInfoError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
