import NotificationDeleteAllBtn from "./notification-delete-all-btn";
import NotificationReadAllBtn from "./notification-read-all-btn";
import { NotificationMessageData } from "@/types/notification";

interface IProps {
  messageData: NotificationMessageData[];
  endKey: string;
}

export default function NotificationBtn({
  messageData,
  endKey,
}: IProps) {
  return (
    <div className="flex gap-2 justify-end mt-2 mr-2">
      <NotificationReadAllBtn
        messageData={messageData}
        endKey={endKey}
      />
      <NotificationDeleteAllBtn
        messageData={messageData}
        endKey={endKey}
      />
    </div>
  );
}
