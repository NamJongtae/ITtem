import { NotificationMessageData } from "@/domains/notification/types/notificationTypes";
import { getRealtimeDB } from "../../../shared/common/utils/firebaseSetting";

export default async function getNotificationMessageInFirebase({
  userId,
  lastKey,
  limit = 10
}: {
  userId: string;
  lastKey?: unknown;
  limit?: number;
}): Promise<{
  messages: NotificationMessageData[];
  nextKey: string | null;
}> {
  try {
    const database = await getRealtimeDB();
    const firebaseDatabase = await import("firebase/database");
    const { query, orderByKey, ref, endBefore, limitToLast, get } =
      firebaseDatabase;
    const messagesRef = lastKey
      ? query(
          ref(database, `notification/${userId}/messages`),
          orderByKey(),
          endBefore(lastKey as string),
          limitToLast(limit)
        )
      : query(
          ref(database, `notification/${userId}/messages`),
          orderByKey(),
          limitToLast(limit)
        );

    const snapshot = await get(messagesRef);

    const data = snapshot.val();

    if (!data) return { messages: [], nextKey: null };

    const keys = Object.keys(data);
    const messages = keys.map((key) => ({ id: key, ...data[key] })).reverse();

    const nextKey =
      messages.length >= limit ? messages[messages.length - 1].id : null;

    return { messages, nextKey };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
