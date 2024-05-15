import { ProfileData } from "@/types/authTypes";
import ProfileUserInfoFollowBtn from './profile-userInfo-follow-btn';

interface IProps {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
  openProfileEditModal: () => void;
  openChangePwModl: () => void;
}

export default function ProfileUserInfoCardBtns({
  myProfileData,
  userProfileData,
  openProfileEditModal,
  openChangePwModl,
}: IProps) {
  return myProfileData?.uid === userProfileData?.uid ? (
    <>
      <button
        type="button"
        onClick={openProfileEditModal}
        className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
      >
        프로필 수정
      </button>
      <button
        type="button"
        onClick={openChangePwModl}
        className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
      >
        비밀번호 변경
      </button>
    </>
  ) : (
    <ProfileUserInfoFollowBtn
      userProfileData={userProfileData}
      myProfileData={myProfileData}
    />
  );
}
