import Image from "next/image";
import { ProfileMenu } from "../profile-page";
import dynamic from "next/dynamic";
import { ProfileData } from "@/types/authTypes";
import ProfileEditModal from "../profileEditModal/profileEdit-modal";
import useModal from "@/hooks/commons/useModal";
import ChangePasswordModal from "@/components/changePasswordModal/changePassword-modal";
import ProfileUserInfoCardBtns from "./profile-userInfo-card-btns";
import ProfileUserInfoCardFollowInfo from "./profile-userInfo-card-followInfo";
import ProfileUserInfoCardProductInfo from "./profile-userInfo-card-productInfo";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileUserInfoCard({
  handleClickMenu,
  userProfileData,
  myProfileData,
}: IProps) {
  const {
    isOpenModal: isOpenProfileEditModal,
    openModal: openProfileEditModal,
    handleClickCloseBtn: handleClickProfieEditCloseBtn,
  } = useModal();

  const {
    isOpenModal: isOpenChangePwModal,
    openModal: openChangePwModl,
    handleClickCloseBtn: handleClickChangePwCloseBtn,
  } = useModal();

  return (
    <>
      <div className="relative flex flex-col gap-3 justify-center items-start basis-1/3 before:hidden before:md:block before:absolute before:bg-gray-200 before:top-0 before:-right-[10px] before:w-[1px] before:h-full">
        <Image
          className="w-24 h-24 object-cover object-center rounded-full mx-auto"
          src={userProfileData?.profileImg || "/icons/user_icon.svg"}
          alt=""
          width={100}
          height={100}
        />
        <span className="font-bold text-lg mx-auto max-w-36">
          {userProfileData?.nickname}
        </span>
        <div className="flex flex-col items-center gap-3 w-full max-w-36 mx-auto">
          <ProfileUserInfoCardFollowInfo
            userProfileData={userProfileData}
            handleClickMenu={handleClickMenu}
          />
          <ReactStars
            size={20}
            half
            value={
              ((userProfileData?.reviewInfo?.reviewPercentage || 0) / 100) * 5
            }
            color1="#ddd"
            color2="#fec323"
            edit={false}
          />
          <ProfileUserInfoCardProductInfo
            userProfileData={userProfileData}
            handleClickMenu={handleClickMenu}
          />
          <ProfileUserInfoCardBtns
            myProfileData={myProfileData}
            userProfileData={userProfileData}
            openProfileEditModal={openProfileEditModal}
            openChangePwModl={openChangePwModl}
          />
        </div>
      </div>
      {isOpenProfileEditModal && (
        <ProfileEditModal
          handleClickProfieEditCloseBtn={handleClickProfieEditCloseBtn}
        />
      )}
      {isOpenChangePwModal && (
        <ChangePasswordModal
          handleClickChangePwCloseBtn={handleClickChangePwCloseBtn}
        />
      )}
    </>
  );
}
