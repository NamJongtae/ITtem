import { getFirestoreDB } from "@/lib/firebaseSetting";
import useChatStore from "@/store/chat-store";
import { ChatRoomData } from "@/types/chat-types";
import { Unsubscribe } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useChatRoomListLogic() {
  const chatRoomIds = useChatStore((state) => state.chatRoomIds);
  const chatRoomIdsLoading = useChatStore((state) => state.chatRoomIdsLoading);
  const [chatRoomData, setChatRoomData] = useState<{
    [key: string]: ChatRoomData;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (chatRoomIdsLoading) return;

    if (chatRoomIds.length === 0) {
      setIsLoading(false);
      return;
    }

    const unsubscribeList: Unsubscribe[] = [];

    const subscribeToChatRooms = async () => {
      try {
        const firestoreDB = await getFirestoreDB();
        const { doc, onSnapshot } = await import("firebase/firestore");

        await Promise.all(
          chatRoomIds.map((chatRoomId) => {
            const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);

            const unsubscribe = onSnapshot(chatRoomRef, (snapshot) => {
              const data = snapshot.data() as ChatRoomData;
              if (data?.lastMessage) {
                setChatRoomData((prev) => ({
                  ...prev,
                  [snapshot.id]: { ...data }
                }));
              }
            });

            if (typeof unsubscribe === "function") {
              unsubscribeList.push(unsubscribe);
            }
          })
        );

        setIsLoading(false);
      } catch (error) {
        console.error("채팅방 구독 중 오류 발생:", error);
        setIsLoading(false);
      }
    };

    subscribeToChatRooms();

    return () => {
      unsubscribeList.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      });
    };
  }, [chatRoomIdsLoading, chatRoomIds]);

  return { chatRoomData, isLoading };
}
