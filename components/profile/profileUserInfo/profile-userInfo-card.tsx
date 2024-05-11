import Image from "next/image";
import React from "react";
import { ProfileMenu } from "../profile-page";
import dynamic from "next/dynamic";
import { ProfileData } from "@/types/authTypes";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
}

export default function ProfileUserInfoCard({
  handleClickMenu,
  profileData,
}: IProps) {
  return (
    <div className="relative flex flex-col gap-3 justify-center items-start basis-1/3 before:hidden before:md:block before:absolute before:bg-gray-200 before:top-0 before:-right-[10px] before:w-[1px] before:h-full">
      <Image
        className="w-24 h-24 object-cover object-center rounded-full mx-auto"
        src={profileData?.profileImg || "/icons/user_icon.svg"}
        alt=""
        width={100}
        height={100}
      />

      <div className="flex flex-col items-center gap-3 w-full max-w-36 mx-auto">
        <span className="font-bold text-lg">{profileData?.nickname}</span>
        <div className="flex gap-5 text-sm font-medium">
          <button
            onClick={() => handleClickMenu("팔로잉")}
            className="relative font-semibold before:absolute before:bg-gray-400 before:top-1/2 before:-translate-y-1/2 before:-right-[10px] before:w-[1px] before:h-7"
          >
            <span>팔로잉</span>
            <span className="block w-full text-center">
              {profileData?.followings.length || 0}
            </span>
          </button>
          <button
            onClick={() => handleClickMenu("팔로워")}
            className="font-semibold"
          >
            <span>팔로워</span>
            <span className="block w-full text-center">
              {profileData?.followers.length || 0}
            </span>
          </button>
        </div>
        <ReactStars
          size={20}
          half
          value={((profileData?.reviewPercentage || 0) / 100) * 5}
          color1="#ddd"
          color2="#fec323"
          edit={false}
        />
        <div className="text-sm font-medium">
          <button
            onClick={() => handleClickMenu("판매상품")}
            className="relative mr-4 before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2"
          >
            상품 {profileData?.productIds.length || 0}
          </button>

          <button onClick={() => handleClickMenu("거래후기")}>
            평가 {" "}
            {profileData?.reviewPercentage === 0
              ? "없음"
              : `${profileData?.reviewPercentage}%`}
          </button>
        </div>
        <span className="text-sm">상품판매 {profileData?.saleCount || 0}회</span>
        {profileData?.uid ? (
          <button className="border py-2 px-4 w-full betterhover:hover:bg-gray-100">
            + 팔로우
          </button>
        ) : (
          <>
            <button className="border py-2 px-4 w-full betterhover:hover:bg-gray-100">
              프로필 수정
            </button>
            <button className="border py-2 px-4 w-full betterhover:hover:bg-gray-100">
              비밀번호 변경
            </button>
          </>
        )}
      </div>
    </div>
  );
}
