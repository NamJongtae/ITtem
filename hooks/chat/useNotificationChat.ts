import { useEffect, useCallback } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestoreDB } from "@/lib/firebaseSetting";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { chatSlice } from "@/store/chatSlice";

export default function useNotificationChat() {
  const chatRoomIds = useSelector((state: RootState) => state.chat.chatRoomIds);
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!myUid) return;
    const chatRoomIdsRef = doc(firestoreDB, `chatRoomIds/${myUid}`);
    const unsubscribe = onSnapshot(chatRoomIdsRef, (snapshot) => {
      if (snapshot.exists()) {
        const ids = (snapshot.data() as { chatRoomIds: string[] }).chatRoomIds;
        dispatch(chatSlice.actions.saveChatRoomIds(ids));
      }
    });

    return () => unsubscribe();
  }, [myUid]);

  const subscribeToChatMessages = useCallback(() => {
    if (!myUid || chatRoomIds.length === 0) return;

    chatRoomIds.forEach(async (chatRoomId) => {
      const chatRoomRef = doc(firestoreDB, `chatRooms/${chatRoomId}`);
      const chatRoomSnapshot = await getDoc(chatRoomRef);

      if (chatRoomSnapshot.exists() && chatRoomSnapshot.data().isAlarm[myUid]) {
        const entered = chatRoomSnapshot.data().entered[myUid];
        if (entered === false) {
          const messagesRef = collection(
            firestoreDB,
            `chatRooms/${chatRoomId}/messages`
          );
          const messagesQuery = query(
            messagesRef,
            where("isNotification", "==", false)
          );

          onSnapshot(messagesQuery, (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
              if (change.type === "added") {
                const messageDoc = change.doc;
                const message = messageDoc.data();
                const messageRef = doc(
                  firestoreDB,
                  `chatRooms/${chatRoomId}/messages/${messageDoc.id}`
                );

                if (message.senderId !== myUid) {
                  toast.info(message.content);
                  await updateDoc(messageRef, { isNotification: true });
                }
              }
            });
          });
        }
      }
    });
  }, [chatRoomIds, myUid]);

  // 리스너 해제 함수
  const unsubscribeFromChatMessages = useCallback(() => {
    chatRoomIds.forEach((chatRoomId) => {
      const messagesRef = collection(
        firestoreDB,
        `chatRooms/${chatRoomId}/messages`
      );
      const unsubscribe = onSnapshot(messagesRef, () => {});
      unsubscribe();
    });
  }, [chatRoomIds]);

  useEffect(() => {
    if (myUid) {
      subscribeToChatMessages();
    }
    return () => {
      unsubscribeFromChatMessages();
    };
  }, [
    myUid,
    chatRoomIds,
    subscribeToChatMessages,
    unsubscribeFromChatMessages,
  ]);
}
