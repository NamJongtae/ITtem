import { ProfileData } from "@/types/authTypes";
import { ProfileMenu } from '../profile-page';

interface IProps {
  userProfileData: ProfileData | undefined;
  handleClickMenu: (menu: ProfileMenu) => void;
}

export default function ProfileUserInfoCardFollowInfo({
  userProfileData,
  handleClickMenu,
}: IProps) {
  return (
    <div className="flex gap-5 text-sm font-medium">
      <button
        onClick={() => handleClickMenu("팔로잉")}
        className="relative font-semibold before:absolute before:bg-gray-400 before:top-1/2 before:-translate-y-1/2 before:-right-[10px] before:w-[1px] before:h-7"
      >
        <span>팔로잉</span>
        <span className="block w-full text-center">
          {userProfileData?.followings.length || 0}
        </span>
      </button>
      <button
        onClick={() => handleClickMenu("팔로워")}
        className="font-semibold"
      >
        <span>팔로워</span>
        <span className="block w-full text-center">
          {userProfileData?.followers.length || 0}
        </span>
      </button>
    </div>
  );
}
