import i18n from 'config/i18n';
import {Theme} from './index';
import {OrderStatus, ScreenName} from './contants';

/*-------- intro List ----------*/
export const introList = () => {
  return [
    {
      uuid: 'i1',
      title: i18n.t('slide1'),
      subtitle: i18n.t('slidesDescription1'),
      imageUrl: require('../assets/images/intro_image1.svg'),
    },
    {
      uuid: 'i2',
      title: i18n.t('slide2'),
      subtitle: i18n.t('slidesDescription2'),
      imageUrl: require('../assets/images/intro_image2.svg'),
    },
    {
      uuid: 'i3',
      title: i18n.t('slide3'),
      subtitle: i18n.t('slidesDescription3'),
      imageUrl: require('../assets/images/intro_image3.svg'),
    },
  ];
};

/*-------- drawer option ----------*/
export const DrawerOptions = () => {
  return [
    {
      uuid: 'dp0',
      title: i18n.t('home'),
      iconName: 'home',
      navigateTo: ScreenName.DASHBOARD,
    },
    {
      uuid: 'dp2',
      title: i18n.t('my_profile'),
      iconName: 'user',
      imageUrl: require('../assets/images/intro_image2.svg'),
      navigateTo: ScreenName.PROFILE,
    },
    {
      uuid: 'dp3',
      title: i18n.t('settings'),
      iconName: 'gear',
      navigateTo: ScreenName.SETTINGS,
    },
    {
      uuid: 'dp4',
      title: i18n.t('notifications'),
      iconName: 'bell',
      navigateTo: ScreenName.NOTIFICATION,
    },
  ];
};

/*-------- top tab option ----------*/
export const RequestInputs = (props?: any) => {
  let {title, level, subject, dueDate, description} = props ? props : '';
  return [
    {
      uuid: 'title',
      label: i18n.t('title'),
      placeholder: i18n.t('enter_here'),
      value: title ? title : '',
      isInput: true,
    },
    {
      uuid: 'subjects',
      label: i18n.t('subjects'),
      placeholder: i18n.t('enter_here'),
      value: subject ? subject : '',
    },
    {
      uuid: 'level',
      label: i18n.t('level'),
      placeholder: i18n.t('enter_here'),
      value: level ? level : '',
    },
    {
      uuid: 'due_date',
      label: i18n.t('due_date'),
      placeholder: i18n.t('enter_here'),
      value: dueDate ? dueDate : '',
    },
    {
      uuid: 'description',
      label: i18n.t('description'),
      inceaseSize: 180,
      placeholder: i18n.t('enter_here'),
      value: description ? description : '',
    },
  ];
};

/*-------- top tab option ----------*/
export const TopTapOptions = (count?: number, isUserTab?: boolean) => {
  if (count) {
    return [
      {
        uuid: 'tab0',
        title: i18n.t('bio'),
      },
      {
        uuid: 'tab1',
        title: i18n.t('reviews'),
      },
    ];
  } else if (isUserTab) {
    return [
      {
        uuid: 'tab0',
        title: i18n.t('my_request'),
      },
      {
        uuid: 'tab1',
        title: i18n.t('history'),
      },
    ];
  } else {
    return [
      {
        uuid: 'tab0',
        title: i18n.t('Opportunities'),
      },
      {
        uuid: 'tab1',
        title: i18n.t('history'),
      },
      {
        uuid: 'tab2',
        title: i18n.t('my_workspace'),
      },
    ];
  }
};

/*-------- top tab option ----------*/
export const QuestionOption = () => {
  return [
    {
      uuid: 'tab0',
      title: i18n.t('payment_question1'),
      subtitle: i18n.t('payment_answer1'),
    },
    {
      uuid: 'tab1',
      title: i18n.t('payment_question2'),
      subtitle: i18n.t('payment_answer2'),
    },
    {
      uuid: 'tab2',
      title: i18n.t('payment_question3'),
      subtitle: i18n.t('payment_answer3'),
    },
  ];
};

/*-------- top tab option ----------*/
export const CheckStatusBack = (status: string, theme: boolean) => {
  let color: string = Theme(theme).primary;
  switch (status) {
    case OrderStatus.ASSINED:
      color = Theme(theme).secondary;
      break;

    case OrderStatus.CANCELLED:
      color = Theme(theme).gray['E4'];
      break;

    case OrderStatus.OPEN:
      color = Theme(theme).primary;
      break;

    case OrderStatus.WAITING:
      color = Theme(theme).yellow['EE'];
      break;

    case OrderStatus.INVESTIGATING:
      color = Theme(theme).purple['F3'];
      break;

    case OrderStatus.COMPLETE:
      color = Theme(theme).green['EC'];
      break;
  }
  return {backgroundColor: color};
};

/*--------  upload ----------*/
export const uploadImageOption = () => {
  return [
    {
      uuid: 'op1',
      option: i18n.t('camera'),
      isCamera: true,
      url: require('../assets/loaderjson/camera.json'),
    },
    {
      uuid: 'op2',
      option: i18n.t('gallery'),
      url: require('../assets/loaderjson/gallery.json'),
    },
  ];
};

