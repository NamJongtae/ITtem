import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "../firebaseSetting";
import { v4 as uuid } from "uuid";
import { UploadImgResponseData } from "@/types/apiTypes";
import {
  set,
  push,
  ref as databaseRef,
  query,
  ref,
  get,
  orderByKey,
  endBefore,
  limitToLast,
  update,
  remove,
} from "firebase/database";
import { NotificationMessageData } from "@/types/notification";

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
      await deleteObject(
        storageRef(storage, `images/product/${profileDataImgName}`)
      );
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
        deleteObject(
          storageRef(storage, `images/product/${productDataImgName[i]}`)
        )
      );
    }
  }
  await Promise.all(removeImgPromise);
};

export const sendNotificationMessage = (userId: string, message: string) => {
  if (!userId) return;

  const messageObj: Omit<NotificationMessageData, "id"> = {
    content: message,
    isRead: false,
    isNotification: false,
    timestamp: Date.now(),
  };

  const messageRef = databaseRef(database, `notification/${userId}/messages`);

  const newMessageRef = push(messageRef);
  set(newMessageRef, messageObj);
};

export const getNotificationMessage = async ({
  userId,
  lastKey,
  limit = 10,
}: {
  userId: string;
  lastKey?: unknown;
  limit?: number;
}): Promise<{
  messages: NotificationMessageData[];
  nextKey: string | null;
}> => {
  try {
    const messagesRef = lastKey
      ? query(
          ref(database, `notification/${userId}/messages`),
          orderByKey(),
          endBefore(lastKey as string),
          limitToLast(limit)
        )
      : query(
          ref(database, `notification/${userId}/messages`),
          orderByKey(),
          limitToLast(limit)
        );

    const snapshot = await get(messagesRef);
    const data = snapshot.val();

    if (!data) return { messages: [], nextKey: null };

    const keys = Object.keys(data);
    const messages = keys.map((key) => ({ id: key, ...data[key] })).reverse();

    const nextKey =
      messages.length === limit ? messages[messages.length - 1].id : null;

    return { messages, nextKey };
  } catch (error) {
    console.error("Error fetching notification messages: ", error);
    throw error;
  }
};

export const readyNotificationMessage = async ({
  userId,
  messageId,
}: {
  userId: string;
  messageId: string;
}) => {
  try {
    const messageRef = ref(
      database,
      `notification/${userId}/messages/${messageId}`
    );

    await update(messageRef, { isRead: true });
  } catch (error) {
    throw error;
  }
};

export const deleteNotificationMessage = async ({
  userId,
  messageId,
}: {
  userId: string;
  messageId: string;
}) => {
  try {
    const messageRef = ref(
      database,
      `notification/${userId}/messages/${messageId}`
    );

    await remove(messageRef);
  } catch (error) {
    throw error;
  }
};

export const readAllNotificationMessage = async (userId: string) => {
  try {
    const messageRef = ref(database, `notification/${userId}/messages`);
    const snapshot = await get(messageRef);
    if (snapshot.exists()) {
      const updates: { [key: string]: any } = {};
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        if (key) {
          updates[`notification/${userId}/messages/${key}/isRead`] = true;
        }
      });

      await update(ref(database), updates);
    } 
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotificationMessage = async (userId: string) => {
  try {
    const messageRef = ref(database, `notification/${userId}/messages`);

    await remove(messageRef);
  } catch (error) {
    throw error;
  }
};
