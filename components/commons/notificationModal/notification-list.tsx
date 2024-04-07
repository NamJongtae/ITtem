import React from "react";

export default function NotificationList() {
  const DATA = [
    {
      message: "확인하지 않은 구매요청이 있습니다.",
      date: "2024.03.24",
      read: false,
    },
    {
      message: "구매자가 물품을 인수했습니다.",
      date: "2024.03.23",
      read: false,
    },
    {
      message: "구매가 취소되었습니다.",
      date: "2024.03.22",
      read: true,
    },
  ];

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!e.currentTarget) return;
    e.currentTarget.parentElement?.classList.add("animate-slideFadeOutRight");
  };

  const onClickRead = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!e.currentTarget) return;
  };

  return (
    <ul className="flex flex-col w-full overflow-y-scroll scrollbar-hide max-h-[345px] p-5 pt-2">
      {DATA.map((data) => (
        <li className="text-xs" key={data.message}>
          <time className="text-[11px] mb-1 inline-block ml-1 text-gray-500">
            {data.date}
          </time>
          <p
            className={`${
              !data.read && "bg-indigo-100"
            } border-2 border-blue-200 rounded-md w-full p-2 transition-all duration-200`}
          >
            {data.message}
          </p>
          <button
            onClick={onClickDelete}
            className="float-end mt-1 mr-1 text-[11px]"
          >
            삭제
          </button>
          {!data.read && (
            <button
              onClick={onClickRead}
              className="float-end mt-1 mr-1 text-[11px]"
            >
              읽음
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
