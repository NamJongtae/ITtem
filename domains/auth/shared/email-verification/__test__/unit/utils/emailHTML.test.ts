import { emailHTML } from "../../../utils/emailHTML";
import { EmailVerificationType } from "../../../types/emailVerificationTypes";
describe("emailHTML", () => {
  const verfiyCode = "A1B2C3";

  it("회원가입 타입이면 환영 문구를 포함합니다", () => {
    const html = emailHTML(verfiyCode, "signup" as EmailVerificationType);
    expect(html).toContain("ITtem 가입을 환영합니다");
    expect(html).toContain(verfiyCode[0]);
    expect(html).toContain(
      `<span style="padding: 2px 8px">${verfiyCode[0]}</span>`
    );
  });

  it("비밀번호 재설정 타입이면 비밀번호 찾기 문구를 포함합니다", () => {
    const html = emailHTML(verfiyCode, "resetPw" as EmailVerificationType);
    expect(html).toContain("ITtem 비밀번호 찾기 인증코드입니다.");
    expect(html).toContain(
      `<span style="padding: 2px 8px">${verfiyCode[5]}</span>`
    );
  });

  it("모든 인증 코드 문자가 포함되어야 합니다.", () => {
    const html = emailHTML(verfiyCode, "signup" as EmailVerificationType);
    for (const char of verfiyCode) {
      expect(html).toContain(char);
    }
  });

  it("숨김 처리된 div에 verfiyCode 코드가 포함되어야 합니다.", () => {
    const html = emailHTML(verfiyCode, "signup" as EmailVerificationType);
    expect(html).toMatch(
      new RegExp(`<div[^>]*style="[^"]*clip[^"]*"[^>]*>${verfiyCode}</div>`)
    );
  });
});
