import { v4 as uuid } from "uuid";
import { UploadImgResponseData } from "@/types/api-types";

import { NotificationMessageData } from "@/types/notification-types";
import { ChatRoomData } from "@/types/chat-types";
import {
  getFirestoreDB,
  getRealtimeDB,
  getStorageInstance
} from "../firebaseSetting";
import { DocumentData } from "firebase/firestore";

export const uploadImgToFireStore = async (
  file: File | ""
): Promise<UploadImgResponseData | undefined> => {
  try {
    if (file) {
      const firebaseStorage = await import("firebase/storage");
      const storage = await getStorageInstance();
      const { uploadBytes, ref: storageRef, getDownloadURL } = firebaseStorage;
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
    console.error(error);
    throw new Error("이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요.");
  }
};

export const uploadMultiImgToFirestore = async (
  files: File[]
): Promise<UploadImgResponseData[] | undefined> => {
  try {
    if (!files) return;
    const firebaseStorage = await import("firebase/storage");
    const { uploadBytes, ref: storageRef, getDownloadURL } = firebaseStorage;
    const uploadPromises = [...files].map(async (file) => {
      // 각 파일에 대해 비동기 업로드 처리
      const fileName = `${uuid()}_${file.name}`;
      const storage = await getStorageInstance();
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
    console.error(error);
    throw new Error("이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요.");
  }
};

export const deleteProfileImgToFirestore = async (
  profileDataImgName: string,
  prevImgDataImgName: string
) => {
  try {
    const firebaseStorage = await import("firebase/storage");
    const storage = await getStorageInstance();
    const { deleteObject, ref: storageRef } = firebaseStorage;

    if (!profileDataImgName || !prevImgDataImgName) return;
    if (profileDataImgName !== prevImgDataImgName) {
      await deleteObject(
        storageRef(storage, `images/profile/${prevImgDataImgName}`)
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteImgToFirestore = async (
  productDataImgName: string[],
  prevImgDataImgName: string[]
) => {
  const removeImgPromise = [];
  const firebaseStorage = await import("firebase/storage");
  const storage = await getStorageInstance();
  const { deleteObject, ref: storageRef } = firebaseStorage;
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

export const sendNotificationMessage = async (
  userId: string,
  message: string
) => {
  if (!userId) return;
  const firebaseDatabase = await import("firebase/database");
  const database = await getRealtimeDB();
  const { push, set, ref: databaseRef } = firebaseDatabase;
  const messageObj: Omit<NotificationMessageData, "id"> = {
    content: message,
    isRead: false,
    isNotification: false,
    timestamp: Date.now()
  };

  const messageRef = databaseRef(database, `notification/${userId}/messages`);

  const newMessageRef = push(messageRef);
  set(newMessageRef, messageObj);
};

export const getNotificationMessage = async ({
  userId,
  lastKey,
  limit = 10
}: {
  userId: string;
  lastKey?: unknown;
  limit?: number;
}): Promise<{
  messages: NotificationMessageData[];
  nextKey: string | null;
}> => {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { query, orderByKey, ref, endBefore, limitToLast, get } =
      firebaseDatabase;
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
    console.error(error);
    throw error;
  }
};

export const readyNotificationMessage = async ({
  userId,
  messageId
}: {
  userId: string;
  messageId: string;
}) => {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { update, ref, increment, get } = firebaseDatabase;
    const messageRef = ref(
      database,
      `notification/${userId}/messages/${messageId}`
    );

    const messageSnapshot = await get(messageRef);

    if (!messageSnapshot.exists()) {
      throw new Error("잘못된 접근이에요.");
    }

    const counterRef = ref(database, `notification/${userId}/counter`);

    await update(messageRef, { isRead: true });
    await update(counterRef, { unreadCount: increment(-1) });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNotificationMessage = async ({
  userId,
  messageId
}: {
  userId: string;
  messageId: string;
}) => {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { update, ref, increment, get, remove } = firebaseDatabase;
    const messageRef = ref(
      database,
      `notification/${userId}/messages/${messageId}`
    );
    const counterRef = ref(database, `notification/${userId}/counter`);

    const messageSnapshot = await get(messageRef);

    if (!messageSnapshot.exists()) {
      throw new Error("잘못된 접근이에요.");
    }

    if (messageSnapshot.val().isRead === false) {
      await update(counterRef, { unreadCount: increment(-1) });
    }

    await remove(messageRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const readAllNotificationMessage = async ({
  userId,
  endKey
}: {
  userId: string;
  endKey: string;
}) => {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { update, ref, increment, get, query, orderByKey, startAt } =
      firebaseDatabase;
    const messagesRef = query(
      ref(database, `notification/${userId}/messages`),
      orderByKey(),
      startAt(endKey)
    );
    const counterRef = ref(database, `notification/${userId}/counter`);

    const snapshot = await get(messagesRef);

    if (!snapshot.exists) {
      throw new Error("잘못된 접근이에요.");
    }

    const updates: DocumentData = {};
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
      unreadCount: increment(-unreadCountDecrease)
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAllNotificationMessage = async ({
  userId,
  endKey
}: {
  userId: string;
  endKey: string;
}) => {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { update, ref, increment, get, query, orderByKey, startAt } =
      firebaseDatabase;
    const messagesRef = query(
      ref(database, `notification/${userId}/messages`),
      orderByKey(),
      startAt(endKey)
    );
    const counterRef = ref(database, `notification/${userId}/counter`);

    const snapshot = await get(messagesRef);

    if (!snapshot.exists) {
      throw new Error("잘못된 접근이에요.");
    }

    const updates: DocumentData = {};
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
      const messagesRef = query(
        ref(database, `notification/${userId}/messages`)
      );
      const snapshot = await get(messagesRef);
      if (!snapshot.exists()) {
        await update(counterRef, {
          unreadCount: 0
        });
      } else {
        await update(counterRef, {
          unreadCount: increment(-unreadCountDecrease)
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const startChat = async ({
  productId,
  myUid,
  userId
}: {
  productId: string;
  myUid: string;
  userId: string;
}) => {
  try {
    const firestore = await import("firebase/firestore");
    const {
      query: firestoreQuery,
      where,
      getDocs,
      addDoc,
      doc,
      setDoc,
      arrayUnion,
      collection,
      serverTimestamp
    } = firestore;
    const firestoreDB = await getFirestoreDB();
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
      return { chatRoomId, isExistRoom: true };
    } else {
      // 새로운 채팅방 생성
      const newChatRoomData = {
        productId,
        participantIDs: [myUid, userId],
        createdAt: serverTimestamp(),
        lastMessage: null,
        newMessageCount: {
          [myUid]: 0,
          [userId]: 0
        },
        entered: {
          [myUid]: false,
          [userId]: false
        },
        isAlarm: {
          [myUid]: true,
          [userId]: true
        }
      };

      const docRef = await addDoc(chatRoomsRef, newChatRoomData);
      chatRoomId = docRef.id;

      // 사용자별 채팅방 ID 및 총 메세지 카운터 저장
      const userRef = doc(firestoreDB, "userChatInfo", userId);
      await setDoc(
        userRef,
        {
          chatRoomIds: arrayUnion(chatRoomId),
          totalMessageCount: 0
        },
        { merge: true }
      );

      const myRef = doc(firestoreDB, "userChatInfo", myUid);
      await setDoc(
        myRef,
        {
          chatRoomIds: arrayUnion(chatRoomId),
          totalMessageCount: 0
        },
        { merge: true }
      );

      return { chatRoomId, isExistRoom: false };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const enterChatRoom = async ({
  myUid,
  chatRoomId
}: {
  myUid: string;
  chatRoomId: string;
}) => {
  try {
    const firestoreDB = await getFirestoreDB();
    const firestore = await import("firebase/firestore");
    const {
      updateDoc,
      doc,
      getDoc,
      arrayUnion,
      increment: firestoreIncrement
    } = firestore;
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    const myChatInfoRef = doc(firestoreDB, `userChatInfo/${myUid}`);
    const chatRoomDoc = await getDoc(chatRoomRef);
    const data = chatRoomDoc.data();
    if (!chatRoomDoc.exists()) {
      throw new Error("존재하지 않는 채팅방이에요.");
    }
    if (data && myUid in data.entered) {
      await updateDoc(chatRoomRef, {
        [`entered.${myUid}`]: true
      });
    } else {
      throw new Error("잘못된 접근이에요.");
    }

    if (!data?.participantIDs.includes(myUid)) {
      await updateDoc(myChatInfoRef, { chatRoomIds: arrayUnion(chatRoomId) });
      await updateDoc(chatRoomRef, {
        participantIDs: arrayUnion(myUid)
      });
    }

    if (data && myUid in data.newMessageCount) {
      const messageCount = data?.newMessageCount[myUid];
      await updateDoc(myChatInfoRef, {
        totalMessageCount: firestoreIncrement(-messageCount || 0)
      });
      await updateDoc(chatRoomRef, {
        [`newMessageCount.${myUid}`]: 0
      });
    } else {
      throw new Error("잘못된 접근이에요.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const leaveChatRoom = async ({
  myUid,
  chatRoomId
}: {
  myUid: string;
  chatRoomId: string;
}) => {
  try {
    const firestoreDB = await getFirestoreDB();
    const firestore = await import("firebase/firestore");
    const { updateDoc, doc, getDoc } = firestore;
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    const chatRoomDoc = await getDoc(chatRoomRef);
    if (!chatRoomDoc.exists()) {
      throw new Error("존재하지 않는 채팅방이에요.");
    }
    const data = chatRoomDoc.data();
    if (data && myUid in data.entered) {
      await updateDoc(chatRoomRef, {
        [`entered.${myUid}`]: false
      });
    } else {
      throw new Error("잘못된 접근이에요.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendToChatMessage = async ({
  myUid,
  chatRoomId,
  message
}: {
  myUid: string;
  chatRoomId: string;
  message: string;
}) => {
  try {
    const firestoreDB = await getFirestoreDB();
    const firestore = await import("firebase/firestore");
    const {
      updateDoc,
      doc,
      getDoc,
      addDoc,
      collection,
      serverTimestamp,
      increment: firestoreIncrement
    } = firestore;
    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    const messagesCollectionRef = collection(chatRoomRef, "messages");
    const snapshot = await getDoc(chatRoomRef);
    const data = snapshot.data() as ChatRoomData;
    const userlist = Object.keys(data.entered);
    const userId = userlist.filter((id) => id !== myUid)[0];
    const userChatInfoRef = doc(firestoreDB, `userChatInfo/${userId}`);
    const chatRoomDoc = await getDoc(chatRoomRef);

    if (!chatRoomDoc.exists()) {
      throw new Error("존재하지 않는 채팅방이에요.");
    }

    if (!userlist.includes(myUid)) {
      throw new Error("잘못된 접근이에요.");
    }

    const messageObj = {
      content: message,
      timestamp: serverTimestamp(),
      senderId: myUid,
      isNotification: data.entered[userId] ? true : false
    };

    await addDoc(messagesCollectionRef, messageObj);

    const updateData: DocumentData = {
      lastMessage: messageObj
    };

    if (!data.entered[userId] && data.participantIDs.includes(userId)) {
      updateData[`newMessageCount.${userId}`] = firestoreIncrement(1);
      await updateDoc(userChatInfoRef, {
        totalMessageCount: firestoreIncrement(1)
      });
    }

    await updateDoc(chatRoomRef, updateData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const exitChatRoom = async ({
  myUid,
  chatRoomId
}: {
  myUid: string;
  chatRoomId: string;
}) => {
  try {
    const firestoreDB = await getFirestoreDB();
    const firestore = await import("firebase/firestore");
    const { updateDoc, doc, getDoc, arrayRemove } = firestore;
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
      participantIDs: arrayRemove(myUid)
    });
    await updateDoc(userChatInfoRef, {
      chatRoomIds: arrayRemove(chatRoomId)
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteChatRoom = async (chatRoomId: string) => {
  try {
    const firestoreDB = await getFirestoreDB();
    const firestore = await import("firebase/firestore");
    const { deleteDoc, doc, getDoc, getDocs, collection } = firestore;
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
    console.error(error);
    throw error;
  }
};
