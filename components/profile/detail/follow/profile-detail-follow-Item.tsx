import { ProfileData } from "@/types/auth-types";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import ProfileDetailFollowBtn from "./profile-detail-follow-btn";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

interface IProps {
  data: ProfileData;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowItem({
  data,
  userProfileData,
  myProfileData
}: IProps) {
  return (
    <li className="mx-auto">
      <div className="flex gap-3">
        <Image
          className="w-14 h-14 rounded-full bg-cover bg-center"
          src={data.profileImg}
          alt={data.nickname}
          width={56}
          height={56}
        />
        <div className="flex flex-col">
          <Link href={`/profile/${data.uid}`} className="font-semibold">
            {data.nickname}
          </Link>
          <ReactStars
            size={20}
            half
            value={((data?.reviewPercentage || 0) / 100) * 5}
            color1="#ddd"
            color2="#fec323"
            edit={false}
          />
          <div className="mt-1">
            <span className="relative mr-4 text-sm font-medium before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2">
              상품 {data.productIds.length}
            </span>
            <span className="text-sm font-medium">
              평가{" "}
              {data.reviewPercentage === 0
                ? "없음"
                : `${data.reviewPercentage}%`}
            </span>
          </div>
          <span className="font-medium text-sm">
            팔로워 {data.followers.length}
          </span>
        </div>
      </div>
      <ProfileDetailFollowBtn
        myProfileData={myProfileData}
        userProfileData={userProfileData}
        followProfileData={data}
      />
    </li>
  );
}
