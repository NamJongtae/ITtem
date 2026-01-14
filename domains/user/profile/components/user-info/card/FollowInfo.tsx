import { ProfileData, ProfileMenu } from "../../../types/profileTypes";

interface IProps {
  profileData: ProfileData | undefined;
  handleClickMenu: (menu: ProfileMenu) => void;
}

export default function FollowInfo({ profileData, handleClickMenu }: IProps) {
  return (
    <div className="flex gap-5 text-sm font-medium">
      <button
        onClick={() => handleClickMenu("followers")}
        className="relative font-semibold before:absolute before:bg-gray-400 before:top-1/2 before:-translate-y-1/2 before:-right-[10px] before:w-[1px] before:h-7"
      >
        <span>팔로워</span>
        <span className="block w-full text-center">
          {profileData?.followersCount || 0}
        </span>
      </button>
      <button
        onClick={() => handleClickMenu("followings")}
        className="font-semibold"
      >
        <span>팔로잉</span>
        <span className="block w-full text-center">
          {profileData?.followingsCount || 0}
        </span>
      </button>
    </div>
  );
}
