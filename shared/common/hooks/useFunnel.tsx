import React, { ReactElement, ReactNode, useState } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = <S extends string>(steps: S[]) => {
  // state를 통해 현재 스텝을 관리합니다.
  // setStep 함수를 통해 현재 스텝을 변경할 수 있습니다.
  const [currentStep, setCurrentStep] = useState(steps[0]);

  // step index를 관리합니다.
  const [stepIndex, setStepIndex] = useState(0);

  // 이전 스텝으로 돌아갑니다.
  const prevStepHandler = () => {
    if (stepIndex <= 0) return;
    setStepIndex((prev) => prev - 1);
    setCurrentStep(steps[stepIndex - 1]);
  };

  // 다음 스텝으로 넘어갑니다.
  const nextStepHandler = () => {
    if (stepIndex >= steps.length - 1) return;
    setStepIndex((prev) => prev + 1);
    setCurrentStep(steps[stepIndex + 1]);
  };

  // 각 단계를 나타내는 Step 컴포넌트
  // children을 통해 각 스텝의 컨텐츠를 렌더링 합니다.
  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  // 여러 단계의 Step 컴포넌트 중 현재 활성화된 스텝을 렌더링하는 Funnel
  // find를 통해 Step 중 현재 Step을 찾아 렌더링합니다.
  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === currentStep
    );

    return <>{targetStep}</>;
  };

  return {
    Funnel,
    Step,
    currentStep,
    nextStepHandler,
    prevStepHandler
  };
};
