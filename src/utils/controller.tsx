import i18n from 'config/i18n';
import {moneyFormat} from './helperFun';

/* ------------- interfaces ------------- */
import {UserInfoObj, RequestObj, reasonObj} from 'interfaces/index';

/* ------------- formate Uuid ------------- */
export const formatUuid = (item: {uuid: string}) => {
  let uuidArray = item.uuid ? item.uuid.split('-') : [];
  /* ------------- id -------------  */
  let itemUuid =
    uuidArray.length > 0 ? '#' + uuidArray[uuidArray.length - 1] : '#';
  return itemUuid;
};

/*------ user Details ------*/
export const userDetails = (userRes?: {data?: {data?: [UserInfoObj]}}) => {
  let fullName: string = '';
  let firstName: string = '';
  let lastName: string = '';
  let profileImageUrl: string = '';
  let phone: number = 0;
  let email: string = '';
  let countryCode: string = '';
  let username: string = '';
  let userUuid: string = '';
  let tutorUuid: string = '';

  let bio: string = '';
  let isTutor: boolean = false;
  let subjectUuidArray: Array<any> = [];
  let levelUuidArray: Array<any> = [];
  let amount: string = '';
  let rating: number = 0;

  try {
    if (userRes?.data?.data?.length > 0) {
      let user: UserInfoObj = userRes.data.data[0];

      userUuid = user.uuid;
      tutorUuid = user.tutor_uuid ? user.tutor_uuid : '';
      firstName = user.first_name ? user.first_name : '';
      lastName = user.last_name ? user.last_name : '';
      profileImageUrl = user.profile_pic ? user.profile_pic : '';
      email = user.email ? user.email : '';
      countryCode = user.country_code ? user.country_code : '';
      phone = user.phone ? user.phone : 0;
      username = user.username ? user.username : '';
      bio = user.bio ? user.bio : '';
      amount = user.amount ? moneyFormat(user.amount.toString()) : '0.00';
      levelUuidArray = user.levels_pref ? JSON.parse(user.levels_pref) : [];
      rating = user.rating ? user.rating : 0;
      subjectUuidArray = user.subjects_pref
        ? JSON.parse(user.subjects_pref)
        : [];

      isTutor = user.type === 'tutor' ? true : false;
      if (lastName) {
        fullName = firstName + ' ' + lastName;
      } else {
        fullName = firstName;
      }
    }
  } catch (error) {}
  return {
    fullName,
    username,
    firstName,
    lastName,
    phone,
    email,
    countryCode,
    profileImageUrl,
    levelUuidArray,
    subjectUuidArray,
    userUuid,
    rating,
    amount,
    bio,
    isTutor,
    tutorUuid,
  };
};

/*------ subject level ------*/
export const subjectLevelData = (item: {local: string}) => {
  let title: string = '';
  let titleAr: string = '';
  let obj = {en: '', ar: ''};
  /* ------------- item.local ------------- */

  try {
    if (item && item.local) {
      obj = JSON.parse(item.local);
      title = obj.en ? obj.en : '';
      titleAr = obj.ar ? obj.ar : title;
    }
  } catch (e) {}

  return {
    title,
    titleAr,
  };
};

