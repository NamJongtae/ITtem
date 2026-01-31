"use client";

import dynamic from "next/dynamic";
import { ProfileData } from "../../types/profileTypes";

interface IProps {
  profileData: ProfileData | undefined;
}

const FollowBtn = dynamic(() => import("./FollowBtn"), {
  ssr: false,
  loading: () => <div className="w-32 h-10 bg-gray-300/60 rounded mt-2" />
});
export default function FollowBtnClient({ profileData }: IProps) {
  return <FollowBtn profileData={profileData} />;
}
