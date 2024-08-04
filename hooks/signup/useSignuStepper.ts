import { useFormContext } from "react-hook-form";

export default function useSignupStepper() {
  const { formState } = useFormContext();
  const defaultIsDirty =
    formState.dirtyFields["email"] && formState.dirtyFields["password"];
  const defaultInfoErrors =
    formState.errors["email"] || formState.errors["password"];

  const proflieIsDirty = formState.dirtyFields["nickname"];
  const proflieErrors =
    formState.errors["profileImg"] || formState.errors["nickname"];

  const introduceErrors = formState.errors["introduce"];

  return {
    defaultIsDirty,
    defaultInfoErrors,
    proflieIsDirty,
    proflieErrors,
    introduceErrors,
  };
}
