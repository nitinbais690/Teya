import React, {useState} from 'react';
import {Pressable, Text, View, Image, TouchableOpacity} from 'react-native';

/* ------------- style ------------- */
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- config ------------- */
import config from 'config/index';
import i18n from 'config/i18n';

/* ------------- component ------------- */
import {ActionButton} from 'components/Buttons';
import RatingContainer from 'components/Rating';
import Loader from 'components/Loaders';

/* ------------- library ------------- */
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Entypo from 'react-native-vector-icons/Entypo';

/* ------------- interfaces ------------- */
import {RowProps} from 'interfaces/components';

/* ------------- utils ------------- */
import {getFontStyle, getScaleSize, Theme} from 'utils/index';
import {CheckStatusBack} from 'utils/listArrays';
import {
  subjectLevelData,
  requestInfoFormat,
  userDetails,
} from 'utils/controller';
import {imageURL} from 'utils/helperFun';
import moment from 'moment';

/* ------------- create a component ------------- */
export const QuestionRow = ({item, isDarkMode}: RowProps) => {
  return (
    <View style={styles.questionView}>
      <View>
        <Text
          style={[
            styles.subtitleText,
            {color: Theme(isDarkMode).black00},
            getFontStyle(i18n.locale).bold,
          ]}>
          {item.title}
        </Text>
      </View>

      {/* ------------- subtitle ------------- */}
      <View style={styles.subtitleView}>
        <Text
          style={[
            styles.subtitleText,
            {color: Theme(isDarkMode).black00},
            getFontStyle(i18n.locale).normal,
          ]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

/* ------------- create a component ------------- */
export const ReviewRow = ({item, isDarkMode}: RowProps) => {
  return (
    <View
      style={[
        styles.reviewContainer,
        {backgroundColor: Theme(isDarkMode).white},
      ]}>
      <View style={globalStyle.rowSpaceBetweenNotCenter}>
        <View style={globalStyle.row}>
          {/*---------- image View -------------*/}
          <View style={styles.imageView}>
            <Image source={config.logoUrl} style={globalStyle.cover} />
          </View>

          {/*---------- name -------------*/}
          <View style={styles.middleView}>
            <Text
              style={[
                styles.detailsText,
                {color: Theme(isDarkMode).black00},
                getFontStyle(i18n.locale).semibold,
              ]}>
              {item.name}
            </Text>

            {/*---------- desc -------------*/}
            <View style={styles.descView}>
              <Text
                numberOfLines={2}
                style={[
                  styles.descText,
                  {color: Theme(isDarkMode).black66},
                  getFontStyle(i18n.locale).normal,
                ]}>
                {item.desc}
              </Text>
            </View>

            {/*---------- rating -------------*/}
            <RatingContainer
              isDarkMode={isDarkMode}
              ratingCount={item.ratings}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

/* ------------- create a component ------------- */
export const OfferRow = ({
  onPressRow,
  onPressRight,
  item,
  isDarkMode,
  index,
  isLoadingRow,
  activeCurrency,
}: RowProps) => {
  let {
    profileImageUrl,
    fullName,
    username,
    rating,
    amount,
    tutorUuid,
  } = userDetails({
    data: {data: [item]},
  });
  if (item && (item.cancelled_at || item.rejected_at)) {
    return null;
  }
  if (isLoadingRow === index) {
    return <Loader isButtonLoading={true} />;
  } else {
    let [color, setColor] = useState({
      activeColor: Theme(isDarkMode).white,
      colorIndex: index,
    });
    return (
      <View
        style={[
          styles.listContainer,
          {
            backgroundColor:
              color.colorIndex === index
                ? color.activeColor
                : Theme(isDarkMode).white,
          },
        ]}>
        <Swipeable
          leftThreshold={1}
          rightThreshold={1}
          onSwipeableRightWillOpen={() => {
            setColor({
              activeColor: Theme(isDarkMode).primary,
              colorIndex: index,
            });
          }}
          onSwipeableLeftWillOpen={() => {
            setColor({
              activeColor: Theme(isDarkMode).secondary,
              colorIndex: index,
            });
          }}
          onSwipeableLeftOpen={() => {
            onPressRight(false, item);
          }}
          onSwipeableRightOpen={() => {
            onPressRight(true, item);
          }}
          renderLeftActions={(p, d) =>
            ActionButton(p, d, onPressRight, 0, item)
          }
          renderRightActions={(p, d) =>
            ActionButton(p, d, onPressRight, 1, item)
          }>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressRow}
            style={[
              styles.rowListContainer,
              {
                backgroundColor:
                  color.colorIndex === index
                    ? color.activeColor
                    : Theme(isDarkMode).white,
              },
            ]}>
            <View
              style={[
                {backgroundColor: Theme(isDarkMode).white},
                styles.offerStyle,
              ]}>
              <View style={[globalStyle.rowSpaceBetween]}>
                <View style={[globalStyle.row, {width: '50%'}]}>
                  {/*---------- image View -------------*/}
                  <View style={styles.imageView}>
                    <Image
                      source={
                        profileImageUrl
                          ? {uri: imageURL(tutorUuid, profileImageUrl)}
                          : config.logoUrl
                      }
                      style={globalStyle.cover}
                    />
                  </View>

                  {/*---------- name -------------*/}
                  <View style={styles.middleView}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.driverNameText,
                        {color: Theme(isDarkMode).black00},
                        getFontStyle(i18n.locale).semibold,
                      ]}>
                      {fullName ? fullName : username}
                    </Text>

                    {/*---------- rating -------------*/}
                    <View style={styles.ratingBox}>
                      <Entypo
                        name={'star'}
                        size={getScaleSize(20)}
                        color={Theme(isDarkMode).yellow['EE']}
                      />

                      <Text
                        style={[
                          styles.ratingText,
                          {color: Theme(isDarkMode).gray['B8']},
                          getFontStyle(i18n.locale).bold,
                        ]}>
                        {rating}
                      </Text>
                    </View>
                  </View>
                </View>

                {/*---------- bid amount -------------*/}
                <View>
                  <Text
                    style={[
                      styles.amount,
                      {color: Theme(isDarkMode).secondary},
                      getFontStyle(i18n.locale).bold,
                    ]}>
                    {amount + ' ' + activeCurrency}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>
    );
  }
};

/* ------------- create a component ------------- */
const DelivaryRow = ({
  onPressRow,
  item,
  activeCurrency,
  isDarkMode,
}: RowProps) => {
  let {
    title,
    date,
    requestUuid,
    status,
    isApplied,
    bidAmount,
  } = requestInfoFormat(item);
  return (
    <Pressable
      onPress={onPressRow}
      style={[
        styles.rowMainContainer,
        {
          backgroundColor: Theme(isDarkMode).white,
          shadowColor: Theme(isDarkMode).grayD5,
        },
      ]}>
      <View>
        <View style={globalStyle.rowSpaceBetween}>
          <View style={globalStyle.row}>
            {/*---------- id -------------*/}
            <View>
              <Text
                style={[
                  styles.idText,
                  {color: Theme(isDarkMode).gray99},
                  getFontStyle(i18n.locale).normal,
                ]}>
                {requestUuid}
              </Text>
            </View>

            {/*---------- status -------------*/}
            <View
              style={[styles.viewStyle, CheckStatusBack(status, isDarkMode)]}>
              <Text
                style={[
                  styles.statusText,
                  {color: Theme(isDarkMode).white},
                  getFontStyle(i18n.locale).semibold,
                ]}>
                {status.toUpperCase()}
              </Text>
            </View>
          </View>

          {/*---------- date -------------*/}
          <View>
            <Text
              style={[
                styles.idText,
                {color: Theme(isDarkMode).gray99},
                getFontStyle(i18n.locale).normal,
              ]}>
              {date}
            </Text>
          </View>
        </View>

        {/*---------- name -------------*/}
        <View style={styles.rowView}>
          <Text
            numberOfLines={1}
            style={[
              styles.nameText,
              {color: Theme(isDarkMode).black00},
              getFontStyle(i18n.locale).bold,
            ]}>
            {title}
          </Text>
        </View>
      </View>

      {/*---------- price -------------*/}
      <View style={globalStyle.rowSpaceBetween}>
        <View>
          <Text
            style={[
              styles.priceText,
              {color: Theme(isDarkMode).primary},
              getFontStyle(i18n.locale).semibold,
            ]}>
            {isApplied
              ? bidAmount + ' ' + activeCurrency + ' ' + i18n.t('applied')
              : ''}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.priceText,
              {color: Theme(isDarkMode).primary},
              getFontStyle(i18n.locale).normal,
            ]}>
            {i18n.t('view_details')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

/* ------------- make this component available to the app ------------- */
export default DelivaryRow;

/* ------------- create a component ------------- */
export const SubjectLevelRow = ({
  onPressRow,
  item,
  isSelectedIndex,
  isDarkMode,
  index,
}: RowProps) => {
  let {title, titleAr} = subjectLevelData(item);

  /* ------------- active ------------- */
  let isActive: boolean = item.isActive
    ? true
    : isSelectedIndex === index
    ? true
    : false;
  return (
    <Pressable
      onPress={onPressRow}
      style={[
        globalStyle.rowCenter,
        styles.rowContainer,
        {
          backgroundColor: isActive
            ? Theme(isDarkMode).primary
            : Theme(isDarkMode).gray['F1'],
        },
      ]}>
      <View>
        <Text
          style={[
            styles.textStyle,
            {
              color: isActive
                ? Theme(isDarkMode).white
                : Theme(isDarkMode).gray['E8'],
            },
            getFontStyle(i18n.locale).semibold,
          ]}>
          {i18n.locale === 'ar' ? titleAr : title}
        </Text>
      </View>
    </Pressable>
  );
};

/* ------------- create a component ------------- */
export const SelectedSubjectLevel = ({item, isDarkMode}: RowProps) => {
  let {title, titleAr} = subjectLevelData(item);

  /* ------------- active ------------- */
  let isActive = true;

  return (
    <Pressable style={[globalStyle.rowCenter, styles.selectedRow]}>
      <View style={styles.iconStyle}>
        <Image
          source={
            i18n.locale === 'ar'
              ? require('../../assets/icons/tickRtl.svg')
              : require('../../assets/icons/tick.svg')
          }
          style={globalStyle.contain}
        />
      </View>

      <View>
        <Text
          style={[
            styles.textStyle2,
            {
              color: isActive
                ? Theme(isDarkMode).black66
                : Theme(isDarkMode).gray['E8'],
            },
            getFontStyle(i18n.locale).semibold,
          ]}>
          {i18n.locale === 'ar' ? titleAr : title}
        </Text>
      </View>
    </Pressable>
  );
};

/* ------------- create a component ------------- */
export const NotificationRow = ({item, isDarkMode}: RowProps) => {
  let message = '';
  let date = '';
  if (item.content) {
    let messageObj = JSON.parse(item.content);
    let message_ar;
    let message_en;
    message_ar = messageObj.ar ? messageObj.ar : '';
    message_en = messageObj.en ? messageObj.en : '';
    message = i18n.locale === 'ar' ? message_ar : message_en;
    date = item.created_at ? moment(item.created_at).format('DD-MM-YYYY') : '';
  }

  return (
    <Pressable
      key={item.uuid}
      style={[
        globalStyle.rowCenter,
        styles.containerStyle,
        {backgroundColor: Theme(isDarkMode).white},
      ]}>
      {/*--------  icon ----------*/}
      {/* <View style={styles.userImage}>
        <Image
          style={globalStyle.cover}
          source={item.imageUrl ? {uri: item.imageUrl} : config.logoUrl}
        />
      </View> */}

      {/*--------  notification ----------*/}
      <View style={styles.middleViewOff}>
        {/*--------  notification ----------*/}
        <View style={styles.descView}>
          <Text
            style={[
              styles.notificationText,
              getFontStyle(i18n.locale).normal,
              {color: Theme(isDarkMode).grayB8},
            ]}>
            {message}
          </Text>
        </View>

        {/*--------  date ----------*/}
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.dateText,
              getFontStyle(i18n.locale).normal,
              {color: Theme(isDarkMode).black35},
            ]}>
            {date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
