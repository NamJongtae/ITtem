import { ProfileData } from "@/types/auth-types";
import useProfileQuery from "../react-query/queries/profile/useProfileQuery";
import useAuthStore from '@/store/auth-store';

interface IParams {
  participantIDs: string[];
  myProfileData: ProfileData | undefined;
}

export default function useChatOpponentProfile({
  participantIDs,
  myProfileData,
}: IParams) {
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid || "";
  const isMe = (id: string) => {
    return id === myProfileData?.uid;
  };
  const otherUserId = participantIDs.filter((id) => id !== myUid)[0];
  const { profileData: otherUserProfileData } = useProfileQuery(otherUserId);

  return { isMe, otherUserId, otherUserProfileData };
}
