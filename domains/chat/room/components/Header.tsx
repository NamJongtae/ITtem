import Image from "next/image";
import SlideMenu from "./SlideMenu";
import HeaderProduct from "./HeaderProduct";
import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";

interface IProps {
  productId: string;
  participantIDs: string[];
  handleChatRoomExit: () => void;
  resetChatRoomExit: () => void;
}

export default function Header({
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
        <HeaderProduct productId={productId} />
      </h2>
      <SlideMenu
        participantIDs={participantIDs}
        handleChatRoomExit={handleChatRoomExit}
        resetChatRoomExit={resetChatRoomExit}
      />
    </div>
  );
}
