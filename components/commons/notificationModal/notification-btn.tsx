import NotificationDeleteAllBtn from "./notification-delete-all-btn";
import NotificationReadAllBtn from "./notification-read-all-btn";
import { NotificationMessageData } from "@/types/notification";

interface IProps {
  messageData: NotificationMessageData[];
}

export default function NotificationBtn({ messageData }: IProps) {
  return (
    <div className="flex gap-2 justify-end mt-2 mr-2">
      <NotificationReadAllBtn messageData={messageData} />
      <NotificationDeleteAllBtn messageData={messageData} />
    </div>
  );
}
