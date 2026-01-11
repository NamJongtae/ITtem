import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import useChatOpponentProfile from "../hooks/useChatOpponentProfile";
import MenuInMyProfile from "./MenuInMyProfile";
import MenuInOtherUserProfile from "./MenuInOtherUserProfile";

interface IProps {
  participantIDs: string[];
  myProfileData: ProfileData | undefined;
}
export default function MenuInProfile({
  participantIDs,
  myProfileData
}: IProps) {
  const { isMe, otherUserId, otherUserProfileData } = useChatOpponentProfile({
    participantIDs,
    myProfileData
  });

  return (
    <ul className="flex flex-col p-3 gap-3 text-sm">
      {participantIDs.map((id) => (
        <li key={id} className="flex gap-3 items-center justify-between w-full">
          {isMe(id) ? (
            <MenuInMyProfile myProfileData={myProfileData} />
          ) : (
            <MenuInOtherUserProfile
              otherUserProfileData={otherUserProfileData}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
