import React from 'react';
import {FlatList, RefreshControl, Text, View, Image, Alert} from 'react-native';

/*-------- config ----------*/
import globalStyle from 'config/globalStyle';
import i18n from 'config/i18n';

/*-------- components ----------*/
import DeliveryRow, {
  SubjectLevelRow,
  OfferRow,
  NotificationRow,
} from '../Rows/index';
import Loader from '../Loaders';

/*-------- utils ----------*/
import {getFontStyle, Theme} from 'utils/index';

/* ------------- interfaces ------------- */
import {ListComponentProps} from 'interfaces/components';

/*--------  create a component ----------*/
export const EmptyList = () => {
  return (
    <View style={globalStyle.notFoundstyle}>
      <Loader isEmpty={true} />

      {/*--------  create a component ----------*/}
      <View>
        <Text
          style={[
            globalStyle.textStyle,
            {color: Theme(false).grayB8},
            getFontStyle(i18n.locale).semibold,
          ]}>
          {i18n.t('no_data_found')}
        </Text>
      </View>
    </View>
  );
};

/*--------  create a component ----------*/
const ListComponent = ({
  onPressRow,
  onPressRight,
  listDataArray,
  isRefreshing,
  onRefresh,
  isOfferRow,
  isLoadMore,
  isSelectedIndex,
  isDarkMode,
  onLoaderMore,
  isSubjectLevel,
  isLoadingRow,
  activeCurrency,
  isNotification,
}: ListComponentProps) => {
  return (
    <FlatList
      data={listDataArray}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      style={globalStyle.contain}
      extraData={listDataArray}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        if (isSubjectLevel) {
          return (
            <SubjectLevelRow
              isDarkMode={isDarkMode}
              onPressRow={() => onPressRow(item, index)}
              item={item}
              index={index}
              isSelectedIndex={isSelectedIndex}
            />
          );
        } else if (isOfferRow) {
          return (
            <OfferRow
              isDarkMode={isDarkMode}
              isLoadingRow={isLoadingRow}
              onPressRow={() => onPressRow(item, index)}
              onPressRight={(isAccept: any, offerItem: any) => {
                onPressRight(isAccept, offerItem, index);
              }}
              activeCurrency={activeCurrency}
              item={item}
              index={index}
            />
          );
        } else if (isNotification) {
          return (
            <NotificationRow
              onPressRow={() => onPressRow(item, index)}
              item={item}
              isDarkMode={isDarkMode}
              activeCurrency={activeCurrency}
            />
          );
        } else {
          return (
            <DeliveryRow
              isDarkMode={isDarkMode}
              onPressRow={() => onPressRow(item, index)}
              item={item}
              activeCurrency={activeCurrency}
            />
          );
        }
      }}
      ListFooterComponent={() => {
        return isLoadMore ? <Loader /> : <View />;
      }}
      ListEmptyComponent={() => {
        return <EmptyList />;
      }}
      onEndReached={() => {
        !isLoadMore && onLoaderMore();
      }}
      onEndReachedThreshold={0.3}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

/*--------  make this component available to the app ----------*/
export default ListComponent;
