import useProfileQuery from "@/hooks/react-query/queries/profile/useProfileQuery";
import useAuthStore from "@/store/auth-store";

interface IParams {
  senderId: string | undefined;
}

export default function useChatRoomItem({ senderId }: IParams) {
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid || "";
  const { profileData } = useProfileQuery(senderId);

  return {
    myUid,
    profileData
  };
}
