import Image from "next/image";
import { ProfileMenu } from "../../profile-page";
import dynamic from "next/dynamic";
import { ProfileData } from "@/types/auth-types";
import UserInfoCardBtns from "./user-Info-card-btns";
import UserInfoCardFollowInfo from "./user-info-card-follow-Info";
import UserInfoCardProductInfo from "./user-info-card-product-Info";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function UserInfoCard({
  handleClickMenu,
  userProfileData,
  myProfileData,
}: IProps) {
  return (
    <>
      <div className="relative flex flex-col gap-3 justify-center items-start basis-1/3 before:hidden before:md:block before:absolute before:bg-gray-200 before:top-0 before:-right-[10px] before:w-[1px] before:h-full">
        <Image
          className="w-24 h-24 object-cover object-center rounded-full mx-auto"
          src={userProfileData?.profileImg || "/icons/user-icon.svg"}
          alt=""
          width={100}
          height={100}
        />
        <span className="font-bold text-lg mx-auto max-w-36">
          {userProfileData?.nickname}
        </span>
        <div className="flex flex-col items-center gap-3 w-full max-w-36 mx-auto">
          <UserInfoCardFollowInfo
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
          <UserInfoCardProductInfo
            userProfileData={userProfileData}
            handleClickMenu={handleClickMenu}
          />
          <UserInfoCardBtns
            myProfileData={myProfileData}
            userProfileData={userProfileData}
          />
        </div>
      </div>
    </>
  );
}
