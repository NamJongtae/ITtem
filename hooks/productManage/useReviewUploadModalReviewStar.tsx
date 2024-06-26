import { MutableRefObject } from "react";
import { useFocusing } from "../commons/useFocusing";
import { useFormContext } from "react-hook-form";

interface IProps {
  starRef: MutableRefObject<HTMLDivElement | null>;
}

export default function useReviewUploadModalReviewStar({ starRef }: IProps) {
  const { control, watch } = useFormContext();
  const score = watch("score");

  useFocusing(starRef);

  return { control, score };
}
