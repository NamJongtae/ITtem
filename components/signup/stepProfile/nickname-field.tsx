import NicknameInput from "./nickname-input";
import NicknameError from "./nickname-error";

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
