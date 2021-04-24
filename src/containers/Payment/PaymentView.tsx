import React from 'react';
import {SafeAreaView, View} from 'react-native';

/*--------- custome hoooks ------*/
import {useBackButton, useGoBack} from 'utils/hooks';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';

/* ------------- components ------------- */
import Header from 'components/Bars';
import {QuestionOption} from 'utils/listArrays';
import MainButton from 'components/Buttons';
import {InputButton} from 'components/Inputs';
import {QuestionRow} from 'components/Rows';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {navigatorPop, navigatorPush} from 'config/navigation/navigatorOption';
import {ScreenName} from 'utils/contants';

/* ------------- interfaces ------------- */
import {PaymentProps} from 'interfaces/containers';
import {moneyFormat} from 'utils/helperFun';

/*------ containers ------*/
const Payment: React.FunctionComponent<PaymentProps> = (props) => {
  /*-------- backpress ----------*/
  useBackButton(useGoBack, props);

  /*------- props -----*/
  let {
    isDarkMode,
    offerItem: {amount},
    componentId,
    activeCurrency,
  } = props;

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(props.isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('payment')}
        componentId={componentId}
        onBackPress={() => {
          navigatorPop(props);
        }}
      />

      {/* ------------- amount ------------- */}
      <View
        style={[
          globalStyle.container,
          styles.mainContainer,
          styles.paymentTop,
        ]}>
        <InputButton
          placeholder={i18n.t('total')}
          value={amount ? moneyFormat(amount) + ' SR' : '0.00 SR'}
          isSpaceBetweenContain={true}
          onChangeText={() => {}}
          isDarkMode={isDarkMode}
          marginBottom={20}
        />

        {/* ------------- payment_method ------------- */}
        <InputButton
          placeholder={i18n.t('payment_method')}
          value={'Credit card'}
          onChangeText={() => {}}
          isSpaceBetweenContain={true}
          isDarkMode={isDarkMode}
          marginBottom={5}
        />
      </View>

      {/* ------------- question ------------- */}
      <View style={styles.questionView}>
        {QuestionOption().map((item: any, index: number) => {
          return (
            <QuestionRow key={item.uuid} item={item} isDarkMode={isDarkMode} />
          );
        })}
      </View>

      {/* ------------- buttons ------------- */}
      <View style={styles.buttonStyle}>
        <MainButton
          onPress={() => {
            navigatorPush(componentId, ScreenName.PAYMENT, {
              ...props,
              isDarkMode,
            });
          }}
          title={
            amount
              ? i18n.t('pay', {amount: moneyFormat(amount)}) +
                ' ' +
                activeCurrency
              : i18n.t('pay', {amount: '0.00 ' + activeCurrency})
          }
          titleColor={Theme(false).white}
          isDarkMode={isDarkMode}
        />
      </View>

      <View style={styles.buttonStyle}>
        <MainButton
          isDarkMode={props.isDarkMode}
          titleColor={Theme(props.isDarkMode).gray['E8']}
          title={i18n.t('cancel')}
          backgroundColor={Theme(props.isDarkMode).grayD5}
          onPress={() => navigatorPop(props)}
        />
      </View>
      <SafeAreaView/>
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  activeCurrency: state.otherReducer.activeCurrency,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
