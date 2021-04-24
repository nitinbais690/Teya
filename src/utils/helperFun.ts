/* ------------- libaray ------------- */
import ImagePicker from 'react-native-image-crop-picker';

/* ------------- config ------------- */
import config from 'config/index';

/* ------------- showMessage ------------- */
import {showMessage} from 'config/navigation/navigatorOption';

/* ------------- library ------------- */
import Axios from 'axios';

/* ------------- navigation ------------- */
import i18n from 'config/i18n';
import {getPhotoPermission} from './permissionFunction';

/*-------- country code ----------*/
import countryCodes from './countryCodes/CountryCodes.json';
import mobileNumberLength from './countryCodes/CountryMobileLength.json';

/* ------------- image picker ------------- */
export const imagePickerSelect = (
  isCamera: boolean,
  multiple?: boolean,
  mediaType?: string,
) => {
  let option = {
    includeBase64: true,
    multiple: multiple ? multiple : false,
    mediaType: mediaType ? mediaType : 'photo',
    quality: 1.0,
    maxWidth: config.imageSize,
    maxHeight: config.imageSize,
  };
  try {
    if (isCamera) {
      return ImagePicker.openCamera({
        ...option,
        takePhotoButtonTitle: 'Take a Photo',
      });
    } else {
      return ImagePicker.openPicker(option);
    }
  } catch {
    return false;
  }
};

export default imagePickerSelect;

/* ------------- open picker ------------- */
export async function selectImageOption(
  isCamera: boolean,
  isSelectMultitple?: boolean,
  mediaType?: string,
) {
  let isGranted = await getPhotoPermission(isCamera);
  if (isGranted) {
    return imagePickerSelect(isCamera, isSelectMultitple, mediaType);
  }
}

/* ------------- open picker ------------- */
export function uploadImage(imageSource: {path: string; mime: string}) {
  let image = {};
  if (imageSource) {
    let pathParts = imageSource.path.split('/');

    image = {
      uri: imageSource.path,
      type: imageSource.mime ? imageSource.mime : 'audio/aac',
      name: pathParts[pathParts.length - 1],
    };
  }

  return image;
}

/* ------------- validation ------------- */
/*-------- handlePhoneValidation ----------*/
export const handlePhoneValidation = async (
  phone: string,
  callingCode: string,
) => {
  var errorMessage = '';
  var currentNumber: number = 0;
  countryCodes.forEach((item: {dial_code: string; code: number}) => {
    if (item.dial_code === callingCode) {
      currentNumber = item.code;
    }
  });
  var mobileLength = mobileNumberLength[currentNumber].length;
  const errorCheck = await phoneValidation(phone, mobileLength);
  if (errorCheck.phoneError) {
    return (errorMessage = errorCheck.phoneErrorMsg);
  } else {
    return errorMessage;
  }
};

/*-------- handlePhoneValidation ----------*/
export function phoneValidation(currentField: string, expectLength: number) {
  let phoneErrorMsg: string = '';
  let phoneError: boolean = false;
  if (!currentField) {
    phoneError = true;
    phoneErrorMsg = i18n.t('phone_empty');
  } else if (expectLength !== currentField.length) {
    phoneError = true;
    phoneErrorMsg = i18n.t('phone_length') + ' ' + expectLength;
  } else {
    phoneError = false;
    phoneErrorMsg = '';
  }
  return {
    phoneError: phoneError,
    phoneErrorMsg: phoneErrorMsg,
  };
}

/*-------- password ----------*/
export function passwordValidation(field: string, fieldName?: string) {
  let fieldLength = field ? field.length : 0;
  let passwordErrorMsg: string = '';
  let isSuccess = true;
  if (fieldLength === 0) {
    passwordErrorMsg = fieldName ? fieldName : i18n.t('password_required');
    isSuccess = false;
  } else if (fieldLength > 0 && fieldLength < 8) {
    passwordErrorMsg = i18n.t('password_must_be_between_8_to_16');
    isSuccess = false;
  }
  return {
    message: passwordErrorMsg,
    isSuccess: isSuccess,
  };
}

/*-------- check password ----------*/
export function resetPasswordValidation(field: string, field2: string) {
  let fieldLength = field ? field.length : 0;
  let field2Length = field2 ? field2.length : 0;
  let passwordErrorMsg: string = '';
  let isSuccess = true;
  if (fieldLength === 0) {
    passwordErrorMsg = i18n.t('password_required');
    isSuccess = false;
  } else if (field2Length === 0) {
    passwordErrorMsg = i18n.t('requestConfirmPassword');
    isSuccess = false;
  } else if (field !== field2) {
    passwordErrorMsg = i18n.t('requestPasswordNotMatched');
    isSuccess = false;
  }
  return {
    message: passwordErrorMsg,
    isSuccess: isSuccess,
  };
}

