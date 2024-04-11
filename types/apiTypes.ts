export interface VerifyEmailResponseData {
  message: string;
  ok: boolean;
}

export interface SignupRequsetData {
  email: string;
  password: string;
  profileImg: File | "";
  nickname: string;
  introduce: string;
}

export interface SignupResponseData {
  message: string;
  user: { nickname: string, profileImg: string },
}

export interface EmailDuplicationResponseData {
  message: string;
  ok: boolean;
}

export interface NicknameDuplicationResponseData {
  message: string;
  ok: boolean;
}

export interface UploadImgResponseData {
  imgUrl: string;
  fileName: string;
}
