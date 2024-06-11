import Image from "next/image";
import ChatRoomMenu from "./chat-room-menu";
import { useRouter } from "next/router";
import ChatRoomHeaderProduct from "./chat-room-header-product";

interface IProps {
  productId: string;
  participantIDs:string[];
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function ChatRoomHeader({
  productId,
  participantIDs,
  handleChatRoomExit,
  resetChatRoomExit,
}: IProps) {
  const router = useRouter();
  const onClickBack = () => {
    router.push("/chat");
  };

  return (
    <div className="flex items-center justify-between border-b px-5 py-3 min-h-[65px]">
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
        <ChatRoomHeaderProduct productId={productId} />
      </h2>
      <ChatRoomMenu
        participantIDs={participantIDs}
        handleChatRoomExit={handleChatRoomExit}
        resetChatRoomExit={resetChatRoomExit}
      />
    </div>
  );
}
