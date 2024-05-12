export default function ProfileEditIntroduceField() {
  return (
    <div className="mt-8">
    <label className="font-semibold" htmlFor="nickname">
      소개글
    </label>
    <textarea
      className="border p-3 rounded-sm w-full resize-none scrollbar text-sm mt-4 focus:outline-none"
      id="nickname"
      rows={5}
      placeholder="소개글을 입력하세요."
    />
    <span className="block text-sm text-end w-full mt-1">0/2000</span>
  </div>
  )
}
