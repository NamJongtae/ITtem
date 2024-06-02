import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "../firebaseSetting";
import { v4 as uuid } from "uuid";
import { UploadImgResponseData } from "@/types/apiTypes";
import { set, push, ref as databaseRef} from 'firebase/database';
import { MessageData } from '@/types/notification';


export const uploadImgToFireStore = async (
  file: File | ""
): Promise<UploadImgResponseData | undefined> => {
  try {
    if (file) {
      const fileName = `${uuid()}_${file.name}`;
      const uploadImgResponse = await uploadBytes(
        storageRef(storage, `images/profile/${fileName}`),
        file
      );
      const url =
        uploadImgResponse && (await getDownloadURL(uploadImgResponse.ref));
      if (url) return { url, name: fileName };
    }
  } catch (error) {
    throw new Error("이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요.");
  }
};

export const uploadMultiImgToFirestore = async (
  files: File[]
): Promise<UploadImgResponseData[] | undefined> => {
  try {
    if (!files) return;
    const uploadPromises = [...files].map(async (file) => {
      // 각 파일에 대해 비동기 업로드 처리
      const fileName = `${uuid()}_${file.name}`;
      const uploadImgResponse = await uploadBytes(
        storageRef(storage, `images/product/${fileName}`),
        file
      );
      const url = await getDownloadURL(uploadImgResponse.ref);
      return { url, name: fileName } as UploadImgResponseData;
    });

    // 모든 파일이 업로드되길 기다립니다.
    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults;
  } catch (error) {
    throw new Error("이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요.");
  }
};

export const deleteProfileImgToFirestore = async (
  profileDataImgName: string,
  prevImgDataImgName: string
) => {
  try {
    if (!profileDataImgName || !prevImgDataImgName) return;
    if (profileDataImgName !== prevImgDataImgName) {
      await deleteObject(storageRef(storage, `images/product/${profileDataImgName}`));
    }
  } catch (error) {
    throw error;
  }
};

export const deleteImgToFirestore = async (
  productDataImgName: string[],
  prevImgDataImgName: string[]
) => {
  const removeImgPromise = [];

  for (let i = 0; i < productDataImgName.length; i++) {
    if (!prevImgDataImgName.includes(productDataImgName[i])) {
      removeImgPromise.push(
        deleteObject(storageRef(storage, `images/product/${productDataImgName[i]}`))
      );
    }
  }
  await Promise.all(removeImgPromise);
};

export const sendNotificationMessage = (userId: string, message: string) => {
  if(!userId) return;

  const messageObj: MessageData = {
    content: message, 
    isRead: false,
    isNotification: false,
    timestamp: Date.now(),
  };

  const messageRef = databaseRef(database, "notification/" + userId + "/messages");

  const newMessageRef = push(messageRef);
  set(newMessageRef, messageObj);
};