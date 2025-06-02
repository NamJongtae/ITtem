import { getFirestoreDB } from "../../../../shared/common/utils/firebaseSetting";

export default async function startChatInFirebase({
  productId,
  myUid,
  userId
}: {
  productId: string;
  myUid: string;
  userId: string;
}) {
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
    for (const doc of querySnapshot.docs) {
      const chatRoom = doc.data();
      if (chatRoom.participantIDs.includes(userId)) {
        chatRoomId = doc.id;
        break;
      }
    }

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
}
