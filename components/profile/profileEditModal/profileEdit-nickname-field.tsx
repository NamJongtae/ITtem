export default function ProfileEditNicknameField() {
  return (
    <div className="mt-8">
      <label className="font-semibold" htmlFor="nickname">
        닉네임
      </label>
      <input
        className="border-b pb-3 w-full text-sm mt-4 focus:outline-none"
        id="nickname"
        type="text"
        placeholder="닉네임을 입력하세요"
      />
    </div>
  );
}
