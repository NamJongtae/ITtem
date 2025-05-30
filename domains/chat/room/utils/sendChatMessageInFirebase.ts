import { ChatRoomData } from "@/domains/chat/room/types/chatRoomTypes";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";
import { DocumentData } from "firebase/firestore";

export default async function sendToChatMessageInFirebase({
  myUid,
  chatRoomId,
  message
}: {
  myUid: string;
  chatRoomId: string;
  message: string;
}) {
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
}
