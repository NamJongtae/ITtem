import { ProfileMenu } from "../profile-page";
import ProfileUserInfoIntroduce from "./profile-userInfo-introduce";
import ProfileUserInfoCard from "./profile-userInfo-card";

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  uid?: string;
}

export default function ProfileUserInfo({ handleClickMenu, uid }: IProps) {
  
  return (
    <div className="mt-5 max-w-[1024px] px-4 md:px-8 mx-auto">
      <h2 className="sr-only">유저 프로필</h2>
      <div className="flex flex-col gap-5 md:flex-row border py-5">
        <ProfileUserInfoCard handleClickMenu={handleClickMenu} uid={uid}/>
        <ProfileUserInfoIntroduce />
      </div>
    </div>
  );
}
