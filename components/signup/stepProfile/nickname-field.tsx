import NicknameInput from "./nickname-input";
import NicknameError from "./nickname-error";

export const nicknameRegx = /^(?![0-9]+$)([a-zA-Z0-9가-힣]{4,8})$/;
export const nicknameErrorMsg =
  "4-8자 닉네임(영문, 한글, 숫자조합)을 입력해주세요.";

export default function NicknameField() {
  return (
    <div>
      <label className="sr-only" id="nickname">
        닉네임
      </label>
      <NicknameInput />
      <NicknameError />
    </div>
  );
}
