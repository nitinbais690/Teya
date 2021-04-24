import {PermissionsAndroid, Alert} from 'react-native';
import i18n from 'config/i18n';

/* ------------- library ------------- */
import {
  check,
  PERMISSIONS,
  openSettings,
  request,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

/* ------------- photo ------------- */
export const getPhotoPermission = async (isCamera: boolean) => {
  let permissionItem = '';

  if (isCamera) {
    permissionItem =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
  } else {
    permissionItem =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  }
  let statusValue = '';
  let granted = '';

  statusValue = await check(permissionItem);

  if (statusValue === 'denied') {
    if (Platform.OS === 'android') {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: i18n.t('permission'),
          message: i18n.t('access_location'),
          buttonPositive: i18n.t('ok'),
        },
      );
    } else {
      granted = await request(permissionItem);
    }
  } else {
    granted = statusValue;
  }

  if (granted === 'granted') {
    return true;
  } else {
    Alert.alert(i18n.t('permission'), i18n.t('upload_pic_permission'), [
      {
        text: i18n.t('cancel'),
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: i18n.t('openSettings'),
        onPress: () =>
          openSettings().catch(() => console.warn('cannot open settings')),
      },
    ]);
  }

  return false;
};

/* ------------- read write permission ------------- */
export const getReadWritePermission = async () => {
  let permissionItem = [
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
  ];

  let statusValue = await checkMultiple(permissionItem);

  if (
    statusValue[permissionItem[0]] === 'granted' &&
    statusValue[permissionItem[1]] === 'granted'
  ) {
    return true;
  } else {
    statusValue = await requestMultiple(permissionItem);
    if (
      statusValue[permissionItem[0]] === 'granted' &&
      statusValue[permissionItem[1]] === 'granted'
    ) {
      return true;
    } else {
      Alert.alert(i18n.t('permission'), i18n.t('upload_pic_permission'), [
        {
          text: i18n.t('cancel'),
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: i18n.t('openSettings'),
          onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
      ]);
    }
  }
  return false;
};
