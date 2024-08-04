import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useProfileQuery from "@/hooks/react-query/queries/profile/useProfileQuery";

interface IParams {
  senderId: string | undefined;
}

export default function useChatRoomItem({ senderId }: IParams) {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid || "";
  const { profileData } = useProfileQuery(senderId);

  return {
    myUid,
    profileData,
  };
}
