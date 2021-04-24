import {Dimensions} from 'react-native';

/* ------------- Dimensions ------------- */
const ScreenHeight = Math.round(Dimensions.get('window').height);
const ScreenWidth = Math.round(Dimensions.get('window').width);

const Theme = (
  isDarkMode: boolean,
  isDrawer?: boolean,
  anotherTheme?: object,
) => {
  let primaryColor = '#04D1EF';
  let secondaryColor = '#FA2A3D';

  let black = {
    0: '#000000',
    35: '#35363a',
  };

  let white = {
    E5: '#E5E5E5',
    FF: '#FFFFFF',
    F8: '#F8F8FA',
    EE: '#EEEEEE',
  };

  let gray = {
    B8: '#B8BAC3',
    D5: '#D5D5D5',
    B7: '#B7B7B7',
    99: '#999999',
    66: '#666666',
    E4: '#E4E4E4',
    B2: '#B2B2B2',
    F1: '#F1F1F1',
    E8: '#8E8E8E',
    A8: '#A8A8A8'
  };

  let blue = {
    C1: '#C1C5EC',
  };

  let yellow = {
    EE: '#EEDB35',
  };

  let purple = {
    F3: '#F349C6',
  };

  let green = {
    EC: '#5ECB37',
  };

  let orange = '#F6910D';

  let {primary, secondary} = anotherTheme ? anotherTheme : '';

  return {
    primary: isDrawer ? black['35'] : primary ? primary : primaryColor,
    secondary: secondary ? secondary : secondaryColor,
    whiteF8: isDarkMode ? black['35'] : white['F8'],
    white: isDrawer ? primaryColor : isDarkMode ? black['0'] : white['FF'],
    black00: isDrawer ? white['FF'] : isDarkMode ? white['FF'] : black['35'],
    black22: isDarkMode ? white['F8'] : '#222222',
    black35: isDarkMode ? white['E5'] : black['35'],
    gray99: isDarkMode ? gray['B7'] : gray['99'],
    grayD5: isDarkMode ? black['35'] : gray['D5'],
    grayB8: isDarkMode ? white['E5'] : gray['B8'],
    black66: isDarkMode ? blue['C1'] : gray['66'],
    grayEE: isDarkMode ? white['EE'] : white['EE'],
    yellow,
    purple,
    green,
    gray,
    orange,
  };
};

/*--------- responsive  ------------*/
const scalingFactor = Math.min(ScreenWidth, ScreenHeight) / 375;

const getScaleSize = (multi: number) =>
  multi ? scalingFactor * multi : scalingFactor;

/*--------- fontfamily  ------------*/
const getFontStyle = (langauge: string) => ({
  bold: {
    fontWeight: 'bold' as 'bold',
    fontFamily: langauge === 'ar' ? 'Almarai-ExtraBold' : 'OpenSans-Bold',
  },
  semibold: {
    fontWeight: '600' as '600',
    fontFamily: langauge === 'ar' ? 'Almarai-Bold' : 'OpenSans-Semibold',
  },

  normal: {
    fontWeight: 'normal' as 'normal',
    fontFamily: langauge === 'ar' ? 'Almarai-Regular' : 'OpenSans-Light',
  },
});

/*-------- all exports  --------*/
export {ScreenHeight, ScreenWidth, Theme, getFontStyle, getScaleSize};
