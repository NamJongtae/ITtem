import Image from "next/image";
import ChatNotificationIcon from "@/public/icons/notification_icon.svg";
import useDropdownMenu from '@/hooks/commons/useDropDownMenu';

export default function ChatRoomMenu() {
  const {isOpenMenu, toggleMenu, menuRef} = useDropdownMenu();

  return (
    <div className="flex gap-3 items-center">
      <button role="알림">
        <ChatNotificationIcon className="stroke-yellow-400 fill-yellow-400 w-5 h-5" />
      </button>
      <button onClick={toggleMenu}>
        <Image src="/icons/dots_icon.svg" alt="나가기" width={20} height={20} />
      </button>

      {isOpenMenu && (
        <ul
          className="absolute top-14 right-4 h-auto bg-white border rounded-md shadow-lg animate-entering"
          ref={menuRef}
        >
          <li>
            <button className="py-2 px-4 w-full text-sm text-left betterhover:hover:bg-gray-100">
              나가기
            </button>
          </li>
          <li>
            <button className="py-2 px-4 w-full text-sm text-left betterhover:hover:bg-gray-100">
              팔로우
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
