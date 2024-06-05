import Image from "next/image";
import Link from "next/link";

export default function ChatRoomList() {
  return (
    <div>
      <h2 className="px-5 py-3 font-semibold text-lg">채팅</h2>
      <ul className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide p-5 max-h-[calc(100vh-185px)]">
        {["", "", ""].map((_, index) => (
          <li className="" key={index}>
            <Link
              href={`/chat/123`}
              className="relative w-full text-left flex items-center gap-3 before:absolute before:w-[11px] before:h-[11px] before:rounded-full before:bg-red-400 before:right-0 before:bottom-0 before:p-2 before:text-[11px] before:font-semibold before:inline-flex before:items-center before:justify-center before:content-['1'] before:text-white"
            >
              <Image
                className="rounded-xl"
                src={
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                }
                alt="Jon"
                width={40}
                height={40}
              />
              <div className="w-full">
                <div className="mb-1 flex justify-between items-center">
                  <span className="font-semibold text-sm">Jon</span>
                  <time
                    dateTime={new Date().toLocaleDateString()}
                    className="text-[10px] text-gray-400"
                  >
                    {new Date().toLocaleDateString()}
                  </time>
                </div>
                <p className="text-xs text-gray-400">어디서 거래 하시나요?</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
