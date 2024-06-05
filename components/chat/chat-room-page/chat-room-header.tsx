import Image from "next/image";
import ChatRoomMenu from "./chat-room-menu";
import { useRouter } from "next/router";

export default function ChatRoomHeader() {
  const router = useRouter();
  const onClickBack = () => {
    router.push("/chat");
  };
  return (
    <div className="flex items-center justify-between border-b px-5 py-3">
      <h2 className="text-lg flex gap-3 items-center">
        {
          <button onClick={onClickBack}>
            <Image
              className="rotate-180"
              src={"/icons/arrow_icon.svg"}
              alt="뒤로가기"
              width={14}
              height={20}
            />
          </button>
        }
        <Image
          className="rounded-full w-10 h-10 bg-center"
          src={
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="가방"
          width={40}
          height={40}
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm line-clamp-1">
              깨끗한 사용감 없는 가방 팝니다.
            </span>
          </div>
          <span className="block text-xs font-semibold text-gray-400">
            200,000원
          </span>
        </div>
      </h2>
      <ChatRoomMenu />
    </div>
  );
}
