import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useProfileQuery from "@/hooks/reactQuery/querys/profile/useProfileQuery";

interface IParams {
  senderId: string;
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
