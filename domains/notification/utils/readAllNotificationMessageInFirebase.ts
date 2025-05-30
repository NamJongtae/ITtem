import { DocumentData } from "firebase/firestore";
import { getRealtimeDB } from "../../../shared/common/utils/firebaseSetting";

export default async function readAllNotificationMessageInFirebase({
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
      if (key) {
        updates[`notification/${userId}/messages/${key}/isRead`] = true;
        unreadCountDecrease++;
      }
    });

    await update(ref(database), updates);
    await update(counterRef, {
      unreadCount: increment(-unreadCountDecrease)
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
