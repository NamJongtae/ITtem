import { ProfileData } from "@/domains/user/types/profile-types";
import useProfileQuery from "@/domains/user/hooks/profile/queries/useProfileQuery";
import useAuthStore from "@/domains/auth/store/auth-store";

interface IParams {
  participantIDs: string[];
  myProfileData: ProfileData | undefined;
}

export default function useChatOpponentProfile({
  participantIDs,
  myProfileData
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
