import { getRealtimeDB } from "../../../shared/common/utils/firebaseSetting";

export default async function deleteNotificationMessageInFirebase({
  userId,
  messageId
}: {
  userId: string;
  messageId: string;
}) {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { update, ref, increment, get, remove } = firebaseDatabase;
    const messageRef = ref(
      database,
      `notification/${userId}/messages/${messageId}`
    );
    const counterRef = ref(database, `notification/${userId}/counter`);

    const messageSnapshot = await get(messageRef);

    if (!messageSnapshot.exists()) {
      throw new Error("잘못된 접근이에요.");
    }

    if (messageSnapshot.val().isRead === false) {
      await update(counterRef, { unreadCount: increment(-1) });
    }

    await remove(messageRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
