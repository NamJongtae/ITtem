import { getDateFormat } from "@/lib/getDateFormate";
import { NotificationMessageData } from "@/types/notification";

interface IProps {
  data: NotificationMessageData;
  onClickDelete: () => void;
  onClickRead: () => void;
}

export default function NotificationItem({
  data,
  onClickDelete,
  onClickRead,
}: IProps) {
  return (
    <li className="text-xs" key={data?.id}>
      <time className="text-[11px] mb-1 inline-block ml-1 text-gray-500">
        {getDateFormat((data?.timestamp as string) || "")}
      </time>
      <p
        className={`${
          !data?.isRead && "bg-indigo-100"
        } border-2 border-blue-200 rounded-md w-full p-2 transition-all duration-200 whitespace-pre-wrap`}
      >
        {data?.content}
      </p>
      <button
        onClick={onClickDelete}
        className="float-end mt-1 mr-1 text-[11px]"
      >
        삭제
      </button>
      {!data?.isRead && (
        <button
          onClick={onClickRead}
          className="float-end mt-1 mr-1 text-[11px]"
        >
          읽음
        </button>
      )}
    </li>
  );
}
