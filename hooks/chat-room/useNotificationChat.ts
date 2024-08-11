import { useEffect } from "react";
import { getFirestoreDB } from "@/lib/firebaseSetting";
import useAuthStore from "@/store/auth-store";
import useChatStore from "@/store/chat-store";

export default function useNotificationChat() {
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid;
  const actions = useChatStore((state) => state.actions);

  useEffect(() => {
    if (!myUid) return;

    let unsubscribe: any;

    const loadFirebase = async () => {
      const firestoreDB = await getFirestoreDB();
      const { doc, onSnapshot } = await import("firebase/firestore");

      const chatRoomIdsRef = doc(firestoreDB, `userChatInfo/${myUid}`);
      actions.setChatRoomIdsLoading(true);

      unsubscribe = onSnapshot(chatRoomIdsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const ids = data.chatRoomIds;
          const totalMessageCount = data.totalMessageCount;

          actions.saveChatRoomIds(ids);
          actions.setTotalMessageCount(totalMessageCount);
        }
        actions.setChatRoomIdsLoading(false);
      });
    };

    loadFirebase();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [myUid, actions]);
}
