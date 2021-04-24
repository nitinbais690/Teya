import React from 'react';
import {View, Text, Image} from 'react-native';

/* ------------- helper ------------- */
import styles from './styles';
import globalStyle from 'config/globalStyle';

/* ------------- interfaces ------------- */
import {SlidesProps} from 'interfaces/components';

/* ------------- utils ------------- */
import {getFontStyle} from 'utils/index';
import i18n from 'config/i18n';
import {Theme} from 'utils/index';

/* ------------- create a component ------------- */
const AppIntroSlide = ({
  slide: {imageUrl, title, subtitle},
  theme,
}: SlidesProps) => {
  return (
    <View style={styles.containerView}>
      {/* ------------- image ------------- */}
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={globalStyle.contain} />
      </View>

      {/* ------------- title ------------- */}
      <View style={styles.titleView}>
        <Text
          style={[
            styles.infoTitle,
            {color: Theme(theme).black00},
            getFontStyle(i18n.locale).bold,
          ]}>
          {title}
        </Text>
      </View>

      {/* ------------- desciption ------------- */}
      <View style={styles.descView}>
        <Text
          style={[
            styles.infoDescription,
            {color: Theme(theme).gray99},
            getFontStyle(i18n.locale).bold,
          ]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

/* ------------- make this component available to the app ------------- */
export default AppIntroSlide;
