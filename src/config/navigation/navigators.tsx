import {lazy} from 'react';
import {Navigation} from 'react-native-navigation';
import {ScreenName} from '../../utils/contants';

/*------------- hoc -------------*/
import withRedux from '../../hoc';
import NavigationAlert from 'components/Message';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

/*------------- imports screen ---------------*/
const CheckOTAUpdate = lazy(() => import('containers/CheckOTAUpdate'));
const AppIntroSlides = lazy(() => import('containers/IntroSlides'));
const Login = lazy(() => import('containers/Auth/index'));
const Settings = lazy(() => import('containers/Settings'));
const TAC = lazy(() => import('containers/TAC'));
const ReviewRating = lazy(() => import('containers/ReviewRating'));
const MainTab = lazy(() => import('containers/MainTab'));

const DrawerComponent = lazy(() => import('components/Bars/Drawer'));
const Dashboard = lazy(() => import('containers/Dashboard'));
const Request = lazy(() => import('containers/Request'));
const CancelRequest = lazy(() => import('containers/Request/Cancel'));
const SubjectLevel = lazy(() => import('containers/SubjectLevel'));
const Profile = lazy(() => import('containers/Profile'));
const TutorProfile = lazy(() => import('containers/Profile/TutorProfile'));
const UpdatePassword = lazy(() => import('containers/Profile/ChangePassword'));
const Notification = lazy(() => import('containers/Profile/Notification'));
const Payment = lazy(() => import('containers/Payment/'));
const PaymentView = lazy(() => import('containers/Payment/PaymentView'));

/*--------------- register screen -------------*/
export const registerScreens = (store: any, Provider: any) => {
  const withReduxStore = withRedux(store, Provider);
  Navigation.registerComponent(
    ScreenName.CHECK_OTA_UPDATE,
    withReduxStore(CheckOTAUpdate),
  );
  Navigation.registerComponent(
    ScreenName.APP_INTRO_SLIDES,
    withReduxStore(AppIntroSlides),
  );
  Navigation.registerComponent(ScreenName.LOGIN, withReduxStore(Login));
  Navigation.registerComponent(
    ScreenName.DRAWER_COMPONENT,
    withReduxStore(DrawerComponent),
  );
  Navigation.registerComponent(ScreenName.DASHBOARD, withReduxStore(Dashboard));
  Navigation.registerComponent(ScreenName.REQUEST, withReduxStore(Request));
  Navigation.registerComponent(
    ScreenName.CANCEL_REQUEST,
    withReduxStore(CancelRequest),
  );
  Navigation.registerComponent(
    ScreenName.SUBJECT_LEVEL_LIST,
    withReduxStore(SubjectLevel),
  );
  Navigation.registerComponent(ScreenName.PROFILE, withReduxStore(Profile));
  Navigation.registerComponent(
    ScreenName.TUTOR_PROFILE,
    withReduxStore(TutorProfile),
  );
  Navigation.registerComponent(
    ScreenName.NOTIFICATION,
    withReduxStore(Notification),
  );
  Navigation.registerComponent(
    ScreenName.UPDATE_PASSWORD,
    withReduxStore(UpdatePassword),
  );

  Navigation.registerComponent(ScreenName.SETTINGS, withReduxStore(Settings));
  Navigation.registerComponent(ScreenName.TAC, withReduxStore(TAC));
  Navigation.registerComponent(
    ScreenName.REVIEW_RATING,
    withReduxStore(ReviewRating),
  );
  Navigation.registerComponent(
    ScreenName.MAIN_TAB,
    withReduxStore(gestureHandlerRootHOC(MainTab)),
  );

  Navigation.registerComponent(ScreenName.PAYMENT, withReduxStore(Payment));
  Navigation.registerComponent(
    ScreenName.PAYMENT_VIEW,
    withReduxStore(PaymentView),
  );

  Navigation.registerComponent(
    ScreenName.MESSAGE_ALERT,
    withReduxStore(NavigationAlert),
  );
};
