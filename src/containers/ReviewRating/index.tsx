import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- components ------------- */
import Header from 'components/Bars';
import MainButton from 'components/Buttons';
import InputField from 'components/Inputs';

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

/*------ utils ------*/
import {ScreenName} from 'utils/contants';

/*--------  library ----------*/
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AirbnbRating} from 'react-native-elements';

/*--------  interfaces ----------*/
import {ReviewRatingProps} from 'interfaces/containers';

/*--------- helper ------*/
import {getScaleSize, Theme} from 'utils/index';
import i18n from 'config/i18n';
import {handleError} from 'utils/helperFun';

/*------ containers ------*/
const ReviewRating: React.FunctionComponent<ReviewRatingProps> = (props) => {
  /*------ props ------*/
  let {
    isDarkMode,
    item,
    actions,
    isTutor,
    updatRequestInfoSuccess,
    updatRequestInfoError,
    componentId,
  } = props;

  /*------ state ------*/
  const [description, setDescription] = useState('');
  const [ratingCount, setRatingCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*-------- complete ----------*/
  const requestToComplete = () => {
    let formData = new FormData();
    if (ratingCount && description) {
      if (isTutor) {
        formData.append(`user_rating`, ratingCount);
        formData.append(`tutor_notes`, description);
      } else {
        formData.append(`tutor_rating`, ratingCount);
        formData.append(`user_notes`, description);
      }
      actions.updateRequestAction(item.uuid, formData, 3);
      setLoading(true);
    } else {
      let message = !ratingCount
        ? i18n.t('rating_required')
        : !description && i18n.t('description_required');

      showMessage({message, isError: true});
    }
  };

  /*-------- did update ----------*/
  useEffect(() => {
    /*-------- update ----------*/
    if (updatRequestInfoSuccess?.callFrom === 3) {
      let message = updatRequestInfoSuccess.data.message;
      message = i18n.locale === 'ar' ? message.ar : message.en;
      showMessage({message});

      setTimeout(() => {
        navigatorReset(componentId, ScreenName.DASHBOARD, {
          statusBar: Theme(isDarkMode).whiteF8,
        });
      }, 2000);

      setLoading(false);
    }
    if (updatRequestInfoError?.callFrom === 3) {
      setLoading(false);
      handleError(updatRequestInfoError,actions);
    }
  }, [updatRequestInfoError, updatRequestInfoSuccess]);

  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: Theme(props.isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('review_and_rating')}
        componentId={componentId}
        onBackPress={() => {
          navigatorPop(props);
        }}
      />

      {/*-------- review ----------*/}
      <KeyboardAwareScrollView
        bounces={false}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
          {/*-------- text ----------*/}
          <View style={styles.rateTextBox}>
            <Text style={[styles.rateText, {color: Theme(isDarkMode).gray99}]}>
              {i18n.t('rate_to_provider')}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              showRating={false}
              defaultRating={ratingCount}
              onFinishRating={(ratingCount: number) => {
                setRatingCount(ratingCount);
              }}
              starStyle={{padding: 0, margin: getScaleSize(5)}}
              size={getScaleSize(50)}
            />
          </View>

          {/*-------- text ----------*/}
          <View style={styles.rateTextBox}>
            <Text style={[styles.rateText, {color: Theme(isDarkMode).gray99}]}>
              {i18n.t('add_to_note')}
            </Text>
          </View>

          {/*-------- review ----------*/}
          <View
            style={[
              styles.textInputContainer,
              {backgroundColor: Theme(isDarkMode).white},
            ]}>
            <InputField
              label={i18n.t('write_your_experience')}
              placeholder={i18n.t('enter_here')}
              isMultiline={true}
              value={description}
              isDarkMode={isDarkMode}
              onChangeText={(description: string) => {
                setDescription(description);
              }}
            />
          </View>
        </View>

        {/* ------------- update ------------- */}
        <View style={styles.buttonStyle1}>
          <MainButton
            onPress={() => {
              requestToComplete();
            }}
            title={i18n.t('done')}
            isDarkMode={isDarkMode}
            isLoading={isLoading}
            backgroundColor={Theme(isDarkMode).primary}
            titleColor={Theme(false).white}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  updatRequestInfoSuccess: state.requestReducer.updatRequestInfoSuccess,
  updatRequestInfoError: state.requestReducer.updatRequestInfoError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(ReviewRating);
