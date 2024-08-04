import MenuIcon from "@/public/icons/menu_icon.svg";

interface IProps {
  isOpenMenu: boolean;
  toggleMenu: () => void;
}

export default function SubNavMoblieMenuBtn({ isOpenMenu, toggleMenu }: IProps) {
  return (
    <button
      className={`inline-flex flex-col items-center gap-[2px] text-xs text-gary-600 ${
        isOpenMenu && "text-indigo-500"
      }`}
      onClick={toggleMenu}
      aria-label="메뉴"
    >
      <MenuIcon
        className={`w-5 h-5 ${isOpenMenu ? "fill-indigo-500" : "fill-black"}`}
      />
      메뉴
    </button>
  );
}
