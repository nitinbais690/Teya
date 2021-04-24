import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import i18n from 'config/i18n';
import styles from './styles';

/* ------------- components ------------- */
import Header from 'components/Bars';
import ListComponent from 'components/ListComponent';
import Loader from 'components/Loaders';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {changeSideMenuVisibility} from 'config/navigation/navigatorOption';

/*------ interfaces ------*/
import {NotificationListProps} from 'interfaces/containers';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import {handleError} from 'utils/helperFun';
import {userDetails} from 'utils/controller';

/*------ containers ------*/
const Notification: React.FunctionComponent<NotificationListProps> = (
  props,
) => {
  /*------- props -----*/
  let {
    componentId,
    isDarkMode,
    notificationsError,
    notificationsListSuccess,
    userInfoSuccess,
    actions,
    activeCurrency,
  } = props;

  /*-------- locale variable ----------*/
  let {userUuid} = userDetails(userInfoSuccess);

  /*------- state -----*/
  const [isLoading, setIsLoading] = useState(1);
  const [state, setState] = useState({
    listArray: [],
  });
  let {listArray} = state;

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*------- bid list -----*/
  const notiicationsLister = (userUuid: string, page: number) => {
    actions.notificationAction(userUuid, page);
  };

  /*-------  pagination -----*/
  const onEndReached = () => {};

  /*------- load more data -----*/
  const onLoadMore = (userUuid: string, page: number) => {
    notiicationsLister(userUuid, page);
  };

  /*-------- did mount ----------*/
  useEffect(() => {
    notiicationsLister(userUuid, 1);
  }, []);

  /*-------- did update ----------*/
  useEffect(() => {
    /*-------- update ----------*/
    if (notificationsListSuccess) {
      if(notificationsListSuccess?.data?.data){
        setState({
          ...state,
          listArray: notificationsListSuccess.data.data,
        });
      }
      setIsLoading(0);
    }
    if (notificationsError) {
      setIsLoading(0);
      handleError(notificationsError,actions);
    }
  }, [notificationsError, notificationsListSuccess]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('notifications')}
        componentId={componentId}
        isNotification={true}
        onDrawerOpen={() => {
          changeSideMenuVisibility(componentId, true);
        }}
      />

      <View style={styles.mainContainer}>
        {/* ------------- list ------------- */}
        {isLoading ? (
          <Loader />
        ) : (
          <ListComponent
            isDarkMode={isDarkMode}
            onRefresh={() => {
              notiicationsLister(userUuid, 1);
              setIsLoading(2);
            }}
            isRefreshing={isLoading === 2 ? true : false}
            isLoadMore={false}
            onPressRow={(item: any, index: number) => {}}
            listDataArray={listArray}
            activeCurrency={activeCurrency}
            isNotification={true}
            onLoaderMore={() => {}}
          />
        )}
      </View>
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,

  activeCurrency: state.otherReducer.activeCurrency,
  userInfoSuccess: state.profileReducer.userInfoSuccess,
  notificationsListSuccess: state.profileReducer.notificationsListSuccess,
  notificationsError: state.profileReducer.notificationsError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
