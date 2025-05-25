import { ProfileMenu } from "../types/profileTypes";
import { useState } from "react";

export default function useProfileMenu() {
  const [profileMenu, setProfileMenu] = useState<ProfileMenu>("판매상품");

  const onClickMenu = (menu: ProfileMenu) => {
    setProfileMenu(menu);
  };

  return { profileMenu, onClickMenu };
}
