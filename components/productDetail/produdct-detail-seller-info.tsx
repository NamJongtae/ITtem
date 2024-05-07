import { ProfileData } from "@/types/authTypes";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function ProductDetailSellerInfo({ profileData }: IProps) {
  return (
    <Link
      href={`/profile/${profileData?.uid}`}
      className="inline-flex items-center gap-4 rounded-md p-3 "
    >
      <Image
        className="inline-block h-14 w-14 cursor-pointer rounded-full object-cover object-center mr-1 border-2"
        src={profileData?.profileImg || "/icons/user_icon.svg"}
        alt="판매자"
        width={56}
        height={56}
      />
      <div>
        <span>{profileData?.nickname}</span>
        <span className="block text-gray-500 text-sm">
          {profileData?.reviewPercentage === 0
            ? "리뷰없음"
            : `평가 : ${profileData?.reviewPercentage}%`}
        </span>
      </div>
      <button className="border py-2 px-4 text-md betterhover:hover:bg-gray-100">
        + 팔로우
      </button>
    </Link>
  );
}
