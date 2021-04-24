import React, {useState, useEffect} from 'react';
import {Pressable, SafeAreaView, Image, View} from 'react-native';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*--------- library ------*/
import {WebView} from 'react-native-webview';
import {getDeviceId} from 'react-native-device-info';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';

/* ------------- components ------------- */
import Header from 'components/Bars';
import ConfirmBox from 'components/Boxes';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {navigatorPop, navigatorReset} from 'config/navigation/navigatorOption';
import {ScreenName} from 'utils/contants';

/* ------------- interfaces ------------- */
import {PaymentProps} from 'interfaces/containers';

/* ------------- config ------------- */
import config from 'config/index';
import {userDetails} from 'utils/controller';

/*------ containers ------*/
const Payment: React.FunctionComponent<PaymentProps> = (props) => {
  let {isDarkMode, offerItem, componentId} = props;

  let {userUuid} = userDetails({
    data: {data: [offerItem]},
  });

  const [state, setState] = useState({
    isModalVisible: false,
    deviceUuid: '',
  });
  let {isModalVisible} = state;

  const handleModal = () => {
    setState({
      ...state,
      isModalVisible: true,
    });
  };

  /*-------- backpress ----------*/
  useBackButton(handleModal, props);

  /*--------  handle navigation ----------*/
  const handleNavigation = () => {
    let {componentId, isDarkMode} = props;

    navigatorReset(componentId, ScreenName.DASHBOARD, {
      isDarkMode,
    });
  };

  /*------- load more data -----*/
  const onEndReached = () => {};

  /*------- load more data -----*/
  const onLoadMore = (page: number) => {};

  /*------- props -----*/

  /*--------  webview ----------*/
  let webview: any = null;

  /*--------  handle navigation ----------*/
  const handleWebViewNavigationStateChange = (newNavState: any) => {
    const {url} = newNavState;
    if (!url) return;
    console.log('web url ' + JSON.stringify(url));
    if (url.includes('payment/success')) {
      setTimeout(() => {
        handleNavigation();
      }, 3000);
    }
  };

  /*--------  cancel payment ----------*/
  const showAlert = () => {
    setState({
      ...state,
      isModalVisible: true,
    });
  };

  let deviceId = getDeviceId();
  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(props.isDarkMode).whiteF8},
      ]}>
      <SafeAreaView
        style={[
          globalStyle.container,
          {backgroundColor: Theme(isDarkMode).whiteF8},
        ]}>
        {/*--------  header ----------*/}
        <Header
          title={i18n.t('payment')}
          componentId={''}
          onBackPress={() =>
            setState({
              ...state,
              isModalVisible: true,
            })
          }
        />

        {/*-------- web ----------*/}
        <View style={globalStyle.container}>
          {offerItem?.uuid && (
            <WebView
              style={[
                globalStyle.container,
                {backgroundColor: Theme(isDarkMode).whiteF8},
              ]}
              ref={(ref: any) => (webview = ref)}
              source={{
                uri: `${config.paymentUrl}${userUuid}/bids/${offerItem.uuid}/${offerItem.amount}/${deviceId}/${config.paymentApiKey}`,
              }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
            />
          )}
        </View>

        {/*-------- delete address ----------*/}
        <ConfirmBox
          isVisible={isModalVisible}
          isDarkMode={isDarkMode}
          isShow={true}
          heading={i18n.t('cancel_Payment')}
          subtitle={i18n.t('cancel_payment_message')}
          onPress={() => {
            setState({
              ...state,
              isModalVisible: false,
            });
            setTimeout(() => {
              handleNavigation();
            }, 1000);
          }}
          onCancel={() => {
            setState({
              ...state,
              isModalVisible: false,
            });
          }}
        />
      </SafeAreaView>
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
