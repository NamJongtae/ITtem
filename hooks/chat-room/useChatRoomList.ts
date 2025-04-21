import { getFirestoreDB } from "@/lib/firebaseSetting";
import useChatStore from "@/store/chat-store";
import { ChatRoomData } from "@/types/chat-types";
import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from "react";

export default function useChatRoomList() {
  const chatRoomIds = useChatStore((state) => state.chatRoomIds);
  const chatRoodIdsLoading = useChatStore((state) => state.chatRoomIdsLoading);
  const [chatRoomData, setChatRoomData] = useState<{
    [key: string]: ChatRoomData;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!chatRoodIdsLoading && chatRoomIds.length === 0) {
      setIsLoading(false);
      return;
    }

    let unsubscribes: Unsubscribe[] = [];

    const loadFirebase = async () => {
      const firestoreDB = await getFirestoreDB();
      const { doc, onSnapshot } = await import("firebase/firestore");

      unsubscribes = chatRoomIds.map((chatRoomId) => {
        const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
        return onSnapshot(chatRoomRef, (snapshot) => {
          const data = snapshot.data() as ChatRoomData;
          if (data.lastMessage) {
            setChatRoomData((prevData) => ({
              ...prevData,
              [snapshot.id]: {
                ...data
              }
            }));
          }

          setIsLoading(false);
        });
      });
    };

    loadFirebase();

    return () => {
      unsubscribes.forEach((unsubscribe) => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, [chatRoodIdsLoading, chatRoomIds, setChatRoomData, setIsLoading]);

  return { chatRoomData, isLoading };
}
