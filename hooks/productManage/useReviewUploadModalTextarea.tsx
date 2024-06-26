import { useFormContext } from "react-hook-form";

export default function useReviewUploadModalTextarea() {
  const { register } = useFormContext();
  const { ref: registerRef, ...rest } = register("content", {
    required: true,
  });

  return { registerRef, rest };
}
