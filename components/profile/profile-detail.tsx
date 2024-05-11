import ProfileDetailMenu from "./profile-detail-menu";
import ProfileDetailContent from "./profile-detail-content";
import { ProfileMenu } from "./profile-page";

interface IProps {
  profileMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  uid?: string;
}

export default function ProfileDetail({
  profileMenu,
  handleClickMenu,
  uid
}: IProps) {
  return (
    <section className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8">
      <ProfileDetailMenu
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        uid={uid}
      />
      <ProfileDetailContent profileMenu={profileMenu} />
    </section>
  );
}