import ImgField from "./NicknameField";
import NicknameField from "./ImgField";
import NextStepBtn from "./NextSetpBtn";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupProfileSettingStep({ nextStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-medium text-center text-gray-400">
        프로필 이미지는 나중에 설정해도되요.
      </p>
      <ImgField />
      <NicknameField />
      <NextStepBtn nextStepHandler={nextStepHandler} />
    </div>
  );
}
