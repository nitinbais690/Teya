import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/* ------------- components ------------- */
import ListComponent from 'components/ListComponent';
import MainButton from 'components/Buttons';
import Loader from 'components/Loaders';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';
import Header from 'components/Bars';

/*------ navigation ------*/
import {navigatorPop} from 'config/navigation/navigatorOption';

/*------ interfaces ------*/
import {SubjectLevelProps} from 'interfaces/containers';

/*--------- helper ------*/
import {getFontStyle, Theme} from 'utils/index';
import i18n from 'config/i18n';
import {handleError} from 'utils/helperFun';
import {subjectLevelMap} from 'utils/controller';

/*------ containers ------*/
const SubjectLevel: React.FunctionComponent<SubjectLevelProps> = (props) => {
  /*------- props -----*/
  let {
    actions,
    subjectsListSuccess,
    subjectsListError,
    levelsListSuccess,
    levelsListError,
    isDarkMode,
    title,
    isSubject,
    callFrom,
    componentId,
    selectedItem,
    selectedListSuccess
  } = props;

  /*------- state -----*/
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadmore, setIsLoadmore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    listDataArray: [],
  });
  const [isSelectedIndex, setIsSelectedIndex] = useState(-1);

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*------- handlePress -----*/
  const handlePress = (index: number) => {
    let arr = state.listDataArray;
    arr[index] = {...arr[index], isActive: !arr[index].isActive};

    setState({
      ...state,
      listDataArray: arr,
    });
  };

  /*------- onDonePress -----*/
  const onDonePress = () => {
    let obj = selectedListSuccess;

    let selectedList = [];

    if (callFrom) {
      state.listDataArray.map((data) => {
        if (data.isActive) {
          selectedList.push(data);
        }
      });

      if (isSubject) {
        obj = {...obj, selectedSubjects: selectedList, isSubject};
      } else {
        obj = {...obj, selectedLevels: selectedList, isSubject};
      }
    } else {
      let selectedItem = state.listDataArray[isSelectedIndex];
      if (isSubject) {
        obj = {...obj, selectedSubject: selectedItem, isSubject};
      } else {
        obj = {...obj, selectedLevel: selectedItem, isSubject};
      }
    }

    actions.selectedList(obj);
    navigatorPop(props);
  };

  /*------- requestSubject -----*/
  const requestSubject = () => {
    actions.subjectListAction();
  };

  /*------- requestlevel -----*/
  const requestLevel = () => {
    actions.levelListAction();
  };

  /*------- did mount -----*/
  useEffect(() => {
    if (isSubject) {
      requestSubject();
    } else {
      requestLevel();
    }
  }, []);

  /*------- did update -----*/
  useEffect(() => {
    if (isSubject && subjectsListSuccess) {
      if (subjectsListSuccess.length > 0) {
        let subArr = subjectsListSuccess;
        if (selectedItem && selectedItem.length > 0) {
          subArr = subjectLevelMap(subjectsListSuccess, selectedItem, true);
        }
        setState({
          ...state,
          listDataArray: subArr,
        });
      }
      setIsLoading(false);
      setIsRefreshing(false);
    }

    if (isSubject && subjectsListError) {
      handleError(subjectsListError,actions);
      setIsLoading(false);
      setIsRefreshing(false);
    }

    /*------- level -----*/
    if (!isSubject && levelsListError) {
      handleError(levelsListError,actions);
      setIsLoading(false);
      setIsRefreshing(false);
    }

    if (!isSubject && levelsListSuccess) {
      if (levelsListSuccess.length > 0) {
        let levelArr = levelsListSuccess;
        if (selectedItem && selectedItem.length > 0) {
          levelArr = subjectLevelMap(levelsListSuccess, selectedItem, true);
        }
        setState({
          ...state,
          listDataArray: levelArr,
        });
      }

      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [
    subjectsListSuccess,
    subjectsListError,
    levelsListError,
    levelsListSuccess,
  ]);

  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      {/*------ Header ------*/}
      <Header
        componentId={componentId}
        title={title}
        onBackPress={() => navigatorPop(props)}
      />

      {/*------ list ------*/}
      <View style={styles.mainContainer}>
        <View style={[styles.topView, globalStyle.row]}>
          <Text
            style={[
              styles.headText,
              getFontStyle(i18n.locale).bold,
              {color: Theme(isDarkMode).black00},
            ]}>
            {i18n.t('subject_level_subtitle')}
          </Text>
        </View>

        {/*------ list ------*/}
        {isLoading ? (
          <Loader />
        ) : (
          <ListComponent
            isDarkMode={isDarkMode}
            onRefresh={() => {
              setIsRefreshing(true);
              isSubject ? requestSubject() : requestLevel();
            }}
            isRefreshing={isRefreshing}
            isLoadMore={isLoadmore}
            isSelectedIndex={isSelectedIndex}
            onPressRow={(data: any, index: number) => {
              callFrom ? handlePress(index) : setIsSelectedIndex(index);
            }}
            isSubjectLevel={true}
            listDataArray={state.listDataArray}
            onLoaderMore={() => {}}
          />
        )}

        {/*------ button ------*/}
        <MainButton
          isDarkMode={isDarkMode}
          titleColor={Theme(false).white}
          onPress={() => {
            onDonePress();
          }}
          title={i18n.t('done')}
        />
      </View>
    </SafeAreaView>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  subjectsListSuccess: state.requestReducer.subjectsListSuccess,
  subjectsListError: state.requestReducer.subjectsListError,
  levelsListSuccess: state.requestReducer.levelsListSuccess,
  levelsListError: state.requestReducer.levelsListError,
  selectedListSuccess: state.otherReducer.selectedListSuccess,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(SubjectLevel);
