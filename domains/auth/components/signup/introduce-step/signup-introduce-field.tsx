import { useFormContext } from "react-hook-form";

export default function SignupIntroductField() {
  const { register } = useFormContext();
  return (
    <div>
      <label className="sr-only" htmlFor="introduce">
        소개글
      </label>
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
