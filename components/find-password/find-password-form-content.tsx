import FindPasswordEmailField from "./find-password-email-field";
import FindPasswordBtns from './find-password-btns';
import FindPasswordPasswordCheckField from "./find-password-password-check-field";
import FindPasswordPasswordField from "./find-password-password-field";
import FindPasswordSubTitle from './find-password-sub-title';
import FindPasswordVerifyCodeField from "./find-password-verify-code-field";

export default function FindPasswordFormConent() {
  return (
    <div className="h-[calc(100%-46px)] flex flex-col gap-3 justify-between">
      <div className="flex flex-col gap-3">
        <FindPasswordSubTitle />
        <FindPasswordEmailField />

        <FindPasswordVerifyCodeField />

        <FindPasswordPasswordField />

        <FindPasswordPasswordCheckField />
      </div>

      <FindPasswordBtns />
    </div>
  );
}