/*------ request ------*/
export const requestInfoFormat = (
  item: RequestObj,
  subjects?: Array<any>,
  levels?: Array<any>,
) => {
  let title: string = '';
  let date: string = '';
  let dueDate: string = '';
  let description: string = '';
  let status: string = '';
  let subject: string = '';
  let level: string = '';
  let requestUuid = formatUuid(item);
  let isApplied: boolean = false;
  let bidUuid = '';
  let bidAmount: string = '';
  let userRating: number = 0;
  let tutorRating: number = 0;
  let userNotes: string = '';
  let chatUuid: string = '';
  let assignedUuid: string = '';
  let userUuid: string = '';
  let tutorNotes: string = '';

  /* ------------- item.local ------------- */
  try {
    if (item) {
      title = item.title ? item.title : '';
      date = item.created_at ? item.created_at.split('T')[0] : '';
      dueDate = item.due_date ? item.due_date.split('T')[0] : '';
      description = item.description ? item.description : '';
      status = item.status ? item.status : '';
      bidAmount = item.bid_amount
        ? moneyFormat(item.bid_amount.toString())
        : '';
      isApplied = item.bid_uuid ? true : false;
      assignedUuid = item.assigned_to ? item.assigned_to : '';
      chatUuid = item.chat_uuid ? item.chat_uuid : '';
      bidUuid = item.bid_uuid ? item.bid_uuid : '';
      userUuid = item.user_uuid ? item.user_uuid : '';
      subject = item.subject_uuid ? item.subject_uuid : '';
      level = item.level_uuid ? item.level_uuid : '';

      userRating = item.user_rating ? item.user_rating : 0;
      tutorRating = item.tutor_rating ? item.tutor_rating : 0;
      userNotes = item.user_notes ? item.user_notes : '';
      tutorNotes = item.tutor_notes ? item.tutor_notes : '';
      bidAmount = item.bid_amount
        ? moneyFormat(item.bid_amount.toString())
        : '';
      status = item.status ? item.status : '';
      bidAmount = item.bid_amount
        ? moneyFormat(item.bid_amount.toString())
        : '';
      /* ------------- subject ------------- */
      if (subject && subjects?.length > 0) {
        subjects.forEach(sub => {
          if (subject === sub.uuid) {
            let {title, titleAr} = subjectLevelData(sub);
            subject = i18n.locale === 'en' ? title : titleAr;
          }
        });
      }

      /* ------------- level ------------- */
      if (level && levels?.length > 0) {
        levels.forEach(lev => {
          if (level === lev.uuid) {
            let {title, titleAr} = subjectLevelData(lev);
            level = i18n.locale === 'en' ? title : titleAr;
          }
        });
      }
    }
  } catch (e) {}
  return {
    title,
    date,
    dueDate,
    description,
    requestUuid,
    status,
    bidAmount,
    bidUuid,
    isApplied,
    level,
    subject,
    tutorNotes,
    userNotes,
    userRating,
    tutorRating,
    assignedUuid,
    userUuid,
    chatUuid,
  };
};

/*------ chat ------*/
export const chatUserInfo = (item, isTutor: boolean) => {
  let firstName: string = '';
  let lastName: string = '';
  let profileImageUrl: string = '';
  let fullName: string = '';

  if (!isTutor) {
    firstName = item.tutor_first_name ? item.tutor_first_name : '';
    lastName = item.tutor_last_name ? item.tutor_last_name : '';
    profileImageUrl = item.tutor_profile_pic ? item.tutor_profile_pic : '';
  } else {
    firstName = item.owner_first_name ? item.owner_first_name : '';
    lastName = item.owner_last_name ? item.owner_last_name : '';
    profileImageUrl = item.owner_profile_pic ? item.owner_profile_pic : '';
  }

  if (lastName) {
    fullName = firstName + ' ' + lastName;
  } else {
    fullName = firstName;
  }
  return {
    fullName,
    profileImageUrl,
  };
};

/*------ subject ------*/
export const subjectLevelTitleIntoString = (array: any) => {
  let substring: string = '';
  let substringAr: string = '';

  array.length > 0 &&
    array.forEach((e, index) => {
      let {title, titleAr} = subjectLevelData(e);
      substring = index ? substring + ' ' + title : title;
      substringAr = index ? substringAr + ' ' + titleAr : index;
    });

  return {
    substring,
    substringAr,
  };
};

/*------ subject ------*/
export const subjectLevelMap = (
  selected: any,
  listArray: any,
  isMainList?: boolean,
) => {
  /* ------------- item.local ------------- */
  let arr = [];
  try {
    if (selected && selected.length > 0 && listArray && listArray.length > 0) {
      selected.map((e, ei) => {
        let isActive = false;
        listArray.map((da, di) => {
          if (isMainList && e.uuid === da.uuid) {
            isActive = true;
          } else if (e === da.uuid) {
            arr.push(da);
          }
        });
        isMainList && arr.push({...e, isActive});
      });
    }
  } catch (e) {}
  return arr;
};

/*------ reasons ------*/
export const reasonFormat = (item: reasonObj) => {
  /* ------------- item.local ------------- */
  let title: string = '';
  let titleAr: string = '';
  try {
    title = item.en ? item.en : '';
    titleAr = item.ar ? item.ar : '';

    if (!titleAr) {
      title = titleAr;
    }
  } catch (e) {}
  return {
    titleAr,
    title,
  };
};
