import { getRealtimeDB } from "../../../shared/common/utils/firebaseSetting";

export default async function readyNotificationMessageInFirebase({
  userId,
  messageId
}: {
  userId: string;
  messageId: string;
}) {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { update, ref, increment, get } = firebaseDatabase;
    const messageRef = ref(
      database,
      `notification/${userId}/messages/${messageId}`
    );

    const messageSnapshot = await get(messageRef);

    if (!messageSnapshot.exists()) {
      throw new Error("잘못된 접근이에요.");
    }

    const counterRef = ref(database, `notification/${userId}/counter`);

    await update(messageRef, { isRead: true });
    await update(counterRef, { unreadCount: increment(-1) });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
