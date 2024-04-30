import { useFunnel } from "@/hooks/commons/useFunnel";
import SignupSubTitle from "./signup-subTitle";
import SignupStepper from "./signup-stepper";
import SignupStepBasicInfo from './stepBasicInfo/signup-step-basicInfo';
import SignupStepProfile from "./stepProfile/signup-step-profile";
import SignupStepIntroduce from "./setpIntroduce/signup-step-introduce";


export default function FormContent() {
  const { Funnel, Step, currentStep, nextStepHandler, prevStepHandler } =
    useFunnel(["기본정보입력", "프로필설정", "소개글작성"]);
  return (
    <>
      <SignupSubTitle currentStep={currentStep} />
      <SignupStepper currentStep={currentStep} />

      <Funnel>
        <Step name="기본정보입력">
          <SignupStepBasicInfo nextStepHandler={nextStepHandler} />
        </Step>
        <Step name="프로필설정">
          <SignupStepProfile nextStepHandler={nextStepHandler} />
        </Step>
        <Step name="소개글작성">
          <SignupStepIntroduce prevStepHandler={prevStepHandler} />
        </Step>
      </Funnel>
    </>
  );
}
