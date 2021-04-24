export interface AttachmentObj {
  post_uuid?: string;
  file_name?: string;
  uri?: string;
  uuid?: string;
}

export interface UserInfoObj {
  first_name: string;
  last_name: string;
  phone: number;
  username: string;
  country_code: string;
  email: string;
  profile_pic: string;
  uuid: string;
  type: string;
  bio: string;
  levels_pref?: string;
  subjects_pref?: string;
  profile_pref?: string;
  amount?: number;
  rating?: number;
  tutor_uuid?: string;
}

export interface RequestObj {
  title: string;
  created_at: string;
  uuid: string;
  status: string;
  description: string;
  subject_uuid: string;
  level_uuid: string;
  bid_uuid?: string;
  bid_amount?: number;
  user_notes?: string;
  tutor_notes?: string;
  user_rating?: number;
  tutor_rating?: number;
  chat_uuid?: string;
  assigned_to?: string;
  user_uuid?: string;
}

export interface reasonObj {
  en?: string;
  ar?: string;
  optionText?: string;
}