/*--------  profile ----------*/
export const ProfileInputs = ({
  username,
  email,
  countryCode,
  phone,
  lastName,
  firstName,
  bio,
}) => {
  return [
    {
      uuid: 'user_name',
      label: i18n.t('user_name'),
      placeholder: i18n.t('enter_here'),
      value: username ? username : '',
      isEditableFalse: true,
      isInput: true,
      isNotRTL: true,
      title: i18n.t('login_info'),
    },
    {
      uuid: 'password',
      label: i18n.t('password'),
      placeholder: i18n.t('enter_here'),
      value: '*******',
      isPassword: true,
      isInput: true,
    },
    {
      uuid: 'first_name',
      label: i18n.t('first_name'),
      placeholder: i18n.t('enter_here'),
      value: firstName ? firstName : '',
      isInput: true,
      title: i18n.t('contact_info'),
    },
    {
      uuid: 'last_name',
      label: i18n.t('last_name'),
      placeholder: i18n.t('enter_here'),
      value: lastName ? lastName : '',
      isInput: true,
    },
    {
      uuid: 'email',
      label: i18n.t('email'),
      placeholder: i18n.t('enter_here'),
      value: email ? email : '',
      keyboardType: 'email-address',
      isInput: true,
    },
    {
      uuid: 'phone',
      countryCode: countryCode ? countryCode : '+966',
      label: i18n.t('phone'),
      placeholder: i18n.t('enter_here'),
      value: phone ? phone : '',
      keyboardType: 'phone-pad',
      isNotRTL: true,
      isInput: true,
    },
    {
      uuid: 'bio',
      label: i18n.t('bio'),
      placeholder: i18n.t('enter_here'),
      value: bio ? bio : '',
      inceaseSize: 100,
      title: i18n.t('tutor_info'),
    },
    {
      uuid: 'level',
      title: i18n.t('level'),
      placeholder: i18n.t('enter_here'),
      list: [],
      isList: true,
    },
    {
      uuid: 'subject',
      title: i18n.t('subject'),
      placeholder: i18n.t('enter_here'),
      list: [],
      isList: true,
    },
  ];
};

/*--------  langauge ----------*/
export const LanguageOption = () => {
  return [
    {
      uuid: 'pf1',
      url: require('../assets/icons/us_flag.svg'),
      value: 'en',
      title: 'English',
    },
    {
      uuid: 'lang1',
      value: 'ar',
      url: require('../assets/icons/ar_flag.svg'),
      title: 'Arabic(عربي)',
    },
  ];
};

/* ------------- bottom tab array ------------- */
export const BottomTabOption = (isBidAccepted: boolean, isTutor: boolean) => {
  if (isBidAccepted) {
    return [
      {
        uuid: 'tab0',
        iconName: 'newspaper-outline',
        optionText: i18n.t('details'),
      },
      {
        uuid: 'tab2',
        iconName: 'cloud-upload',
        isOffer: true,
        optionText: i18n.t('attachments'),
      },
      {
        uuid: 'tab3',
        iconName: 'chatbubble-ellipses-outline',
        optionText: i18n.t('chat'),
      },
    ];
  } else if (isTutor) {
    return [
      {
        uuid: 'tab0',
        iconName: 'newspaper-outline',
        optionText: i18n.t('details'),
      },
      {
        uuid: 'tab2',
        iconName: 'cloud-upload',
        isOffer: true,
        optionText: i18n.t('attachments'),
      },
    ];
  } else {
    return [
      {
        uuid: 'tab0',
        iconName: 'newspaper-outline',
        optionText: i18n.t('details'),
      },
      {
        uuid: 'tab2',
        iconName: 'cloud-upload',
        isOffer: true,
        optionText: i18n.t('attachments'),
      },
      {
        uuid: 'tab3',
        iconName: 'human-greeting',
        isOffer: true,
        optionText: i18n.t('offers'),
      },
    ];
  }
};

/* ------------- cancel ------------- */
export const CancelRequestOption = () => {
  return [
    {
      uuid: 'cancel0',
      optionText: i18n.t('i_no_longer'),
    },
    {
      uuid: 'cancel1',
      optionText: i18n.t('helper_not'),
    },
    {
      uuid: 'cancel2',
      optionText: i18n.t("helper_didn't_submit"),
    },
    {
      uuid: 'cancel3',
      optionText: i18n.t('other'),
    },
  ];
};

/*-------- password ----------*/
export const PasswordInputFields = () => {
  return [
    {
      uuid: 'password1',
      placeholder: i18n.t('enter_here'),
      label: i18n.t('current_password'),
      value: '',
    },
    {
      uuid: 'password2',
      placeholder: i18n.t('enter_here'),
      label: i18n.t('new_password'),
      value: '',
    },
  ];
};
