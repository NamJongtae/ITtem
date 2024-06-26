import { useCallback, useEffect, useRef, useState } from "react";
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
import useEnterChatRoomMutate from "../reactQuery/mutations/chat/useEnterChatRoomMutate";
import { isAxiosError } from "axios";
import useLeaveChatRoomMutate from "../reactQuery/mutations/chat/useLeaveChatRoomMutate";

export default function useChatRoomPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;

  const [isExit, setIsExit] = useState(false);
  const [chatData, setChatData] = useState<ChatRoomData | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { chatRoomId } = router.query;

  const { enterChatRoomMutate } = useEnterChatRoomMutate();
  const { leaveChatRoomMutate } = useLeaveChatRoomMutate();

  const handleChatRoomExit = useCallback(() => {
    setIsExit(true);
  }, []);

  const resetChatRoomExit = useCallback(() => {
    setIsExit(false);
  }, []);

  const chatListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!chatRoomId || !myUid || isExit) return;

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
  }, [chatRoomId, myUid, isExit]);

  return {
    chatData,
    messages,
    isLoading,
    handleChatRoomExit,
    resetChatRoomExit,
    chatListRef,
  };
}
