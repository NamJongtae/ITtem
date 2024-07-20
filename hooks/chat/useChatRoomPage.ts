import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ChatMessageData, ChatRoomData } from "@/types/chatTypes";

import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import useLeaveChatRoomMutate from "../reactQuery/mutations/chat/useLeaveChatRoomMutate";
import { getFirestoreDB } from "@/lib/firebaseSetting";
import useJoinChatRoomMutate from "../reactQuery/mutations/chat/useJoinChatRoomMutate";

export default function useChatRoomPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;

  const [isExit, setIsExit] = useState(false);
  const [chatData, setChatData] = useState<ChatRoomData | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();
  const { chatRoomId } = params;

  const { joinChatRoomMutate } = useJoinChatRoomMutate();
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

    let unsubscribeChatRoom: any;
    let unsubscribeMessages: any;

    const loadFirebase = async () => {
      const firestoreDB = await getFirestoreDB();
      const { collection, doc, onSnapshot, orderBy, query } = await import(
        "firebase/firestore"
      );
      const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);

      const joinChatRoom = async () => {
        try {
          await joinChatRoomMutate(chatRoomId as string);
        } catch (error) {
          if (isAxiosError(error)) {
            toast.warn(error.response?.data.message);
            router.push("/chat");
            return;
          }
        }
      };

      await joinChatRoom();

      unsubscribeChatRoom = onSnapshot(chatRoomRef, (doc) => {
        const data = doc.data() as ChatRoomData | null;
        if (data) {
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

      unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const messageData = change.doc.data() as ChatMessageData;
            setMessages((prevData) => [...prevData, messageData]);
          }
        });
      });
    };

    loadFirebase();

    return () => {
      const leaveChatRoom = async () => {
        try {
          await leaveChatRoomMutate(chatRoomId as string);
        } catch (error) {
          // 오류 처리 필요 시 추가
        }
      };

      leaveChatRoom();

      if (unsubscribeChatRoom) {
        unsubscribeChatRoom();
      }
      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
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
