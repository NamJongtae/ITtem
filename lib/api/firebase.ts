import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseSetting";
import { v4 as uuid } from "uuid";
import { UploadImgResponseData } from '@/types/apiTypes';

export const uploadImgToFireStore = async (
  file: File | ""
): Promise<UploadImgResponseData | undefined> => {
  if (file) {
    const fileName = `${uuid()}_${file.name}`;
    const uploadImgResponse = await uploadBytes(
      ref(storage, `images/profile/${fileName}`),
      file
    );
    const imgUrl = uploadImgResponse && (await getDownloadURL(uploadImgResponse.ref));
    if (imgUrl) return { imgUrl, fileName };
  }
};
