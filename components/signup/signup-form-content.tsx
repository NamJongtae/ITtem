import { useFunnel } from "@/hooks/commons/useFunnel";
import SignupSubTitle from "./signup-subTitle";
import SignupStepper from "./signup-stepper";
import SignupBasicInfoStep from "./basic-info-step/signup-basic-info-step";
import SignupProfileSettingStep from "./profile-setting-step/sigup-profile-setting-step";
import SignupIntroduceStep from "./introduce-step/signup-introduce-step";
import { EmailVerificationContextProvider } from '@/store/EmailVerificationProvider';

export default function SigninFormContent() {
  const { Funnel, Step, currentStep, nextStepHandler, prevStepHandler } =
    useFunnel(["기본정보입력", "프로필설정", "소개글작성"]);

  return (
    <>
      <SignupSubTitle currentStep={currentStep} />
      <SignupStepper currentStep={currentStep} />

      <Funnel>
        <Step name="기본정보입력">
          <EmailVerificationContextProvider>
            <SignupBasicInfoStep nextStepHandler={nextStepHandler} />
          </EmailVerificationContextProvider>
        </Step>
        <Step name="프로필설정">
          <SignupProfileSettingStep nextStepHandler={nextStepHandler} />
        </Step>
        <Step name="소개글작성">
          <SignupIntroduceStep prevStepHandler={prevStepHandler} />
        </Step>
      </Funnel>
    </>
  );
}
