import React, {Fragment, useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, Text, View, Alert} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- helper ------*/
import {getFontStyle, getScaleSize, Theme} from 'utils/index';
import i18n from 'config/i18n';
import {userDetails} from 'utils/controller';
import {
  handleError,
  imageURL,
  messageFormat,
  selectImageOption,
} from 'utils/helperFun';

/* ------------- components ------------- */
import {CircleProfileImage} from 'components/Boxes';
import TopTabBar from 'components/Bars/TopTab';
import Header from 'components/Bars';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {navigatorPop, showMessage} from 'config/navigation/navigatorOption';

/*------ interfaces ------*/
import {TutorProfileProps} from 'interfaces/containers';
import {handlers} from 'react-native-localize/dist/typescript/module';
import Loader from 'components/Loaders';

/*------ containers ------*/
const TutorProfile: React.FunctionComponent<TutorProfileProps> = props => {
  /*------- props -----*/
  let {
    isDarkMode,
    componentId,
    tutor,
    actions,
    tutorInfoSuccess,
    tutorInfoError,
  } = props;

  /*------- local -----*/
  let {
    fullName,
    username,
    bio,
    rating,
    profileImageUrl,
    tutorUuid,
  } = userDetails({
    data: {data: [tutor]},
  });

  /*------- state -----*/
  const [isActiveTab, setIsActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [state, setState] = useState({
    reviewsList: [],
  });

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*------- load more data -----*/
  const onEndReached = () => {};

  /*------- load more data -----*/
  const onLoadMore = (page: number) => {
    actions.tutorReviews(tutorUuid, page);
  };

  /*------- did update -----*/
  useEffect(() => {
    if (tutorInfoError) {
      handleError(tutorInfoError, actions);
      setIsLoading(0);
    }
    if (tutorInfoSuccess) {
      if (tutorInfoSuccess?.data?.data) {
        setState({
          reviewsList: tutorInfoSuccess.data.data,
        });
      }
      setIsLoading(0);
    }
  }, [tutorInfoError, tutorInfoSuccess]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(props.isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('profile')}
        onBackPress={() => {
          navigatorPop(props);
        }}
        componentId={componentId}
      />
      {/* -------------  scrollview ------------- */}
      <ScrollView
        style={globalStyle.container}
        bounces={false}
        contentContainerStyle={globalStyle.container}>
        {/* -------------  circle image ------------- */}
        <View style={styles.topView}>
          <CircleProfileImage
            name={fullName ? fullName : username}
            degination={''}
            url={profileImageUrl ? imageURL(tutorUuid, profileImageUrl) : ''}
            ratingCount={rating}
            isDarkMode={isDarkMode}
          />
        </View>

        {/* -------------  tab ------------- */}
        <TopTabBar
          isActiveTopBar={isActiveTab}
          onTapChange={index => {
            if (index === 1) {
              onLoadMore(1);
              setIsLoading(1);
            }
            setIsActiveTab(index);
          }}
          tabCount={2}
          isDarkMode={isDarkMode}
        />

        {/* -------------  details ------------- */}
        <View style={styles.detailsView}>
          <View>
            <Text
              style={[
                styles.headingText,
                getFontStyle(i18n.locale).bold,
                {color: Theme(isDarkMode).black00},
              ]}>
              {isActiveTab ? i18n.t('reviews') : i18n.t('about_me')}
            </Text>
          </View>

          {isActiveTab ? (
            <View style={styles.listView}>
              {isLoading ? (
                <Loader />
              ) : state.reviewsList.length > 0 ? (
                state.reviewsList.map((review, index) => {
                  return (
                    <ReviewRow
                      item={review}
                      key={review.uuid}
                      isDarkMode={isDarkMode}
                    />
                  );
                })
              ) : (
                <View
                  style={{alignSelf: 'center', marginTop: getScaleSize(30)}}>
                  <Text
                    style={[
                      styles.textStyle,
                      getFontStyle(i18n.locale).semibold,
                      {color: Theme(isDarkMode).primary},
                    ]}>
                    {/* {i18n.t('load_more')} */}
                    {'No reviews found'}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <Fragment>
              {/* -------------  details ------------- */}
              <View style={[globalStyle.row, styles.subtitleView]}>
                <Text
                  style={[
                    styles.subtitleText,
                    getFontStyle(i18n.locale).normal,
                    {color: Theme(isDarkMode).black35},
                  ]}>
                  {bio ? bio : ''}
                </Text>
              </View>

              {/* -------------  array list ------------- */}
            </Fragment>
          )}
        </View>
      </ScrollView>
      <SafeAreaView />
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,

  tutorInfoSuccess: state.profileReducer.tutorInfoSuccess,
  tutorInfoError: state.profileReducer.tutorInfoError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(TutorProfile);
