import {StyleSheet} from 'react-native';

/* ------------- helper ------------- */
import {getScaleSize, ScreenWidth} from 'utils/index';

/* ------------- define your styles ------------- */
export default StyleSheet.create({
  iconStyle: {
    width: getScaleSize(20),
    height: getScaleSize(20),
    marginRight: getScaleSize(10),
  },
  selectedRow: {
    marginBottom: getScaleSize(10),
  },
  textStyle2: {
    fontSize: getScaleSize(13),
    textTransform: 'capitalize',
  },
  rowMainContainer: {
    width: '92%',
    paddingHorizontal: getScaleSize(20),
    paddingVertical: getScaleSize(20),
    borderRadius: getScaleSize(10),
    marginVertical: getScaleSize(10),
    alignSelf: 'center',
    elevation: getScaleSize(6),
    shadowOffset: {width: 0, height: getScaleSize(15)},
    shadowOpacity: 0.6,
    shadowRadius: getScaleSize(15),
    marginHorizontal: getScaleSize(15),
  },
  nameText: {
    fontSize: getScaleSize(16),
    textTransform: 'uppercase',
  },
  idText: {
    fontSize: getScaleSize(11),
    textTransform: 'capitalize',
  },
  priceText: {
    fontSize: getScaleSize(11),
    textTransform: 'uppercase',
  },
  detailsText: {
    fontSize: getScaleSize(14),
    textTransform: 'uppercase',
  },
  rowView: {
    flexDirection: 'row',
    paddingTop: getScaleSize(8),
    paddingBottom: getScaleSize(12),
  },
  statusText: {
    fontSize: getScaleSize(8),
    textTransform: 'uppercase',
  },
  viewStyle: {
    borderRadius: getScaleSize(25),
    paddingHorizontal: getScaleSize(10),
    paddingVertical: getScaleSize(2),
    marginLeft: getScaleSize(10),
  },
  rowContainer: {
    height: getScaleSize(50),
    borderRadius: getScaleSize(10),
    marginBottom: getScaleSize(20),
    padding: getScaleSize(10),
    paddingHorizontal: getScaleSize(15),
  },
  textStyle: {
    fontSize: getScaleSize(18),
    textTransform: 'capitalize',
  },

  /* ------------- offer ------------- */
  listContainer: {
    width: '98%',
    borderRadius: getScaleSize(10),
    shadowOpacity: 0.06,
    shadowOffset: {height: 0, width: 0},
    marginVertical: getScaleSize(10),
    marginHorizontal: getScaleSize(10),
    alignSelf: 'center',
  },
  rowListContainer: {
    width: '100%',
    borderRadius: getScaleSize(10),
  },
  offerStyle: {
    paddingHorizontal: getScaleSize(20),
    paddingVertical: getScaleSize(20),
    borderRadius: getScaleSize(10),
  },
  driverNameText: {
    fontSize: getScaleSize(14),
    textTransform: 'uppercase',
  },
  ratingBox: {
    flexDirection: 'row',
    marginTop: getScaleSize(5),
    alignItems: 'center',
  },
  ratingImage: {
    height: getScaleSize(16),
    width: getScaleSize(16),
  },
  ratingText: {
    fontSize: getScaleSize(17),
    marginLeft: getScaleSize(7),
  },
  amount: {
    fontSize: getScaleSize(18),
  },
  imageView: {
    height: getScaleSize(60),
    width: getScaleSize(60),
    borderRadius: getScaleSize(30),
    overflow: 'hidden',
  },
  middleViewOff: {
    marginLeft: getScaleSize(15),
    flex: 1,
  },

  /* ------------- review ------------- */
  middleView: {
    marginLeft: getScaleSize(15),
  },
  reviewContainer: {
    width: '100%',
    paddingHorizontal: getScaleSize(20),
    paddingVertical: getScaleSize(20),
    borderRadius: getScaleSize(10),
    marginVertical: getScaleSize(10),
    alignSelf: 'center',
    marginHorizontal: getScaleSize(15),
  },
  descText: {
    fontSize: getScaleSize(10),
    textTransform: 'capitalize',
  },
  descView: {
    width: '91%',
    flexWrap: 'nowrap',
    marginVertical: getScaleSize(5),
  },

  /* ------------- review ------------- */
  questionView: {
    marginBottom: getScaleSize(20),
  },
  subtitleView: {
    marginTop: getScaleSize(5),
  },
  subtitleText: {
    fontSize: getScaleSize(11),
    textTransform: 'capitalize',
  },

  /* ------------- notification ------------- */
  userImage: {
    width: getScaleSize(70),
    height: getScaleSize(70),
    borderRadius: getScaleSize(50),
    overflow: 'hidden',
  },
  containerStyle: {
    marginBottom: getScaleSize(10),
    paddingVertical: getScaleSize(15),
    flexDirection: 'row',
    borderRadius: getScaleSize(10),
  },
  dateText: {
    fontSize: getScaleSize(9),
  },
  notificationText: {
    fontSize: getScaleSize(12),
    lineHeight: getScaleSize(15),
    textAlign: 'justify',
  },
});
