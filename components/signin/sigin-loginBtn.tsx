import { useFormContext } from "react-hook-form";

export default function SiginLoginBtn() {
  const { formState } = useFormContext();
  const errors = formState.errors["email"] || formState.errors["password"];
  const isDrity =
    formState.dirtyFields["email"] && formState.dirtyFields["password"];
  const isDisabled = !!errors || !isDrity;

  return (
    <button
      type="submit"
      className="button_primary mb-12 disabled:bg-opacity-50"
      disabled={isDisabled}
    >
      로그인
    </button>
  );
}
