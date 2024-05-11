import ProfileUserInfo from "./profileUserInfo/profile-userInfo";
import ProfileDetail from "./profile-detail";
import { useState } from "react";

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";

interface IProps {
  uid?: string;
}

export default function ProfilePage({ uid }: IProps) {
  const [profileMenu, setProfileMenu] = useState<ProfileMenu>("판매상품");

  const handleClickMenu = (menu: ProfileMenu) => {
    setProfileMenu(menu);
  };
  return (
    <>
      <ProfileUserInfo handleClickMenu={handleClickMenu} uid={uid}/>
      <ProfileDetail
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        uid={uid}
      />
    </>
  );
}
