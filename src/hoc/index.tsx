import React, {createRef, PureComponent, Suspense} from 'react';
import {BackHandler, View, StyleSheet, StatusBar} from 'react-native';

/*------ container ------*/
import Network from 'containers/CheckOTAUpdate/Network';
import {Theme} from 'utils/index';

interface wrapperInnerProps {
  forwardedRef: any;
  isDarkMode: boolean;
}

/*------ redux ------*/
const withRedux = (store: any, Provider: any) => (
  WrappedComponent: any,
) => () => {
  class ReduxWrapper extends PureComponent<wrapperInnerProps> {
    constructor(props: wrapperInnerProps) {
      super(props);
    }

    render() {
      let {forwardedRef, isDarkMode} = this.props;
      return (
        <Suspense fallback={null}>
          <View style={{flex: 1}}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={Theme(isDarkMode).whiteF8}
            />
            <WrappedComponent ref={forwardedRef} {...this.props} />
            <Network />
          </View>
        </Suspense>
      );
    }
  }

  /*------ return ------*/
  return React.forwardRef((props, ref) => {
    return (
      <Provider store={store}>
        <ReduxWrapper {...props} forwardedRef={ref} />
      </Provider>
    );
  });
};

export default withRedux;
