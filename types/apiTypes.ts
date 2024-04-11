export interface VerifyEmailResponseData {
  message: string;
  ok: boolean;
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
