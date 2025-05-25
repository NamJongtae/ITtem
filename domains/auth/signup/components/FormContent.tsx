import { useFunnel } from "@/shared/common/hooks/useFunnel";
import SubTitle from "./SubTitle";
import Stepper from "./stepper/Stepper";
import BasicInfoStep from "./basic-info-step/BasicInfoStep";
import ProfileSettingStep from "./profile-setting-step/ProfileSettingStep";
import IntroduceStep from "./introduce-step/IntroduceStep";
import { EmailVerificationContextProvider } from "../../shared/email-verification/context/EmailVerificationProvider";

export default function FormContent() {
  const { Funnel, Step, currentStep, nextStepHandler, prevStepHandler } =
    useFunnel(["기본정보입력", "프로필설정", "소개글작성"]);

  return (
    <>
      <SubTitle currentStep={currentStep} />
      <Stepper currentStep={currentStep} />

      <Funnel>
        <Step name="기본정보입력">
          <EmailVerificationContextProvider>
            <BasicInfoStep nextStepHandler={nextStepHandler} />
          </EmailVerificationContextProvider>
        </Step>
        <Step name="프로필설정">
          <ProfileSettingStep nextStepHandler={nextStepHandler} />
        </Step>
        <Step name="소개글작성">
          <IntroduceStep prevStepHandler={prevStepHandler} />
        </Step>
      </Funnel>
    </>
  );
}
