import NotificationModalDeleteAllBtn from "./notification-modal-delete-all-btn";
import NotificationModalReadAllBtn from "./notification-modal-read-all-btn";
import { NotificationMessageData } from "@/types/notification";

interface IProps {
  messageData: NotificationMessageData[];
  endKey: string;
}

export default function NotificationModalBtns({ messageData, endKey }: IProps) {
  return (
    <div className="flex gap-2 justify-end mt-2 mr-2">
      <NotificationModalReadAllBtn messageData={messageData} endKey={endKey} />
      <NotificationModalDeleteAllBtn messageData={messageData} endKey={endKey} />
    </div>
  );
}
