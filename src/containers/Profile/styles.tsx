import {StyleSheet} from 'react-native';

/*------ helper ------*/
import {getScaleSize} from 'utils/index';

/*------ define styles ------*/
export default StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    margin: getScaleSize(15),
    // marginTop: '10%',
  },
  formStyle: {
    marginTop: getScaleSize(20),
  },
  headView: {
    marginBottom: getScaleSize(20),
    marginTop: getScaleSize(10),
  },
  headingText: {
    fontSize: getScaleSize(18),
    textTransform: 'capitalize',
  },
  subtitleText: {
    fontSize: getScaleSize(11),
    textTransform: 'capitalize',
  },
  buttonView: {
    paddingHorizontal: getScaleSize(15),
  },
  detailsView: {
    marginVertical: getScaleSize(20),
    paddingHorizontal: getScaleSize(15),
  },
  subtitleView: {
    marginTop: getScaleSize(10),
  },
  textStyle: {
    fontSize: getScaleSize(15),
    textTransform: 'capitalize',
  },
  listView: {
    marginTop: getScaleSize(10),
  },
  subjectLevelStyle: {
    marginBottom: getScaleSize(10),
    marginVertical: getScaleSize(10),
  },

  topView: {
    marginTop: '10%',
  },

  mainView: {
    flex: 1,
    paddingHorizontal: getScaleSize(15),
    paddingTop: getScaleSize(15),
  },
  bottomView: {
    marginHorizontal: getScaleSize(15),
  },
});
