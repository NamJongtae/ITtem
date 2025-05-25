interface IProps {
  currentStep: "기본정보입력" | "프로필설정" | "소개글작성";
}

const SubTitleStyles = "font-semibold text-2xl py-5";

export default function SubTitle({ currentStep }: IProps) {
  switch (currentStep) {
    case "기본정보입력":
      return <p className={SubTitleStyles}>기본 정보를 입력해주세요 :)</p>;
    case "프로필설정":
      return (
        <p className={SubTitleStyles}>
          프로필을 설정해주세요.
          <br /> 거의 다했어요 :)
        </p>
      );
    case "소개글작성":
      return (
        <p className={SubTitleStyles}>
          마지막 단계에요~ <br />
          소개글을 입력해주세요.
        </p>
      );
  }
}
