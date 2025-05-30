import { DocumentData } from "firebase/firestore";
import { getRealtimeDB } from "../../../shared/common/utils/firebaseSetting";

export default async function deleteAllNotificationMessageInFirebase({
  userId,
  endKey
}: {
  userId: string;
  endKey: string;
}) {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { update, ref, increment, get, query, orderByKey, startAt } =
      firebaseDatabase;
    const messagesRef = query(
      ref(database, `notification/${userId}/messages`),
      orderByKey(),
      startAt(endKey)
    );
    const counterRef = ref(database, `notification/${userId}/counter`);

    const snapshot = await get(messagesRef);

    if (!snapshot.exists) {
      throw new Error("잘못된 접근이에요.");
    }

    const updates: DocumentData = {};
    let unreadCountDecrease = 0;

    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const isRead = childSnapshot.val().isRead;
      if (key) {
        updates[`notification/${userId}/messages/${key}`] = null;
        if (!isRead) {
          unreadCountDecrease++;
        }
      }
    });

    await update(ref(database), updates);

    if (unreadCountDecrease > 0) {
      const messagesRef = query(
        ref(database, `notification/${userId}/messages`)
      );
      const snapshot = await get(messagesRef);
      if (!snapshot.exists()) {
        await update(counterRef, {
          unreadCount: 0
        });
      } else {
        await update(counterRef, {
          unreadCount: increment(-unreadCountDecrease)
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
