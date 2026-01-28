import Image from "next/image";
import type { ProfileData } from "../../../types/profileTypes";
import UserInfoCardBtns from "./UserInfoCardBtns";
import FollowInfo from "./FollowInfo";
import ProductInfo from "./ProductInfo";
import ReactStarClient from "../../ReactStarClient";

interface IProps {
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

export default function UserInfoCard({ profileData, isMyProfile }: IProps) {
  const profileImg = profileData?.profileImg || "/icons/user-icon.svg";
  const nickname = profileData?.nickname || "";

  const followersCount = profileData?.followersCount ?? 0;
  const followingsCount = profileData?.followingsCount ?? 0;

  const productCount = profileData?.productIds?.length ?? 0;
  const saleCount = profileData?.saleCount ?? 0;

  const reviewPercentage = profileData?.reviewInfo?.reviewPercentage ?? 0;
  const starValue = (reviewPercentage / 100) * 5;

  return (
    <div className="relative flex flex-col gap-3 justify-center items-start basis-1/3 before:hidden before:md:block before:absolute before:bg-gray-200 before:top-0 before:-right-[10px] before:w-[1px] before:h-full">
      <Image
        className="w-24 h-24 object-cover object-center rounded-full mx-auto"
        src={profileImg}
        alt={nickname ? `${nickname} 프로필 이미지` : "프로필 이미지"}
        width={100}
        height={100}
      />

      <span className="font-bold text-lg mx-auto max-w-36">{nickname}</span>

      <div className="flex flex-col items-center gap-3 w-full max-w-36 mx-auto">
        <FollowInfo
          followersCount={followersCount}
          followingsCount={followingsCount}
        />

        <ReactStarClient starValue={starValue} />

        <ProductInfo
          productCount={productCount}
          saleCount={saleCount}
          reviewPercentage={reviewPercentage}
        />

        <UserInfoCardBtns isMyProfile={isMyProfile} profileData={profileData} />
      </div>
    </div>
  );
}
