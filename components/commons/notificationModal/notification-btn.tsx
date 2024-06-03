import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import NotificationDeleteAllBtn from "./notification-delete-all-btn";
import NotificationReadAllBtn from "./notification-read-all-btn";
import { NotificationMessageData } from "@/types/notification";

export default function NotificationBtn() {
  const queryClient = useQueryClient();
  const notificationMessagesData = queryClient.getQueryData([
    "notification",
  ]) as
    | InfiniteData<{
        messages: NotificationMessageData[];
        nextKey: string | null;
      }>
    | undefined;

  const messageData = notificationMessagesData?.pages
    .map((data) => data.messages)
    .flat();

  return (
    <div className="flex gap-2">
      <NotificationReadAllBtn messageData={messageData} />
      <NotificationDeleteAllBtn messageData={messageData} />
    </div>
  );
}
