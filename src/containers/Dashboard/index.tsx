import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Image, View, Alert} from 'react-native';

/*--------- custom hoooks ------*/
import {useBackButton, useExitApp} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';
import {requestInfoFormat, userDetails} from 'utils/controller';
import {handleError} from 'utils/helperFun';

/* ------------- components ------------- */
import TopTabBar from 'components/Bars/TopTab';
import ListComponent from 'components/ListComponent';
import {SearchBar} from 'components/Inputs';
import Loader from 'components/Loaders';
import Header from 'components/Bars';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {
  changeSideMenuVisibility,
  navigatorPush,
} from 'config/navigation/navigatorOption';
import {OrderStatus, ScreenName} from 'utils/contants';
import OneSignal from 'react-native-onesignal';

/*------ interface ------*/
import {DashboardProps} from 'interfaces/containers';
import axios from 'axios';

/*------ containers ------*/
const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  /*------- props -----*/
  let {
    loginSuccess,
    userInfoSuccess,
    requestsListSuccess,
    requestsListError,
    userInfoError,
    actions,
    isDarkMode,
    componentId,
    activeCurrency,
  } = props;

  /*------- state -----*/
  const [isActiveTab, setIsActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadmore, setIsLoadmore] = useState(false);
  const [isLoading, setIsLoading] = useState(1);
  const [state, setState] = useState({
    currentPage: 1,
    lastPage: 0,
    listArray: [],
  });

  /*-------- backpress ----------*/
  useBackButton(useExitApp, props);

  /*-------- locale variable ----------*/
  let {isTutor} = userDetails(userInfoSuccess);

  /*------- load more data -----*/
  const onEndReached = () => {};

  /*------- user profile -----*/
  const getProfile = (userUuid: string) => {
    actions.profileAction(userUuid);
  };

  /*------- requestSubject -----*/
  const requestSubject = () => {
    actions.subjectListAction();
  };

  /*------- requestlevel -----*/
  const requestLevel = () => {
    actions.levelListAction();
  };

  /*------- post list -----*/
  const getRequestList = (
    isActiveTab: number,
    page: number,
    searchTerm: string,
  ) => {
    actions.requestList(!isTutor, isActiveTab, page, searchTerm);
  };

  /*-------handlePress -----*/
  const handlePress = (item: any) => {
    if (isActiveTab === 1) {
      let {userRating, tutorRating} = requestInfoFormat(item);
      if ((isTutor && userRating) || (tutorRating && !isTutor)) {
        navigatorPush(componentId, ScreenName.REQUEST, {
          isDarkMode,
          requestUuid: item.uuid,
          isHistory: true,
        });
      } else {
        navigatorPush(componentId, ScreenName.REVIEW_RATING, {
          isDarkMode,
          item,
          isTutor,
        });
      }
    } else {
      navigatorPush(componentId, ScreenName.MAIN_TAB, {
        requestUuid: item.uuid,
        isDarkMode,
        isAssigned: item.status === OrderStatus.ASSIGNED ? true : false,
      });
    }
  };

  /*-------  notification handler -----*/
  useEffect(() => {
    OneSignal.setNotificationOpenedHandler(notification => {
      let p = props;
      let notifyData = notification.notification.additionalData;
      if (notifyData.module === 'bids') {
        navigatorPush(p.componentId, ScreenName.MAIN_TAB, {
          isDarkMode: p.isDarkMode,
          requestUuid: notifyData.post_uuid,
        });
      } else if (notifyData.module === 'chat') {
        navigatorPush(p.componentId, ScreenName.MAIN_TAB, {
          isDarkMode: p.isDarkMode,
          requestUuid: notifyData.post_uuid,
          chatUuid: notifyData.chat_uuid,
          isActiveBottomTab: 2,
          isAssigned: true,
        });
      } else if (notifyData.module === 'attachment') {
        navigatorPush(p.componentId, ScreenName.MAIN_TAB, {
          isDarkMode: p.isDarkMode,
          requestUuid: notifyData.post_uuid,
          isActiveBottomTab: 1,
        });
      } else if (notifyData.module === 'post') {
        navigatorPush(p.componentId, ScreenName.MAIN_TAB, {
          isDarkMode: p.isDarkMode,
          requestUuid: notifyData.post_uuid,
        });
      } else {
        navigatorPush(p.componentId, ScreenName.NOTIFICATION, {
          isDarkMode: p.isDarkMode,
        });
      }
    });
    return () => {};
  }, []);

  /*------- did mount -----*/
  useEffect(() => {
    if (userInfoSuccess && !userInfoSuccess.callFrom) {
      requestSubject();
      requestLevel();
      getRequestList(0, 1, '');
    }
    if (userInfoError) {
      setIsLoading(0);
      handleError(userInfoError,actions);
    }
    if (loginSuccess?.data?.user?.uuid && isLoading) {
      getProfile(loginSuccess.data.user.uuid);
    }
  }, [loginSuccess, userInfoSuccess, userInfoError]);

  /*------- did mount -----*/
  useEffect(() => {
    /*------- request list -----*/
    if (requestsListSuccess) {
      setIsLoading(0);
      setIsRefreshing(false);

      if (requestsListSuccess.current_page === 1) {
        setState({
          ...state,
          currentPage: requestsListSuccess.current_page,
          listArray: requestsListSuccess.data,
        });
      } else {
        let arr = requestsListSuccess.data;
        if (arr?.length > 0) {
          let data = state.listArray;
          arr.forEach((e: any) => {
            data.push(e);
          });
          setState({
            ...state,
            currentPage: requestsListSuccess.current_page,
            listArray: data,
          });
        } else {
          setState({
            ...state,
            lastPage: 1,
          });
        }
        setIsLoadmore(false);
      }
    }
    if (requestsListError) {
      setIsLoading(0);
      setIsRefreshing(false);
      handleError(requestsListError,actions);
    }
  }, [requestsListSuccess, requestsListError]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      {/*------ Header ------*/}
      <Header
        title={i18n.t('home')}
        componentId={componentId}
        onDrawerOpen={() => {
          changeSideMenuVisibility(componentId, true);
        }}
      />
      {isLoading === 1 ? (
        <Loader />
      ) : (
        <View style={globalStyle.container}>
          {/*------ tab ------*/}
          <TopTabBar
            isActiveTopBar={isActiveTab}
            onTapChange={tab => {
              setIsLoading(2);
              getRequestList(tab, 1, searchTerm);
              setIsActiveTab(tab);
            }}
            isDarkMode={isDarkMode}
            isUserTab={!isTutor}
          />

          {/*------ SearchBar ------*/}
          <View style={styles.searchContainer}>
            <SearchBar
              isDarkMode={isDarkMode}
              label={''}
              placeholder={i18n.t('search_here')}
              value={searchTerm}
              onResetInput={() => {
                setIsLoading(2);
                getRequestList(isActiveTab, state.currentPage, '');
                setSearchTerm('');
              }}
              onChangeText={(searchTerm: string) => {
                if (searchTerm.length > 5 && state.listArray.length === 0) {
                } else {
                  setIsLoading(2);
                  getRequestList(isActiveTab, state.currentPage, searchTerm);
                }
                setSearchTerm(searchTerm);
              }}
            />
          </View>

          {/*------ list ------*/}
          {isLoading === 2 ? (
            <Loader />
          ) : (
            <ListComponent
              isDarkMode={isDarkMode}
              activeCurrency={activeCurrency}
              onRefresh={() => {
                setIsLoading(2);
                setIsRefreshing(true);
                getRequestList(isActiveTab, 1, searchTerm);
              }}
              isRefreshing={isRefreshing}
              isLoadMore={isLoadmore}
              onPressRow={(item: any, index: number) => {
                handlePress(item);
              }}
              listDataArray={state.listArray}
              onLoaderMore={() => {
                if (!state.lastPage) {
                  setIsLoadmore(true);
                  getRequestList(isActiveTab, state.currentPage + 1, '');
                }
              }}
            />
          )}

          {/*------ create ------*/}
          {!isTutor && (
            <Pressable
              style={[
                styles.iconStyles,
                {backgroundColor: Theme(isDarkMode).secondary},
              ]}
              onPress={() => {
                actions.resetRequestAction();
                navigatorPush(componentId, ScreenName.REQUEST, {isDarkMode});
              }}>
              <Image
                style={globalStyle.contain}
                source={require('../../assets/icons/plus.svg')}
              />
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  activeCurrency: state.otherReducer.activeCurrency,
  loginSuccess: state.authReducer.loginSuccess,

  userInfoSuccess: state.profileReducer.userInfoSuccess,
  userInfoError: state.profileReducer.userInfoError,

  requestsListSuccess: state.requestReducer.requestsListSuccess,
  requestsListError: state.requestReducer.requestsListError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
