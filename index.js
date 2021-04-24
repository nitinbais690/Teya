import {registerScreens} from './src/config/navigation/navigators';

/*------------- library ----------------*/
import SplashScreen from 'react-native-splash-screen';
import {Navigation} from 'react-native-navigation';

/*----------- loader -------------*/
import {store} from './src/store';
import {Provider} from 'react-redux';

/*----------- navigation -------------*/
Navigation.events().registerAppLaunchedListener(() => {
  registerScreens(store, Provider);
  setTimeout(SplashScreen.hide, 1000);
});
