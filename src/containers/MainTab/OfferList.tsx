import React, {useState, useEffect} from 'react';
import {Image, View, Text} from 'react-native';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- helper ------*/
import {getFontStyle, Theme} from 'utils/index';
import i18n from 'config/i18n';
import {ScreenName} from 'utils/contants';
import {handleError, messageFormat} from 'utils/helperFun';

/* ------------- components ------------- */
import Header from 'components/Bars';
import ListComponent from 'components/ListComponent';
import Loader from 'components/Loaders';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {
  changeSideMenuVisibility,
  navigatorPop,
  navigatorPopToRoot,
  navigatorPush,
  showMessage,
} from 'config/navigation/navigatorOption';

/*------ interfaces ------*/
import {OfferListProps} from 'interfaces/containers';
import { SetupPayer } from './Chat/Audio';

/*------ containers ------*/
const OfferList: React.FunctionComponent<OfferListProps> = (props) => {
  /*------- props -----*/
  let {
    componentId,
    isDarkMode,
    onPress,
    bidsListError,
    bidsListSuccess,
    updatBidInfoSuccess,
    updatBidInfoError,
    actions,
    requestUuid,
    activeCurrency,
  } = props;

  /*------- state -----*/
  const [isLoading, setIsLoading] = useState(1);
  const [state, setState] = useState({
    listArray: [],
    isDelete: -1,
  });
  let {listArray, isDelete} = state;

  /*------- bid list -----*/
  const bidLister = (requestUuid: string, page: number) => {
    actions.bidList(requestUuid, page);
  };

  /*------- update Bid -----*/
  const requestUpdateBid = (bidItem: string, index) => {
    let formData = new FormData();

    // formData.append(`post_uuid`, bidItem.post_uuid);
    formData.append(`rejected_at`, true);

    actions.updateBidAction(bidItem.uuid, formData, 2);
    setState({
      ...state,
      isDelete: index,
    });
  };

  /*-------  pagination -----*/
  const onEndReached = () => {};

  /*------- load more data -----*/
  const onLoadMore = (requestUuid: string, page: number) => {
    bidLister(requestUuid, page);
  };

  /*-------- did mount ----------*/
  useEffect(() => {
    bidLister(requestUuid, 1);
  }, []);

  /*-------- did update ----------*/
  useEffect(() => {
    /*-------- update ----------*/
    if (bidsListSuccess) {
      setState({
        ...state,
        listArray: bidsListSuccess,
      });
      setIsLoading(0);
    }
    if (bidsListError) {
      setIsLoading(0);
      handleError(bidsListError,actions);
    }

    /*------- update  bid -----*/
    if (updatBidInfoSuccess?.callFrom === 2) {
      showMessage({message: messageFormat(updatBidInfoSuccess)});
      listArray.splice(isDelete, 1);
      SetupPayer('bid_bell.wav');
      setState({
        ...state,
        isDelete: -1,
        listArray,
      });
    }
    if (updatBidInfoError?.callFrom === 2) {
      setState({
        ...state,
        isDelete: -1,
      });
      handleError(updatBidInfoError,actions);
    }
  }, [bidsListError, bidsListSuccess, updatBidInfoSuccess, updatBidInfoError]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('offers')}
        componentId={componentId}
        onBackPress={() => {
          props.fromCreate ? navigatorPopToRoot(props) : navigatorPop(props);
        }}
      />

      <View style={styles.mainContainer}>
        {/* ------------- text ------------- */}
        {listArray.length > 0 && (
          <View style={styles.topTextView}>
            <View>
              <Text
                style={[
                  styles.textStyle,
                  {color: Theme(isDarkMode).black00},
                  getFontStyle(i18n.locale).bold,
                ]}>
                {i18n.t('swipe')}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.subtitleTextStyle,
                  getFontStyle(i18n.locale).normal,
                  {color: Theme(isDarkMode).gray99},
                ]}>
                {i18n.t('swipe_subtitle')}
              </Text>
            </View>

            <View style={styles.imageGifView}>
              <Image 
                style={globalStyle.contain}
                source={{uri: 'http://ibm-design-language.eu-de.mybluemix.net/design/assets/language/images/framework/interaction/touch/interaction-touch_loop3.gif'}}/>
            </View>


          </View>
        )}

        {/* ------------- list ------------- */}
        {isLoading ? (
          <Loader />
        ) : (
          <ListComponent
            isDarkMode={isDarkMode}
            onRefresh={() => {
              bidLister(requestUuid, 1);
              setIsLoading(2);
            }}
            isRefreshing={isLoading === 2 ? true : false}
            isLoadMore={false}
            onPressRow={(item: any, index: number) => {
              navigatorPush(componentId, ScreenName.TUTOR_PROFILE, {
                isDarkMode,
                tutor: item,
              });
            }}
            onPressRight={(
              isAccept: boolean,
              offerItem: any,
              index: number,
            ) => {
              isAccept
                ? navigatorPush(componentId, ScreenName.PAYMENT_VIEW, {
                    offerItem,
                    isDarkMode,
                  })
                : requestUpdateBid(offerItem, index);
            }}
            isLoadingRow={isDelete}
            listDataArray={listArray}
            activeCurrency={activeCurrency}
            isOfferRow={true}
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

  bidsListSuccess: state.bidReducer.bidsListSuccess,
  bidsListError: state.bidReducer.bidsListError,

  updatBidInfoSuccess: state.bidReducer.updatBidInfoSuccess,
  updatBidInfoError: state.bidReducer.updatBidInfoError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(OfferList);
