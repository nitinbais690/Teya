import React, {useState} from 'react';
import {View} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';

/*--------- helper ------*/
import {userDetails} from 'utils/controller';

/* ------------- components ------------- */
import BottomTabBar from 'components/Bars/BottomTabBar';
import Request from 'containers/Request';
import OfferList from './OfferList';
import Chat from './Chat';
import Attachements from './Attachements';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ interfaces ------*/
import {MainTabProps} from 'interfaces/containers';

/*------ containers ------*/
const MainTab: React.FunctionComponent<MainTabProps> = props => {
  /* ------------- props ------------- */
  let {isAssigned, isDarkMode} = props;

  /* ------------- state ------------- */
  const [state, setState] = useState({
    isActiveBottomTab: props.isActiveBottomTab
      ? props.isActiveBottomTab
      : props.fromCreate
      ? 1
      : 0,
  });
  let {isActiveBottomTab} = state;

  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*-------- locale variable ----------*/
  let {isTutor, userUuid} = userDetails(props.userInfoSuccess);

  let isShowChat: boolean = false;
  if (isAssigned && isActiveBottomTab === 2) {
    isShowChat = true;
  }
  return (
    <View style={globalStyle.container}>
      <View style={globalStyle.container}>
        {isShowChat ? (
          <Chat {...props} />
        ) : isActiveBottomTab === 2 ? (
          <OfferList {...props} />
        ) : isActiveBottomTab === 1 ? (
          <Attachements
            {...props}
            userUuid={userUuid}
            isAssigned={isAssigned}
            isTutor={isTutor}
          />
        ) : (
          <Request {...props} />
        )}
      </View>
      {/* ------------- BottomTab ------------- */}
      <BottomTabBar
        isDarkMode={isDarkMode}
        isBidAccepted={isAssigned}
        isTutor={isTutor}
        isActiveBottomTab={state.isActiveBottomTab}
        onTapChange={(isActiveBottomTab: number) =>
          setState({...state, isActiveBottomTab})
        }
      />
    </View>
  );
};

/* ------------- received  props ------------- */
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  userInfoSuccess: state.profileReducer.userInfoSuccess,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/* ------------- export container ------------- */
export default connect(mapStateToProps, mapDispatchToProps)(MainTab);
