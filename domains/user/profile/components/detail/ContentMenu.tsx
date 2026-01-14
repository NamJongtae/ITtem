import { ProfileMenu } from "../../types/profileTypes";

interface IProps {
  currentMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  isMyProfile: boolean;
}

const PROFILE_MENU = [
  "products",
  "reviews",
  "wishlist",
  "followers",
  "followings"
] as ProfileMenu[];

function profileMenuLabel(menu: ProfileMenu) {
  switch (menu) {
    case "products":
      return "상품";
    case "reviews":
      return "거래후기";
    case "wishlist":
      return "찜";
    case "followers":
      return "팔로우";
    case "followings":
      return "팔로잉";
    default:
      return "상품";
  }
}

function MenuItem({
  menu,
  currentMenu,
  handleClick,
  isMyProfile
}: {
  menu: ProfileMenu;
  currentMenu: ProfileMenu;
  handleClick: (menu: ProfileMenu) => void;
  isMyProfile: boolean;
}) {
  const isCurrentMenuValid = PROFILE_MENU.includes(currentMenu);

  const activeMenu = isCurrentMenuValid ? currentMenu : "products";
  const isActive = menu === activeMenu;

  if (menu === "wishlist" && !isMyProfile) return null;

  return (
    <li
      key={menu}
      className={`${
        isActive ? "bg-gray-700 text-white" : ""
      } border border-b-black w-full h-full py-3 text-center`}
    >
      <button onClick={() => handleClick(menu)}>
        {profileMenuLabel(menu)}
      </button>
    </li>
  );
}

export default function ContentMenu({
  currentMenu,
  handleClickMenu,
  isMyProfile
}: IProps) {
  return (
    <ul className="flex justify-between w-full h-full font-medium text-sm md:text-base">
      {PROFILE_MENU.map((menu) => (
        <MenuItem
          key={menu}
          menu={menu}
          isMyProfile={isMyProfile}
          currentMenu={currentMenu}
          handleClick={handleClickMenu}
        />
      ))}
    </ul>
  );
}
