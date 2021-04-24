import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

/*-------- Check online Device  ----------*/
import NetInfo from '@react-native-community/netinfo';
import OneSignal from 'react-native-onesignal';

/*-------- i18n ----------*/
import i18n from 'config/i18n';

/*-------- utils ----------*/
import {Theme, getScaleSize, ScreenWidth, ScreenHeight} from 'utils/index';
import Loader from 'components/Loaders';
import globalStyle from 'config/globalStyle';

/*-------- Check Connection ----------*/
export default class Network extends Component {
  state = {
    isConnected: true,
  };

  /*-------- mount ----------*/
  componentDidMount() {
    /*-------- Check device Connection Listener ----------*/
    NetInfo.addEventListener(state => {
      this.handleConnectivityChange(state.isConnected);
    });
  }

  /*-------- Check device Connection ----------*/
  handleConnectivityChange = (isConnected: boolean) => {
    if (isConnected) {
      this.setState({isConnected});
    } else {
      this.setState({isConnected});
    }
  };

  render() {
    let {isConnected} = this.state;
    if (!isConnected) {
      return (
        <View style={[styles.offlineContainer, globalStyle.centerContainer]}>
          <Loader isNetwork={true} />
        </View>
      );
    }
    return null;
  }
}

/*-------- Design Notification ----------*/
const styles = StyleSheet.create({
  offlineContainer: {
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    width: ScreenWidth,
    position: 'absolute',
    backgroundColor: Theme(false).whiteF8,
  },
  offlineText: {
    fontSize: getScaleSize(16),
  },
});
