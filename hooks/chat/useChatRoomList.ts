import { firestoreDB } from "@/lib/firebaseSetting";
import { RootState } from "@/store/store";
import { ChatRoomData } from "@/types/chatTypes";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useChatRoomList() {
  const chatRoomIds = useSelector((state: RootState) => state.chat.chatRoomIds);
  const [chatRoomData, setChatRoomData] = useState<{
    [key: string]: ChatRoomData;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (chatRoomIds.length === 0) {
      setIsLoading(false);
      return;
    }

    const unsubscribes = chatRoomIds.map((chatRoomId) => {
      const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
      return onSnapshot(chatRoomRef, (snapshot) => {
        const data = snapshot.data() as ChatRoomData;
        setChatRoomData((prevData) => ({
          ...prevData,
          [snapshot.id]: {
            ...data,
          },
        }));
        setIsLoading(false);
      });
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [chatRoomIds]);

  return { chatRoomData, isLoading };
}
