import getProductDateFormat from "@/domains/product/shared/utils/getProductDateFormat";
import { NotificationMessageData } from "../types/notificationTypes";
import ReadBtn from "./ReadBtn";
import DeleteBtn from "./DeleteBtn";

interface IProps {
  data: NotificationMessageData;
}

export default function Item({ data }: IProps) {
  return (
    <div className="text-xs" key={data?.id}>
      <time className="text-[11px] mb-1 inline-block ml-1 text-gray-500">
        {getProductDateFormat((data?.timestamp as string) || "")}
      </time>
      <p
        className={`${
          !data?.isRead && "bg-indigo-100"
        } border-2 border-blue-200 rounded-md w-full p-2 transition-all duration-200 whitespace-pre-wrap`}
      >
        {data?.content}
      </p>
      <div className="flex justify-end">
        <ReadBtn messageId={data.id} isRead={data.isRead} />
        <DeleteBtn messageId={data.id} />
      </div>
    </div>
  );
}
