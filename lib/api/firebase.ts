import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, firestoreDB, storage } from "../firebaseSetting";
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
  increment,
  startAt,
} from "firebase/database";
import {
  addDoc,
  arrayUnion,
  doc,
  query as firestoreQuery,
  getDocs,
  setDoc,
  where,
} from "firebase/firestore";
import { NotificationMessageData } from "@/types/notification";
import { collection, serverTimestamp } from "firebase/firestore";

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
      messages.length >= limit ? messages[messages.length - 1].id : null;

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

    const counterRef = ref(database, `notification/${userId}/counter`);

    await update(messageRef, { isRead: true });
    await update(counterRef, { unreadCount: increment(-1) });
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
    const counterRef = ref(database, `notification/${userId}/counter`);

    const messageSnapshot = await get(messageRef);
    if (messageSnapshot.exists() && messageSnapshot.val().isRead === false) {
      await update(counterRef, { unreadCount: increment(-1) });
    }

    await remove(messageRef);
  } catch (error) {
    throw error;
  }
};

export const readAllNotificationMessage = async ({
  userId,
  endKey,
}: {
  userId: string;
  endKey: string;
}) => {
  try {
    const messagesRef = query(
      ref(database, `notification/${userId}/messages`),
      orderByKey(),
      startAt(endKey)
    );
    const counterRef = ref(database, `notification/${userId}/counter`);

    const snapshot = await get(messagesRef);
    if (snapshot.exists()) {
      const updates: { [key: string]: any } = {};
      let unreadCountDecrease = 0;
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        if (key) {
          updates[`notification/${userId}/messages/${key}/isRead`] = true;
          unreadCountDecrease++;
        }
      });

      await update(ref(database), updates);
      await update(counterRef, {
        unreadCount: increment(-unreadCountDecrease),
      });
    }
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotificationMessage = async ({
  userId,
  endKey,
}: {
  userId: string;
  endKey: string;
}) => {
  try {
    const messagesRef = query(
      ref(database, `notification/${userId}/messages`),
      orderByKey(),
      startAt(endKey)
    );
    const counterRef = ref(database, `notification/${userId}/counter`);

    const snapshot = await get(messagesRef);
    if (snapshot.exists()) {
      const updates: { [key: string]: any } = {};
      let unreadCountDecrease = 0;

      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const isRead = childSnapshot.val().isRead;
        if (key) {
          updates[`notification/${userId}/messages/${key}`] = null;
          if (!isRead) {
            unreadCountDecrease++;
          }
        }
      });

      await update(ref(database), updates);
      if (unreadCountDecrease > 0) {
        await update(counterRef, {
          unreadCount: increment(-unreadCountDecrease),
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

export const startChat = async ({
  productId,
  myUid,
  userId,
  addChatRoomId,
}: {
  productId: string;
  myUid: string;
  userId: string;
  addChatRoomId: (chatRoomId: string) => Promise<void>;
}) => {
  try {
    const chatRoomsRef = collection(firestoreDB, "chatRooms");
    const q = firestoreQuery(
      chatRoomsRef,
      where("productId", "==", productId),
      where("participantIDs", "array-contains", myUid)
    );

    const querySnapshot = await getDocs(q);
    let chatRoomId = null;
    querySnapshot.forEach((doc) => {
      const chatRoom = doc.data();
      if (chatRoom.participantIDs.includes(userId)) {
        chatRoomId = doc.id;
        return;
      }
    });

    if (chatRoomId) {
      // 이미 존재하는 채팅방이 있음
      return chatRoomId;
    } else {
      // 새로운 채팅방 생성
      const newChatRoomData = {
        productId,
        participantIDs: [myUid, userId],
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTimestamp: null,
        newMessageCount: {
          [myUid]: 0,
          [userId]: 0,
        },
        entered: {
          [myUid]: false,
          [userId]: false,
        },
        isAlarm: {
          [myUid]: true,
          [userId]: true,
        },
      };

      const docRef = await addDoc(chatRoomsRef, newChatRoomData);
      chatRoomId = docRef.id;
      await addChatRoomId(chatRoomId);

      // 사용자별 채팅방 ID 저장
      const userChatRoomIdsRef = doc(firestoreDB, "chatRoomIds", userId);
      await setDoc(userChatRoomIdsRef, { chatRoomIds: arrayUnion(chatRoomId) }, { merge: true });
      
      const myChatRoomIdsRef = doc(firestoreDB, "chatRoomIds", myUid);
      await setDoc(myChatRoomIdsRef, { chatRoomIds: arrayUnion(chatRoomId) }, { merge: true });

      return chatRoomId;
    }
  } catch (error) {
    throw error;
  }
};
