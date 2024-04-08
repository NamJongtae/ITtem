import NicknameField from "./nickname-field";
import ProfileImgField from "./profileImg-field";
import SetpProfileBtns from "./setp-profile-btns";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupStepProfile({
  nextStepHandler,
}: IProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-medium text-center text-gray-400">
        프로필 이미지는 나중에 설정해도되요.
      </p>
      <ProfileImgField />
      <NicknameField />
      <SetpProfileBtns
        nextStepHandler={nextStepHandler}
      />
    </div>
  );
}
