import { NotificationMessageData } from "@/domains/notification/types/notificationTypes";
import { getRealtimeDB } from "../../../shared/common/utils/firebaseSetting";

export default async function sendNotificationMessageInFirebase(
  userId: string,
  message: string
) {
  if (!userId) return;
  const firebaseDatabase = await import("firebase/database");
  const database = await getRealtimeDB();
  const { push, set, ref: databaseRef } = firebaseDatabase;
  const messageObj: Omit<NotificationMessageData, "id"> = {
    content: message,
    isRead: false,
    isNotification: false,
    timestamp: Date.now()
  };

  const messageRef = databaseRef(database, `notification/${userId}/messages`);

  const newMessageRef = push(messageRef);
  set(newMessageRef, messageObj);
}
