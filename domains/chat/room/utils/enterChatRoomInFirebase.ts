import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

export default async function enterChatRoomInFirebase({
  myUid,
  chatRoomId
}: {
  myUid: string;
  chatRoomId: string;
}) {
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
}
