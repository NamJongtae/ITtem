import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export default function SubTitle() {
  const isVerifyEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );

  const subTitleStyles = "font-semibold";

  return !isVerifyEmail ? (
    <p className={subTitleStyles}>본인 확인을 위해 이메일을 인증해주세요.</p>
  ) : (
    <p className={subTitleStyles}>변경할 비밀번호를 입력해주세요.</p>
  );
}
