import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

export default async function leaveChatRoomInFirebase({
  myUid,
  chatRoomId
}: {
  myUid: string;
  chatRoomId: string;
}) {
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
}
