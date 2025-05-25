import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import useProfileQuery from "@/domains/user/profile/hooks/queries/useProfileQuery";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

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
