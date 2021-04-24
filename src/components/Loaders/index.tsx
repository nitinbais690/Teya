import React from 'react';
import {View} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';

/* ------------- library ------------- */
import LottieView from 'lottie-react-native';
import {getScaleSize} from 'utils/index';

/* ------------- interfaces ------------- */
import {LoaderProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const Loader = ({isButtonLoading, isNetwork, size, isEmpty, isAudio}: LoaderProps) => {
  return (
    <View style={globalStyle.centerContainer}>
      <LottieView
        style={
          isNetwork
            ? globalStyle.loaderStyle1
            : isButtonLoading
            ? globalStyle.loaderStyle1
            : {
                height: size ? getScaleSize(size) : getScaleSize(120),
                width: size ? getScaleSize(size) : getScaleSize(120),
              }
        }
        source={
          isAudio? require('../../assets/loaderjson/circle.json')
          :isNetwork
            ? require('../../assets/loaderjson/network.json')
            : isButtonLoading
            ? require('../../assets/loaderjson/dots.json')
            : isEmpty
            ? require('../../assets/loaderjson/no_data.json')
            : require('../../assets/loaderjson/springs.json')
        }
        autoPlay={true}
        loop={!isEmpty}
      />
    </View>
  );
};

/* ------------- make this component available to the app ------------- */
export default Loader;
