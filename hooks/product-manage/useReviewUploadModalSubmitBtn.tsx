import { useFormContext } from "react-hook-form";

export default function useReviewUploadModalSubmitBtn() {
  const { formState } = useFormContext();
  const isDisabled =
    !formState.dirtyFields["score"] || !formState.dirtyFields["content"];

  return { isDisabled };
}
