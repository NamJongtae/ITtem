import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";
import { Unsubscribe } from "firebase/database";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useJoinChatRoomMutate from "./mutations/useJoinChatRoomMutate";
import useLeaveChatRoomMutate from "./mutations/useLeaveChatRoomMutate";
import { useRouter, useParams } from "next/navigation";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ChatMessageData, ChatRoomData } from "../types/chatRoomTypes";

interface IParams {
  isExit: boolean;
  setChatData: Dispatch<SetStateAction<ChatRoomData | null>>;
  setMessages: Dispatch<SetStateAction<ChatMessageData[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function useChatRoomSubscription({
  isExit,
  setChatData,
  setMessages,
  setIsLoading
}: IParams) {
  const [isJoin, setIsJoin] = useState(false);

  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid;

  const router = useRouter();
  const params = useParams();
  const { chatRoomId } = params;

  const { joinChatRoomMutate } = useJoinChatRoomMutate();
  const { leaveChatRoomMutate } = useLeaveChatRoomMutate();

  useEffect(() => {
    if (!chatRoomId || !myUid || isExit) return;

    const joinRoom = async () => {
      try {
        await joinChatRoomMutate(chatRoomId as string);
        setIsJoin(true);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.warn(error.response?.data.message);
          router.push("/chat");
        }
        setIsJoin(false);
      }
    };

    joinRoom();

    return () => {
      leaveChatRoomMutate(chatRoomId as string);
    };
  }, [
    chatRoomId,
    myUid,
    isExit,
    joinChatRoomMutate,
    router,
    leaveChatRoomMutate
  ]);

  useEffect(() => {
    if (!isJoin) return;

    let unsubscribeChatRoom: Unsubscribe | undefined;

    const subscribeChatRoom = async () => {
      const firestoreDB = await getFirestoreDB();
      const { doc, onSnapshot } = await import("firebase/firestore");

      const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);

      unsubscribeChatRoom = onSnapshot(chatRoomRef, (docSnapshot) => {
        const data = docSnapshot.data() as ChatRoomData | null;
        if (!data || !(myUid || "" in data.entered)) {
          router.push("/chat");
          return;
        }
        setChatData(data);
        setIsLoading(false);
      });
    };

    subscribeChatRoom();

    return () => {
      unsubscribeChatRoom?.();
    };
  }, [isJoin, chatRoomId, myUid, router, setChatData, setIsLoading]);

  useEffect(() => {
    if (!isJoin) return;

    let unsubscribeMessages: Unsubscribe | undefined;

    const subscribeMessages = async () => {
      const firestoreDB = await getFirestoreDB();
      const { collection, onSnapshot, orderBy, query, doc } = await import(
        "firebase/firestore"
      );

      const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
      const messagesRef = collection(chatRoomRef, "messages");
      const messagesQuery = query(
        messagesRef,
        orderBy("timestamp", "asc"),
        orderBy("__name__", "asc")
      );

      unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const messageData = change.doc.data() as ChatMessageData;
            setMessages((prev) => [...prev, messageData]);
          }
        });
      });
    };

    subscribeMessages();

    return () => {
      unsubscribeMessages?.();
    };
  }, [isJoin, chatRoomId, setMessages]);
}
