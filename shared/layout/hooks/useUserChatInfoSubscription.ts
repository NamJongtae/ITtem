import { useEffect } from "react";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useChatStore from "@/domains/chat/shared/store/chatStore";
import { Unsubscribe } from "firebase/database";

export default function useUserChatInfoSubscription() {
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid;
  const actions = useChatStore((state) => state.actions);

  useEffect(
    function subscribeToUserChatInfo() {
      if (!myUid) return;

      let unsubscribe: Unsubscribe | undefined;

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
    },
    [myUid, actions]
  );
}
