import EmailField from "./email-field";
import FindPasswordBtns from './findPassword-btns';
import PasswordCheckField from "./password-check-field";
import PasswordField from "./password-field";
import SubTitle from './sub-title';
import VerifyCodeField from "./verify-code-field";

export default function FormConent() {
  return (
    <div className="h-[calc(100%-46px)] flex flex-col gap-3 justify-between">
      <div className="flex flex-col gap-3">
        <SubTitle />
        <EmailField />

        <VerifyCodeField />

        <PasswordField />

        <PasswordCheckField />
      </div>

      <FindPasswordBtns />
    </div>
  );
}
