import { ProfileMenu } from "@/types/auth-types";
import { useState } from "react";

export default function useProfileMenu() {
  const [profileMenu, setProfileMenu] = useState<ProfileMenu>("판매상품");

  const onClickMenu = (menu: ProfileMenu) => {
    setProfileMenu(menu);
  };

  return { profileMenu, onClickMenu };
}