/*-------- otp ----------*/
export function codeValidation(field: string, fieldName: string) {
  let fieldLength = field ? field.length : 0;
  let errorMsg: string = '';
  let isSuccess = true;
  if (fieldLength === 0) {
    errorMsg = fieldName + '' + i18n.t('requestNotEmpty');
    isSuccess = false;
  } else if (fieldLength <= 5) {
    errorMsg = i18n.t('isLengthValid');
    isSuccess = false;
  }
  return {
    message: errorMsg,
    isSuccess: isSuccess,
  };
}

/*-------- email format ----------*/
export function emailValidation(email: string, fieldName?: string) {
  let emailErrorMsg = '';
  if (!email) {
    emailErrorMsg = fieldName + '' + i18n.t('email_not_empty');
  } else {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      emailErrorMsg = i18n.t('email_not_validate_format');
    } else {
      emailErrorMsg = '';
    }
  }
  return emailErrorMsg;
}

interface ErrorProps {
  error: any;
  actions: any;
}

/*------ onlogut ------*/
export const onLogout = (actions: any) => {
  let device_uuid = '';
  device_uuid = Axios.defaults.headers.common.device_uuid;
  actions && actions.logoutAction(device_uuid);
};

/*-------- error ----------*/
export const handleError = (error: any, actions?: any) => {
  /* ------------- developer ------------- */
  if (__DEV__ && error && error.response) {
    console.log(JSON.stringify(error.response));
  }
  if (error?.response?.status) {
    try {
      var statusCode = error.response.status;
      var errorData = error.response.data ? error.response.data : {};
      var message: string = '';

      /* ------------- ,message ------------- */
      if (errorData && errorData.errors && errorData.errors.length > 0) {
        errorData.errors.map((msg: {ar: string; en: string}) => {
          if (i18n.locale === 'ar') {
            if (msg?.ar) {
              message = msg.ar;
              message = message + ' ';
            }
          } else {
            if (msg?.en) {
              message = msg.en;
              message = message + ' ';
            }
          }
        });
      }
      switch (statusCode) {
        case 400:
          showMessage({message: message, isError: true});
          break;

        case 401:
          error.errors &&
            showMessage({message: error.errors[0], isError: true});
          onLogout(actions);
          break;

        case 403:
          showMessage({message: message, isError: true});
          onLogout(actions);
          break;

        case 429:
          showMessage({message: message, isError: true});
          break;

        default:
          if (__DEV__) {
            showMessage({
              message: JSON.stringify(error.response),
              isError: true,
            });
          } else {
            showMessage({message: i18n.t('server_error'), isError: true});
          }
          break;
      }
    } catch (e) {
      if (__DEV__) {
        showMessage({message: JSON.stringify(e), isError: true});
      }
    }
  } else {
    if (__DEV__) {
      showMessage({message: JSON.stringify(error.message), isError: true});
    } else {
      showMessage({message: JSON.stringify(error.message), isError: true});
    }
  }
};

/*------ image url ------*/
export const imageURL = (userUuid: string, imageName: string) => {
  return config.imageBaseUrl + userUuid + '/' + imageName;
};

// /*------- did focus -----*/
// useEffect(() => {
//   let isMounted = true; // note this flag denote mount status
//   Navigation.events().registerComponentDidAppearListener(
//     ({componentId}): void => {
//       if (isMounted) {
//         getParams();
//       }
//     },
//   );
//   return (): void => {
//     isMounted = false;
//   }; // use effect cleanup to set flag false, if unmounted
// }, []);

/*-------- money Format --------*/
export const moneyFormat = (price: string) => {
  let money = parseFloat(price);
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

/*-------- message --------*/
export const messageFormat = data => {
  let messageObj = {
    en: '',
    ar: '',
  };
  if (data?.data?.message) {
    messageObj = data.data.message;
  } else if (data?.message) {
    messageObj = data.data.message;
  }

  return i18n.locale === 'ar' ? messageObj.ar : messageObj.en;
};

/*-------- check on reach end  --------*/
export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export const chatLRTLayout = (styles: any, isUser: boolean) => {
  let messageViewStyle = {};
  if (i18n.locale === 'ar') {
    messageViewStyle = isUser ? styles.clientMessage : styles.userMessage;
  }
  else {
    messageViewStyle = isUser ? styles.userMessage : styles.clientMessage;
  }
  return messageViewStyle;
};