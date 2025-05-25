import Image from "next/image";

import dynamic from "next/dynamic";
import { ProfileData, ProfileMenu } from "../../../types/profileTypes";
import CardBtns from "./CardBtns";
import FollowInfo from "./FollowInfo";
import ProductInfo from "./ProductInfo";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
}

export default function UserInfoCard({ handleClickMenu, profileData }: IProps) {
  return (
    <>
      <div className="relative flex flex-col gap-3 justify-center items-start basis-1/3 before:hidden before:md:block before:absolute before:bg-gray-200 before:top-0 before:-right-[10px] before:w-[1px] before:h-full">
        <Image
          className="w-24 h-24 object-cover object-center rounded-full mx-auto"
          src={profileData?.profileImg || "/icons/user-icon.svg"}
          alt=""
          width={100}
          height={100}
        />
        <span className="font-bold text-lg mx-auto max-w-36">
          {profileData?.nickname}
        </span>
        <div className="flex flex-col items-center gap-3 w-full max-w-36 mx-auto">
          <FollowInfo
            profileData={profileData}
            handleClickMenu={handleClickMenu}
          />
          <ReactStars
            size={20}
            half
            value={((profileData?.reviewInfo?.reviewPercentage || 0) / 100) * 5}
            color1="#ddd"
            color2="#fec323"
            edit={false}
          />
          <ProductInfo
            profileData={profileData}
            handleClickMenu={handleClickMenu}
          />
          <CardBtns profileData={profileData} />
        </div>
      </div>
    </>
  );
}
