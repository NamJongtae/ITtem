import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebaseSetting";
import { v4 as uuid } from "uuid";
import { UploadImgResponseData } from "@/types/apiTypes";

export const uploadImgToFireStore = async (
  file: File | ""
): Promise<UploadImgResponseData | undefined> => {
  if (file) {
    const fileName = `${uuid()}_${file.name}`;
    const uploadImgResponse = await uploadBytes(
      ref(storage, `images/profile/${fileName}`),
      file
    );
    const url =
      uploadImgResponse && (await getDownloadURL(uploadImgResponse.ref));
    if (url) return { url, name: fileName };
  }
};

export const uploadMultiImgToFirestore = async (
  files: File[]
): Promise<UploadImgResponseData[] | undefined> => {
  if (!files) return;
  console.log(files);
  const uploadPromises = [...files].map(async (file) => {
    // 각 파일에 대해 비동기 업로드 처리
    const fileName = `${uuid()}_${file.name}`;
    const uploadImgResponse = await uploadBytes(
      ref(storage, `images/${fileName}`),
      file
    );
    const url = await getDownloadURL(uploadImgResponse.ref);
    return { url, name: fileName } as UploadImgResponseData;
  });

  // 모든 파일이 업로드되길 기다립니다.
  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults;
};

export const deleteImgToFirestore = async (
  productDataImgName: string[],
  prevImgDataImgName: string[]
) => {
  const removeImgPromise = [];

  for (let i = 0; i < productDataImgName.length; i++) {
    if (!prevImgDataImgName.includes(productDataImgName[i])) {
      removeImgPromise.push(
        deleteObject(ref(storage, `images/${productDataImgName[i]}`))
      );
    }
  }
  await Promise.all(removeImgPromise);
};
