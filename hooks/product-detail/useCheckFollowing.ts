import { ProfileData } from "@/types/auth-types";

interface IParams {
  uid: string;
  authFollowers: string[];
  myProfileData: ProfileData | undefined;
}

export default function useCheckFollowing({
  uid,
  authFollowers,
  myProfileData
}: IParams) {
  const isFollowing =
    !!myProfileData?.followings?.includes(uid) &&
    !!authFollowers.includes(myProfileData?.uid);

  return { isFollowing };
}
