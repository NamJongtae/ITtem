import { ProfileMenu } from "../../types/profileTypes";

interface IProps {
  profileMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  isMyProfile: boolean;
}

function MenuItem({
  menu,
  activeMenu,
  handleClick
}: {
  menu: ProfileMenu;
  activeMenu: ProfileMenu;
  handleClick: (menu: ProfileMenu) => void;
}) {
  const isActive = menu === activeMenu;

  return (
    <li
      key={menu}
      className={`${
        isActive ? "bg-gray-700 text-white" : ""
      } border border-b-black w-full h-full py-3 text-center`}
    >
      <button onClick={() => handleClick(menu)}>{menu}</button>
    </li>
  );
}

export default function ContentMenu({
  profileMenu,
  handleClickMenu,
  isMyProfile
}: IProps) {
  return (
    <ul className="flex justify-between w-full h-full font-medium text-sm md:text-base">
      <MenuItem
        menu={"판매상품"}
        activeMenu={profileMenu}
        handleClick={handleClickMenu}
      />
      <MenuItem
        menu={"거래후기"}
        activeMenu={profileMenu}
        handleClick={handleClickMenu}
      />
      {isMyProfile && (
        <MenuItem
          menu={"찜"}
          activeMenu={profileMenu}
          handleClick={handleClickMenu}
        />
      )}
      <MenuItem
        menu={"팔로워"}
        activeMenu={profileMenu}
        handleClick={handleClickMenu}
      />
      <MenuItem
        menu={"팔로잉"}
        activeMenu={profileMenu}
        handleClick={handleClickMenu}
      />
    </ul>
  );
}
