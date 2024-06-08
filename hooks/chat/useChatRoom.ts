import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { firestoreDB } from "@/lib/firebaseSetting";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ChatMessageData, ChatRoomData } from "@/types/chatTypes";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

export default function useChatRoom() {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;

  const [chatData, setChatData] = useState<ChatRoomData | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { chatRoomId } = router.query;

  function enterChatRoom({
    myUid,
    chatRoomId,
  }: {
    myUid: string;
    chatRoomId: string;
  }) {
    const enteredRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    updateDoc(enteredRef, {
      [`entered.${myUid}`]: true,
    });
  }

  function leaveChatRoom({
    myUid,
    chatRoomId,
  }: {
    myUid: string;
    chatRoomId: string;
  }) {
    const enteredRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    updateDoc(enteredRef, {
      [`entered.${myUid}`]: false,
    });
  }

  useEffect(() => {
    if (!chatRoomId || !myUid) return;

    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
    enterChatRoom({ myUid, chatRoomId: chatRoomId as string });

    const unsubscribeChatRoom = onSnapshot(chatRoomRef, (doc) => {
      const data = doc.data();
      if (data) {
        setChatData(data as ChatRoomData);
        setIsLoading(false);
      }
    });

    const messagesCollectionRef = collection(chatRoomRef, "messages");
    const messagesQuery = query(
      messagesCollectionRef,
      orderBy("timestamp", "asc"),
      orderBy("__name__", "asc")
    );
    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const messageData = change.doc.data() as ChatMessageData;
          setMessages((prevData) => [...prevData, messageData]);
        }
      });

      updateDoc(chatRoomRef, { [`newMessageCount.${myUid}`]: 0 });
    });

    return () => {
      leaveChatRoom({ myUid, chatRoomId: chatRoomId as string });
      unsubscribeChatRoom();
      unsubscribeMessages();
    };
  }, [chatRoomId, myUid]);

  return { chatData, messages, isLoading }; 
}
