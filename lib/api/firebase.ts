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
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  increment as firestoreIncrement,
  where,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { NotificationMessageData } from "@/types/notification";
import { collection, serverTimestamp } from "firebase/firestore";
import { ChatRoomData } from "@/types/chatTypes";

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
}: {
  productId: string;
  myUid: string;
  userId: string;
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

      // 사용자별 채팅방 ID 및 총 메세지 카운터 저장
      const userRef = doc(firestoreDB, "userChatInfo", userId);
      await setDoc(
        userRef,
        {
          chatRoomIds: arrayUnion(chatRoomId),
          totalMessageCount: 0,
        },
        { merge: true }
      );

      const myRef = doc(firestoreDB, "userChatInfo", myUid);
      await setDoc(
        myRef,
        {
          chatRoomIds: arrayUnion(chatRoomId),
          totalMessageCount: 0,
        },
        { merge: true }
      );

      return chatRoomId;
    }
  } catch (error) {
    throw error;
  }
};

export const enterChatRoom = async ({
  myUid,
  chatRoomId,
}: {
  myUid: string;
  chatRoomId: string;
}) => {
  try {
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    const myChatInfoRef = doc(firestoreDB, `userChatInfo/${myUid}`);
    const chatRoomDoc = await getDoc(chatRoomRef);
    const data = chatRoomDoc.data();
    if (!chatRoomDoc.exists()) {
      throw new Error("존재하지 않는 채팅방이에요.");
    }
    if (myUid in data?.entered) {
      await updateDoc(chatRoomRef, {
        [`entered.${myUid}`]: true,
      });
    } else {
      throw new Error("잘못된 접근이에요.");
    }

    if (!data?.participantIDs.includes(myUid)) {
      await updateDoc(myChatInfoRef, { chatRoomIds: arrayUnion(chatRoomId) });
      await updateDoc(chatRoomRef, {
        participantIDs: arrayUnion(myUid),
      });
    }

    if (myUid in data?.newMessageCount) {
      const messageCount = data?.newMessageCount[myUid];
      await updateDoc(myChatInfoRef, {
        totalMessageCount: firestoreIncrement(-messageCount || 0),
      });
      await updateDoc(chatRoomRef, {
        [`newMessageCount.${myUid}`]: 0,
      });
    } else {
      throw new Error("잘못된 접근이에요.");
    }
  } catch (error) {
    throw error;
  }
};

export const leaveChatRoom = async ({
  myUid,
  chatRoomId,
}: {
  myUid: string;
  chatRoomId: string;
}) => {
  try {
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    const chatRoomDoc = await getDoc(chatRoomRef);
    if (!chatRoomDoc.exists()) {
      throw new Error("존재하지 않는 채팅방이에요.");
    }
    const data = chatRoomDoc.data();
    if (myUid in data?.entered) {
      await updateDoc(chatRoomRef, {
        [`entered.${myUid}`]: false,
      });
    } else {
      throw new Error("잘못된 접근이에요.");
    }
  } catch (error) {
    throw error;
  }
};

export const sendToChatMessage = async ({
  myUid,
  chatRoomId,
  message,
}: {
  myUid: string;
  chatRoomId: string;
  message: string;
}) => {
  try {
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    const messagesCollectionRef = collection(chatRoomRef, "messages");
    const snapshot = await getDoc(chatRoomRef);
    const data = snapshot.data() as ChatRoomData;
    const userId = Object.keys(data.entered).filter((id) => id !== myUid)[0];
    const userChatInfoRef = doc(firestoreDB, `userChatInfo/${userId}`);
    
    const messageObj = {
      content: message,
      timestamp: serverTimestamp(),
      senderId: myUid,
      isNotification: data.entered[userId] ? true : false,
    };

    await addDoc(messagesCollectionRef, messageObj);

    const updateData: any = {
      lastMessage: messageObj,
    };

    if (!data.entered[userId] && data.participantIDs.includes(userId)) {
      updateData[`newMessageCount.${userId}`] = firestoreIncrement(1);
      await updateDoc(userChatInfoRef, {
        totalMessageCount: firestoreIncrement(1),
      });
    }

    await updateDoc(chatRoomRef, updateData);
  } catch (error) {
    throw error;
  }
};

export const exitChatRoom = async ({
  myUid,
  chatRoomId,
}: {
  myUid: string;
  chatRoomId: string;
}) => {
  try {
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    const userChatInfoRef = doc(firestoreDB, `userChatInfo/${myUid}`);

    const chatRoomDoc = await getDoc(chatRoomRef);
    if (!chatRoomDoc.exists()) {
      throw new Error("존재하지 않는 채팅방이에요.");
    }

    const chatRoomData = chatRoomDoc.data();
    if (!chatRoomData.participantIDs.includes(myUid)) {
      throw new Error("잘못된 접근이에요.");
    }

    const userChatInfoDoc = await getDoc(userChatInfoRef);
    if (!userChatInfoDoc.exists()) {
      if (!chatRoomDoc.exists()) {
        throw new Error("유저 채팅방 목록이 존재하지 않아요.");
      }
    }
    await updateDoc(chatRoomRef, {
      participantIDs: arrayRemove(myUid),
    });
    await updateDoc(userChatInfoRef, {
      chatRoomIds: arrayRemove(chatRoomId),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteChatRoom = async (chatRoomId: string) => {
  try {
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);

    const chatRoomDoc = await getDoc(chatRoomRef);
    if (!chatRoomDoc.exists()) {
      throw new Error("존재하지 않는 채팅방이에요.");
    }

    const chatRoomData = chatRoomDoc.data();

    if (chatRoomData?.participantIDs.length === 0) {
      const messagesRef = collection(
        firestoreDB,
        `chatRooms/${chatRoomId}/messages`
      );
      const messagesSnapshot = await getDocs(messagesRef);

      const deleteMessagesPromises = messagesSnapshot.docs.map((messageDoc) =>
        deleteDoc(messageDoc.ref)
      );
      await Promise.all(deleteMessagesPromises);
      await deleteDoc(chatRoomRef);
    } else {
      throw new Error("채팅방 참여 인원이 있어 채팅방을 삭제할 수 없어요.");
    }
  } catch (error) {
    throw error;
  }
};
