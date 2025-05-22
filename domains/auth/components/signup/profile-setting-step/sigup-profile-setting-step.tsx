import SignupNicknameField from "./sigup-nickname-field";
import SignupProfileImgField from "./sigup-profile-img-field";
import ProfileSettingNextStepBtn from "./profile-setting-next-setp-btn";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupProfileSettingStep({ nextStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-medium text-center text-gray-400">
        프로필 이미지는 나중에 설정해도되요.
      </p>
      <SignupProfileImgField />
      <SignupNicknameField />
      <ProfileSettingNextStepBtn nextStepHandler={nextStepHandler} />
    </div>
  );
}
