import React from 'react';
import {Image, SafeAreaView, View, StyleSheet, Pressable} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- library ------*/
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

/* ------------- icon ------------- */
import {ScreenHeight, ScreenWidth, Theme, getScaleSize} from 'utils/index';

/* ------------- interfaces ------------- */
import {ZoomImageProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const ZoomImageView = ({
  url: img,
  isActive,
  onPress,
  isDarkMode,
}: ZoomImageProps) => {
  return (
    <Modal
      deviceHeight={ScreenHeight}
      deviceWidth={ScreenWidth}
      coverScreen={true}
      onBackButtonPress={onPress}
      isVisible={isActive}>
      <View style={[styles.modalStyle]}>
        <ImageViewer
          enableSwipeDown={true}
          index={0}
          backgroundColor={'transparent'}
          useNativeDriver={true}
          swipeDownThreshold={1}
          style={globalStyle.cover}
          enableImageZoom={true}
          imageUrls={[
            {
              url: img,
            },
          ]}
          onSwipeDown={onPress}
        />

        <Pressable style={[styles.deleteIcon]} onPress={onPress}>
          <SafeAreaView>
            <Icon
              name={'circle-with-cross'}
              size={getScaleSize(35)}
              color={Theme(isDarkMode).secondary}
            />
          </SafeAreaView>
        </Pressable>
      </View>
    </Modal>
  );
};

/* ------------- make this component available to the app ------------- */
export default ZoomImageView;
