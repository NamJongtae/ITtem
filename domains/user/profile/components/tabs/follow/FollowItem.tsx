import { FollowUserData } from "../../../types/profileTypes";
import Image from "next/image";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
import ReactStarClient from "../../ReactStarClient";

interface IProps {
  data: FollowUserData;
  listType: "followers" | "followings";
}

export default function FollowItem({ data, listType }: IProps) {
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
          <ReactStarClient
            starValue={((data?.reviewPercentage || 0) / 100) * 5}
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
          <div>
            <span className="relative mr-4 font-medium text-sm before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2">
              팔로워 {data.followersCount}
            </span>
            <span className="font-medium text-sm">
              팔로잉 {data.followingsCount}
            </span>
          </div>
        </div>
      </div>
      <FollowBtn followProfileData={data} listType={listType} />
    </li>
  );
}
