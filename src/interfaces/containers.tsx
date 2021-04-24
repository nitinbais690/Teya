export interface ContainerProps {
  isDarkMode: boolean;
  componentId: any;
  actions: any;
  loginSuccess: any;
  activeCurrency?: any;
}

export interface CheckOTAUpdateProps extends ContainerProps {
  isDarkMode: boolean;
  componentId: any;
  actions: any;
  loginSuccess: any;
  activeCurrency?: any;
  isIntroSlideFinished: any;
  isTacAccepted: any;
}

export interface DashboardProps extends ContainerProps {
  isDarkMode: boolean;
  componentId: string;
  loginSuccess: any;
  requestsListSuccess: any;
  requestsListError: any;
  userInfoSuccess: any;
  userInfoError: any;
}

export interface AttachementsProps extends ContainerProps {
  requestUuid: string;
  userUuid: string;
  attachmentsListSuccess: any;
  attachmentsListError: any;
  uploadAttachmentError: any;
  uploadAttachmentSuccess: any;
  deleteAttachementSuccess: any;
  deleteAttachementError: any;
  isAssigned: boolean;
  isTutor: boolean;
}

export interface ChatProps extends ContainerProps {
  requestUuid: string;
  uploadAttachmentChatError: any;
  uploadAttachmentChatSuccess: any;
  updatRequestInfoError: any;
  updatRequestInfoSuccess: any;
  getMessagesListSuccess: any;
  getMessagesListError: any;
  requestInfoSuccess: any;
  createChatSuccess: any;
  createChatError: any;
  userInfoSuccess: any;
  chatUuid?: string;
}

export interface MainTabProps extends ContainerProps {
  userInfoSuccess: any;
  requestInfoSuccess: any;
  isAssigned: boolean;
  activeCurrency: string;
  isActiveBottomTab?: number;
  fromCreate?: boolean;
}

export interface PaymentProps extends ContainerProps {
  offerItem: any;
}

export interface UpdatePasswordProps extends ContainerProps {
  updatUserInfoSuccess: any;
  updatUserInfoError: any;
  userUuid: string;
}

/*---------- reducers ------------*/
export interface AuthProps extends ContainerProps {
  registerError: any;
  registerSuccess: any;
  loginError: any;
}

export interface OfferListProps extends ContainerProps {
  onPress: any;
  bidsListError: any;
  bidsListSuccess: any;
  requestUuid: string;
  updatBidInfoSuccess: any;
  updatBidInfoError: any;
}

export interface NotificationListProps extends ContainerProps {
  onPress: any;
  notificationsListSuccess: any;
  notificationsError: any;
  userUuid: string;
}

export interface TutorProfileProps extends ContainerProps {
  tutor: any;
}

export interface ProfileProps extends ContainerProps {
  userInfoSuccess: any;
  updatUserInfoError: any;
  updatUserInfoSuccess: any;
  selectedListSuccess: any;
  subjectsListSuccess: any;
  levelsListSuccess: any;
}

export interface CancelRequestProps extends ContainerProps {
  isDarkMode: boolean;
  componentId: string;
  requestUuid: string;
  isAssigned?: boolean;
  updatRequestInfoSuccess: any;
  updatRequestInfoError: any;
  cancelRequestReasonSuccess: any;
  cancelRequestReasonError: any;
}

export interface CreateRequestProps extends ContainerProps {
  requestUuid: string;
  selectedListSuccess: {
    selectedSubject: any;
    selectedLevel: any;
    isSubject: boolean;
  };
  createRequestError: any;
  createRequestSuccess: any;
  requestInfoError: any;
  requestInfoSuccess: any;
  updatRequestInfoError: any;
  updatRequestInfoSuccess: any;
  attachmentsListSuccess: any;
  attachmentsListError: any;
  uploadAttachmentError: any;
  uploadAttachmentSuccess: any;
  deleteAttachementSuccess: any;
  deleteAttachementError: any;

  createBidError: any;
  createBidSuccess: any;
  updatBidInfoSuccess: any;
  updatBidInfoError: any;

  userInfoSuccess: any;
  subjectsListSuccess: any;
  levelsListSuccess: any;

  isAssigned: boolean;
  isHistory: boolean;
}

export interface ReviewRatingProps extends ContainerProps {
  item: any;
  updatRequestInfoSuccess: any;
  updatRequestInfoError: any;
  isTutor: boolean;
}

export interface SettingsProps extends ContainerProps {
  title: string;
}

export interface SubjectLevelProps extends ContainerProps {
  title: string;
  isSubject?: boolean;
  subjectsListSuccess: any;
  subjectsListError: any;
  levelsListSuccess: any;
  levelsListError: any;
  callFrom: number;
  selectedItem: Array<any>;
  selectedListSuccess: any;
}

export interface TACProps extends ContainerProps {
  isDarkMode: boolean;
  componentId: string;
  isTacAccepted: any;
  title: string;
  actions: any;
}
