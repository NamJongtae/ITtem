import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

export default async function exitChatRoomInFirebase({
  myUid,
  chatRoomId
}: {
  myUid: string;
  chatRoomId: string;
}) {
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
}
