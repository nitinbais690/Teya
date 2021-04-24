import React from 'react';
import {Text, View} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- library ------------- */
import {AirbnbRating} from 'react-native-elements';

/* ------------- utils ------------- */
import {Theme, getScaleSize, getFontStyle} from 'utils/index';
import i18n from 'config/i18n';

/* ------------- interfaces ------------- */
import {RatingProps} from 'interfaces/components';

/* ------------- create a component ------------- */
const RatingContainer = ({ratingCount, isDarkMode}: RatingProps) => {
  return (
    <View style={globalStyle.rowCenter}>
      {/* ------------- start ------------ */}
      <View style={styles.ratingView}>
        <AirbnbRating
          size={getScaleSize(15)}
          isDisabled={true}
          showRating={false}
          starStyle={styles.starStyle2}
          defaultRating={ratingCount}
        />
      </View>

      {/* ------------- count  ------------ */}
      <View style={styles.degiView}>
        <Text
          style={[
            styles.degiText,
            getFontStyle(i18n.locale).normal,
            {color: Theme(isDarkMode).grayB8},
          ]}>
          {ratingCount?.toString()}
        </Text>
      </View>
    </View>
  );
};

/* ------------- make this component available to the app ------------- */
export default RatingContainer;
