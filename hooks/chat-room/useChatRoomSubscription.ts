import { getFirestoreDB } from "@/lib/firebaseSetting";
import { Unsubscribe } from "firebase/database";
import { Dispatch, SetStateAction, useEffect } from "react";
import useJoinChatRoomMutate from "../react-query/mutations/chat/useJoinChatRoomMutate";
import useLeaveChatRoomMutate from "../react-query/mutations/chat/useLeaveChatRoomMutate";
import { useRouter, useParams } from "next/navigation";
import useAuthStore from "@/store/auth-store";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ChatMessageData, ChatRoomData } from "@/types/chat-types";

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
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid;

  const router = useRouter();
  const params = useParams();
  const { chatRoomId } = params;

  const { joinChatRoomMutate } = useJoinChatRoomMutate();
  const { leaveChatRoomMutate } = useLeaveChatRoomMutate();

  useEffect(
    function subscribeToChatRoom() {
      if (!chatRoomId || !myUid || isExit) return;

      let unsubscribeChatRoom: Unsubscribe | undefined;
      let unsubscribeMessages: Unsubscribe | undefined;

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
            console.error(error);
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
    },
    [chatRoomId, myUid, isExit]
  );
}
