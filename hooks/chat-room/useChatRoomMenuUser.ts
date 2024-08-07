import { RootState } from "@/store/store";
import { ProfileData } from "@/types/auth-types";
import { useSelector } from "react-redux";
import useProfileQuery from "../react-query/queries/profile/useProfileQuery";

interface IParams {
  participantIDs: string[];
  myProfileData: ProfileData | undefined;
}

export default function useChatRoomMenuUser({
  participantIDs,
  myProfileData,
}: IParams) {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid || "";
  const isMe = (id: string) => {
    return id === myProfileData?.uid;
  };
  const otherUserId = participantIDs.filter((id) => id !== myUid)[0];
  const { profileData: otherUserProfileData } = useProfileQuery(otherUserId);

  return { isMe, otherUserId, otherUserProfileData };
}
