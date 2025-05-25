import useEmailVerificationStatus from "../../shared/email-verification/hooks/useEmailVerificationStatus";

export default function SubTitle() {
  const { isVerifiedEmail } = useEmailVerificationStatus();

  const subTitleStyles = "font-semibold";

  return !isVerifiedEmail ? (
    <p className={subTitleStyles}>본인 확인을 위해 이메일을 인증해주세요.</p>
  ) : (
    <p className={subTitleStyles}>변경할 비밀번호를 입력해주세요.</p>
  );
}
