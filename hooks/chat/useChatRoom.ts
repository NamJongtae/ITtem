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
} from "firebase/firestore";
import { toast } from "react-toastify";
import useEnterChatRoomMutate from "../querys/useEnterChatRoomMutate";
import { isAxiosError } from "axios";
import useLeaveChatRoomMutate from "../querys/useLeaveChatRoomMutate";
import useResetMessageCountMutate from "../querys/useResetMessageCountMutate";

export default function useChatRoom() {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;

  const [chatData, setChatData] = useState<ChatRoomData | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { chatRoomId } = router.query;

  const { enterChatRoomMutate } = useEnterChatRoomMutate();
  const { leaveChatRoomMutate } = useLeaveChatRoomMutate();
  const { resetChatMessageCountMutate } = useResetMessageCountMutate();

  useEffect(() => {
    if (!chatRoomId || !myUid) return;

    const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);

    const enterChatRoom = async () => {
      try {
        await enterChatRoomMutate(chatRoomId as string);
      } catch (error) {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
          router.push("/chat");
          return;
        }
      }
    };

    enterChatRoom();

    const unsubscribeChatRoom = onSnapshot(chatRoomRef, (doc) => {
      const data = doc.data() as ChatRoomData | null;
      if (data) {
        data.participantIDs;
        if (!(myUid in data.entered)) {
          router.push("/chat");
          return;
        }
        setChatData(data);
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

      resetChatMessageCountMutate(chatRoomId as string);
    });

    return () => {
      const leaveChatRoom = async () => {
        try {
          await leaveChatRoomMutate(chatRoomId as string);
        } catch (error) {
          return;
        }
      };
      leaveChatRoom();
      unsubscribeChatRoom();
      unsubscribeMessages();
    };
  }, [chatRoomId, myUid]);

  return { chatData, messages, isLoading };
}
