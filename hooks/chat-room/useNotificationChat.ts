import { useEffect } from "react";
import { getFirestoreDB } from "@/lib/firebaseSetting";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { chatSlice } from "@/store/slice/chat-slice";

export default function useNotificationChat() {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!myUid) return;

    let unsubscribe: any;

    const loadFirebase = async () => {
      const firestoreDB = await getFirestoreDB();
      const { doc, onSnapshot } = await import("firebase/firestore");

      const chatRoomIdsRef = doc(firestoreDB, `userChatInfo/${myUid}`);
      dispatch(chatSlice.actions.setChatRoomIdsLoading(true));

      unsubscribe = onSnapshot(chatRoomIdsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const ids = data.chatRoomIds;
          const totalMessageCount = data.totalMessageCount;

          dispatch(chatSlice.actions.saveChatRoomIds(ids));
          dispatch(chatSlice.actions.saveTotalMessageCount(totalMessageCount));
        }
        dispatch(chatSlice.actions.setChatRoomIdsLoading(false));
      });
    };

    loadFirebase();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [myUid, dispatch]);
}
