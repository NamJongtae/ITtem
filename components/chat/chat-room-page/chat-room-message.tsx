import Image from "next/image";

export default function ChatRoomMessage() {
  return (
    <ul className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide w-full max-h-[calc(100vh-213px)] p-5">
      {/* 상대방 */}
      <li className="flex items-center gap-3">
        <Image
          className="rounded-xl self-start"
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
          }
          alt="Jon"
          width={40}
          height={40}
        />
        <div>
          <span className="text-md font-semibold">Jon</span>
          <div className="flex items-end gap-2">
            <p className="max-w-[170px] text-sm border py-1 px-3 rounded-lg rounded-tl-none bg-blue-600 text-white break-words">
              어디서 거래 하시나요?
            </p>
            <time className="text-[10px] text-gray-400">1일 전</time>
          </div>
        </div>
      </li>

      {/* 자신 */}
      <li className="self-end flex items-center gap-3">
        <div className="flex items-end flex-row-reverse gap-2">
          <p className="text-sm border py-1 px-3 rounded-lg rounded-tr-none bg-gray-200 text-black">
            안녕하세요
          </p>
          <time className="text-[10px] text-gray-400">1일 전</time>
        </div>
      </li>
    </ul>
  );
}
