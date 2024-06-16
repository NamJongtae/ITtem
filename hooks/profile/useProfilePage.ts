import { ProfileMenu } from "@/components/profile/profile-page";
import { useState } from "react";
import useProfileQuery from "../reactQuery/querys/profile/useProfileQuery";
import useMyProfileQuery from "../reactQuery/querys/profile/useMyProfileQuery";

export default function useProfilePage() {
  const [profileMenu, setProfileMenu] = useState<ProfileMenu>("판매상품");
  const { profileData, loadProfileDataLoading, loadProfileDataError } =
    useProfileQuery();

  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();

  const isLoading = loadProfileDataLoading || loadMyProfileLoading;
  const error = loadProfileDataError;

  const handleClickMenu = (menu: ProfileMenu) => {
    setProfileMenu(menu);
  };

  return {
    profileMenu,
    profileData,
    myProfileData,
    isLoading,
    error,
    handleClickMenu,
  };
}
