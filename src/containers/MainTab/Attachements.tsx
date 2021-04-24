import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';

/*------ styles ------*/
import globalStyle from 'config/globalStyle';
import styles from './styles';

/*--------- helper ------*/
import {Theme} from 'utils/index';
import i18n from 'config/i18n';
import config from 'config/index';

/* ------------- components ------------- */
import Header from 'components/Bars';
import ConfirmBox, {ImageBox} from 'components/Boxes';
import ZoomImageView from 'components/ZoomImageView';
import Loader from 'components/Loaders';

/* ------------- redux ------------- */
import {connect} from 'react-redux';
import {ActionCreators} from 'actions/index';
import {bindActionCreators} from 'redux';

/*------ navigation ------*/
import {
  navigatorPop,
  navigatorPopToRoot,
  showMessage,
} from 'config/navigation/navigatorOption';

/*------ utils ------*/
import {
  handleError,
  messageFormat,
  selectImageOption,
  uploadImage,
} from 'utils/helperFun';

/* ------------- interfaces ------------- */
import {AttachementsProps} from 'interfaces/containers';

/*------ containers ------*/
const Attachements: React.FunctionComponent<AttachementsProps> = props => {
  /*------- props -----*/
  let {
    requestUuid,
    isDarkMode,
    componentId,
    userUuid,
    isAssigned,
    isTutor,
    attachmentsListSuccess,
    attachmentsListError,
    uploadAttachmentError,
    uploadAttachmentSuccess,
    deleteAttachementSuccess,
    deleteAttachementError,
    actions,
  } = props;

  /*------- state -----*/
  const [state, setState] = useState({
    attachments: [],
    isDelete: -1,
    isDeleting: -1,
    isRefresh: false,
    isZoomImage: {url: '', isVisible: false},
  });
  const [isLoading, setIsLoading] = useState(2);
  const [isModelVisible, setIsModelVisible] = useState(0);
  let {attachments, isDeleting, isDelete, isRefresh, isZoomImage} = state;

  let isShowAttachement: boolean = requestUuid ? true : false;

  /*------- load more data -----*/
  const OnSelectImage = async (isCemara: boolean) => {
    let imageSources = await selectImageOption(isCemara, true, 'any');
    setIsModelVisible(0);

    if (imageSources && imageSources.length > 0) {
      imageSources.forEach(imageSource => {
        attachments.push({path: imageSource.path, isUploadLoading: true});
        let image = uploadImage(imageSource);
        let formData = new FormData();
        image.uri && formData.append(`attachment`, image);
        actions.uploadAttchmentAction(
          requestUuid,
          formData,
          2,
          attachments.length-1,
        );
      });
      setState({
        ...state,
        attachments,
      });
    }
  };

  /*------- onHandlePress -----*/
  const onHandlePress = (isImagePicker: boolean) => {
    if (isImagePicker) {
      setIsModelVisible(0);
    } else {
      setState({
        ...state,
        isDelete: -1,
      });
      deleteAttachment(attachments[isDelete].uuid, isDelete);
    }
  };

  /*------- delete attchment -----*/
  const deleteAttachment = (attchmentUuid: string, index: number) => {
    actions.deleteAttachmentAction(attchmentUuid, 2);
    setState({
      ...state,
      isDelete: -1,
      isDeleting: isDelete,
    });
  };

  /*------- did mount -----*/
  const getAttachmentList = (requestUuid: string) => {
    actions.attachmentList(requestUuid, 2);
  };

  /*------- did mount -----*/
  useEffect(() => {
    if (requestUuid) {
      getAttachmentList(requestUuid);
    } else {
      setIsLoading(0);
    }
  }, []);

  /*------- did update attachment -----*/
  /*------- did update attachment -----*/
  useEffect(() => {
    if (attachmentsListSuccess?.callFrom === 2) {
      if (attachmentsListSuccess.data?.length > 0) {
        setState({
          ...state,
          attachments: attachmentsListSuccess.data,
          isRefresh: false,
        });
      }

      setIsLoading(0);
    }
    if (attachmentsListError?.callFrom === 2) {
      setIsLoading(0);
      handleError(attachmentsListError,actions);
      setState({
        ...state,
        isRefresh: false,
      });
    }

    /*------- upload attachment -----*/
    if (uploadAttachmentSuccess?.callFrom === 2) {
      setIsLoading(0);
      let arr = attachments;
      if (uploadAttachmentSuccess?.data?.uri) {
        arr[uploadAttachmentSuccess.attachmentIndex] = {
          ...uploadAttachmentSuccess.data,
          user_uuid: userUuid,
        };
        console.log(attachments, JSON.stringify(arr))
        setState({
          ...state,
          attachments: arr,
        });
      }
    }
    if (uploadAttachmentError?.callFrom === 2) {
      setIsLoading(0);
      handleError(uploadAttachmentError,actions);
    }

    /*------- did update attachment -----*/
    if (deleteAttachementSuccess?.callFrom === 2) {
      showMessage({message: messageFormat(deleteAttachementSuccess)});
      attachments.splice(state.isDeleting, 1);
      setState({
        ...state,
        isDeleting: -1,
      });
    }
    if (deleteAttachementError?.callFrom === 2) {
      handleError(deleteAttachementError,actions);
      setState({
        ...state,
        isDeleting: -1,
        attachments,
      });
    }
  }, [
    attachmentsListSuccess,
    attachmentsListError,
    uploadAttachmentError,
    uploadAttachmentSuccess,
    deleteAttachementSuccess,
    deleteAttachementError,
  ]);

  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: Theme(isDarkMode).whiteF8},
      ]}>
      <Header
        title={i18n.t('attachments')}
        componentId={componentId}
        onBackPress={() =>
          props.fromCreate ? navigatorPopToRoot(props) : navigatorPop(props)
        }
      />

      {/*------ InputField ------*/}
      {isLoading === 2 ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                setState({
                  ...state,
                  isRefresh: true,
                });
                getAttachmentList(requestUuid);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          style={[
            styles.mainContainer,
            {backgroundColor: Theme(isDarkMode).whiteF8},
          ]}>
          {/*------ images ------*/}
          {isShowAttachement && (
            <View style={[globalStyle.rowCenter, styles.wrapStyle]}>
              {attachments.length > 0 &&
                attachments.map((item: AttachmentObj, index) => {
                  var postUuid = item.post_uuid ? item.post_uuid : '';
                  var fileName = item.file_name ? item.file_name : '';
                  let url = item.uri ? item.uri : postUuid + '/' + fileName;
                  return (
                    <ImageBox
                      isDarkMode={isDarkMode}
                      key={index}
                      isShow={true}
                      index={index}
                      isDeleting={isDeleting}
                      isLoading={item.isUploadLoading}
                      hideDelete={userUuid === item.user_uuid ? false : true}
                      OnPressDelete={() => {
                        setState({
                          ...state,
                          isDelete: index,
                        });
                      }}
                      onPress={() => {
                        setState({
                          ...state,
                          isZoomImage: {
                            url: config.attachementBaseUrl + url,
                            isVisible: true,
                          },
                        });
                      }}
                      url={
                        item.path ? item.path : config.attachementBaseUrl + url
                      }
                    />
                  );
                })}
              {/*------ upload button ------*/}
              {isTutor && isAssigned && (
                <ImageBox
                  onCancel={true}
                  isShow={true}
                  hideDelete={true}
                  isLoading={isLoading === 3 ? true : false}
                  isDarkMode={isDarkMode}
                  index={-1}
                  onPress={() => {
                    setIsModelVisible(1);
                  }}
                />
              )}

              {!isTutor && (
                <ImageBox
                  onCancel={true}
                  isShow={true}
                  hideDelete={true}
                  isLoading={isLoading === 3 ? true : false}
                  isDarkMode={isDarkMode}
                  index={-1}
                  onPress={() => {
                    setIsModelVisible(1);
                  }}
                />
              )}
            </View>
          )}
        </ScrollView>
      )}

      {/*------ confirm ------*/}
      <ConfirmBox
        isDarkMode={isDarkMode}
        onPress={(isCamera: boolean) => {
          onHandlePress(isModelVisible ? true : false);
          isModelVisible &&
            setTimeout(() => {
              OnSelectImage(isCamera);
            }, 2000);
        }}
        onCancel={() => {
          isDelete !== -1
            ? setState({
                ...state,
                isDelete: -1,
              })
            : setIsModelVisible(0);
        }}
        isShow={isDelete !== -1 ? true : false}
        heading={isDelete !== -1 ? i18n.t('confirm') : i18n.t('upload_image')}
        subtitle={
          isDelete !== -1
            ? i18n.t('do_want_to_delete_attachment')
            : i18n.t('upload_image_desc')
        }
        isVisible={isDelete !== -1 ? true : isModelVisible ? true : false}
      />

      {/*------ ZoomImageView ------*/}
      <ZoomImageView
        isDarkMode={isDarkMode}
        url={isZoomImage.url}
        isActive={isZoomImage.isVisible}
        onPress={() => {
          setState({
            ...state,
            isZoomImage: {isVisible: false, url: ''},
          });
        }}
      />
      <SafeAreaView />
    </View>
  );
};

/*------ received props ------*/
const mapStateToProps = (state: any) => ({
  isDarkMode: state.otherReducer.isDarkMode,
  uploadAttachmentSuccess: state.requestReducer.uploadAttachmentSuccess,
  uploadAttachmentError: state.requestReducer.uploadAttachmentError,
  attachmentsListSuccess: state.requestReducer.attachmentsListSuccess,
  attachmentsListError: state.requestReducer.attachmentsListError,
  deleteAttachementSuccess: state.requestReducer.deleteAttachementSuccess,
  deleteAttachementError: state.requestReducer.deleteAttachementError,
});

/* ------------- send action ------------- */
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

/*------ export container ------*/
export default connect(mapStateToProps, mapDispatchToProps)(Attachements);
