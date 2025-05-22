import Image from "next/image";
import ChatRoomMenu from "./chat-room-menu";
import ChatRoomHeaderProduct from "./chat-room-header-product";
import useRouterBackToCloseModal from "@/hooks/useRouterBackToCloseModal";

interface IProps {
  productId: string;
  participantIDs: string[];
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function ChatRoomHeader({
  productId,
  participantIDs,
  handleChatRoomExit,
  resetChatRoomExit
}: IProps) {
  const { closeModalHandler } = useRouterBackToCloseModal();

  return (
    <div className="flex items-center justify-between border-b px-5 py-3 min-h-[65px]">
      <h2 className="text-lg flex gap-3 items-center">
        {
          <button onClick={closeModalHandler}>
            <Image
              className="rotate-180"
              src={"/icons/arrow-icon.svg"}
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
