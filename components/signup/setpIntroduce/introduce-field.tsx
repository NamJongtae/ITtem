import { useFormContext } from "react-hook-form";

export default function IntroductField() {
  const { register } = useFormContext();
  return (
    <div>
      <label className="sr-only" htmlFor="introduce">
        소개글
      </label>
      <p className='font-medium text-gray-400 mb-2 text-center'>소개글은 나중에 작성해도 되요.</p>
      <textarea
        className="root_input resize-none mt-3"
        rows={6}
        id="introduce"
        placeholder="판매상품이나 자기를 소개해 주세요."
        maxLength={2000}
        {...register("introduce")}
      />
    </div>
  );
}
