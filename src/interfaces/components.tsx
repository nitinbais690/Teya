import {reasonObj} from './index';

export interface ChatInputProps {
  chatText: string;
  recordingDuration: string;
  onPressAttachment: any;
  onChangeText: any;
  handleRecording: string;
  onSendMessage: any;
  isDarkMode: boolean;
  isRecording: number
}

/* ------------- bars ------------- */
export interface HeaderProps {
  isDarkMode: boolean;
  title: string;
  onDrawerOpen?: any;
  onBackPress?: any;
  backgroundColor?: string;
  titleColor?: string;
  isHideIcon?: boolean;
  textSize?: number;
  userInfoSuccess: any;
  componentId: string;
  isTextAreaHeader?: boolean;
  isNotification?: boolean;
  isProfile?: boolean;
}

export interface DrawerOptionProps {
  option?: any;
  onPress: any;
  isDarkMode: boolean;
}

export interface DrawerProps extends DrawerOptionProps {
  isLeftText?: boolean;
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  isHideIcon?: boolean;
  textSize?: number;
  componentId: string;
  actions: any;
  rootStack: string;
  userInfoSuccess: any;
}

export interface DrawerHeadProps extends DrawerOptionProps {
  name: string;
  profileImageUrl: string;
}

export interface BottomTabBarProps {
  isDarkMode: boolean;
  onTapChange: (tab: number) => void;
  isActiveBottomTab: number;
  isBidAccepted: boolean;
  isTutor: boolean;
}

export interface TopTabProps {
  isDarkMode: boolean;
  onTapChange: (tab: number) => void;
  isActiveTopBar: number;
  tabCount?: number;
  isUserTab?: boolean;
}

/* ------------- Box ------------- */
export interface BoxProps {
  isDarkMode: boolean;
  onPress?: any;
  OnPressDelete?: any;
  onCancel?: any;
  isVisible?: boolean;
  url?: string;
  subtitle?: string;
  heading?: string;
  isLoading?: boolean;
  index?: number;
  isDeleting?: any;
  isShow?: boolean;
  hideDelete?: boolean;
}

export interface ConfirmBoxProps extends BoxProps{
  type: number | string;
  isConfirmToSend: boolean;
}

export interface LangaugeBoxProps extends BoxProps {
  isActive: any;
  item: {
    url?: number;
    title: string;
  };
}

export interface CancelRowProps extends BoxProps {
  isActive: any;
  item: reasonObj;
}

export interface ProfileBoxProps extends BoxProps {
  name?: string;
  degination?: string;
  ratingCount?: number;
  rating?: string;
  isHorizental?: boolean;
}

/* ------------- Button ------------- */
export interface ButtonProps {
  isDarkMode: boolean;
  isLeftText?: boolean;
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  titleColor?: string;
  isHideIcon?: boolean;
  textSize?: number;
  isLoading?: boolean;
}

/* ------------- DateTimePicker ------------- */
export interface DateTimePickerProps {
  onChange: any;
  onClose: any;
  isDarkMode: boolean;
  mode?: string;
  value: Date;
  isDatePickerShow: boolean;
  minimumDate: Date;
  maximumDate?: Date;
}

export interface InputFieldProps {
  placeholder: string;
  label: string;
  value?: string;
  onChangeText: any;
  isEditableFalse?: boolean;
  isDarkMode: boolean;
  onResetInput?: () => void;
  secureTextEntryTrue?: boolean;
  onPress?: any;
  onPressUpdate?: any;
  inceaseSize?: number;
  isMultiline?: boolean;
  marginBottom?: number;
  isNotRTL?: boolean;
  onPressCountryPicker?: any;
  callingCode?: string;
  isCountryPickerVisible?: boolean;
  onSelectCountryCode?: any;
  keyboardType?: string;
  backgroundColor?: string;
  isSpaceBetweenContain?: boolean;
  rightTitle?: string;
  showIcon?: boolean;
}

export interface SlideItem {
  imageUrl: number;
  subtitle: string;
  title: string;
}

export type SlidesProps = {
  slide: SlideItem;
  theme: boolean;
};

export interface FormProps {
  isDarkMode: boolean;
  heading: string;
  subtitle: string;
  buttonTitle: string;
  upperButtonTitle: string;
  onSubmit: (obj?: any) => void;
  onUpperButton: (obj?: any) => void;
  isLoginScreen: boolean;
  isLoading?: boolean;
}

export interface ListComponentProps {
  onPressRow: any;
  onPressRight?: any;
  onRefresh: () => void;
  onLoaderMore: () => void;
  listDataArray: Array<any>;
  isRefreshing: boolean;
  isLoadMore: boolean;
  isSelectedIndex?: number;
  isOfferRow?: boolean;
  isDarkMode: boolean;
  isSubjectLevel?: boolean;
  isLoadingRow?: number;
  activeCurrency?: string;
  isNotification?: boolean;
}

export interface LoaderProps {
  isButtonLoading?: boolean;
  isEmpty?: boolean;
  isNetwork?: boolean;
  size?: number;
  isAudio?: boolean;
}

export interface ErrorProps {
  isError: boolean;
  componentId: string;
  showDuration?: number;
  isDarkMode: boolean;
  message: string;
}

export interface RatingProps {
  ratingCount: number;
  isDarkMode: boolean;
}

export interface SwitchProps {
  isActive: boolean;
  onPress: () => void;
  isDarkMode: boolean;
}

export interface ZoomImageProps extends SwitchProps {
  url: string;
}

/* ------------- Rows ------------- */
export interface RowProps {
  onPressRow?: any;
  item?: any;
  isDarkMode: boolean;
  isSelectedIndex?: number;
  index?: number;
  onPressRight?: any;
  isLoadingRow?: any;
  activeCurrency?: string;
}
