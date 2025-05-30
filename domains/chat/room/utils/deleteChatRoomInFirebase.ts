import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

export default async function deleteChatRoomInFirebase(chatRoomId: string) {
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
}
