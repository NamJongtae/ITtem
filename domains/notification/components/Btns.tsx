import DeleteAllBtn from "./DeleteAllBtn";
import ReadAllBtn from "./ReadAllBtn";
import { NotificationMessageData } from "../types/notificationTypes";

interface IProps {
  messageData: NotificationMessageData[];
  lastMessageKey: string;
}

export default function Btns({
  messageData,
  lastMessageKey
}: IProps) {
  return (
    <div className="flex gap-2 justify-end mt-2 mr-2">
      <ReadAllBtn messageData={messageData} lastMessageKey={lastMessageKey} />
      <DeleteAllBtn messageData={messageData} lastMessageKey={lastMessageKey} />
    </div>
  );
}
