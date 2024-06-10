import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "@/lib/firebaseSetting";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { chatSlice } from "@/store/chatSlice";

export default function useNotificationChat() {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!myUid) return;
    const chatRoomIdsRef = doc(firestoreDB, `userChatInfo/${myUid}`);
    const unsubscribe = onSnapshot(chatRoomIdsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const ids = data.chatRoomIds;
        const totalMessageCount = data.totalMessageCount;
        dispatch(chatSlice.actions.saveChatRoomIds(ids));
        dispatch(chatSlice.actions.saveTotalMessageCount(totalMessageCount));
      }
    });

    return () => unsubscribe();
  }, [myUid]);
}
