import MenuIcon from "@/public/icons/menu_icon.svg";

interface IProps {
  isOpenMenu: boolean;
  toggleMenu: () => void;
}

export default function NavMoblieMenuBtn({ isOpenMenu, toggleMenu }: IProps) {
  return (
    <button
      role="메뉴 버튼"
      className={`inline-flex flex-col items-center gap-[2px] text-xs text-gary-600 ${
        isOpenMenu && "text-indigo-500"
      }`}
      onClick={toggleMenu}
      aria-label="Main menu"
      aria-expanded="false"
    >
      <MenuIcon
        className={`w-5 h-5 ${isOpenMenu ? "fill-indigo-500" : "fill-black"}`}
      />
      메뉴
    </button>
  );
}
