import { RefObject } from "react";
import { useFocusing } from "@/hooks/useFocusing";
import { useFormContext } from "react-hook-form";

interface IParams {
  starRef: RefObject<HTMLDivElement | null>;
}

export default function useReviewModalStar({ starRef }: IParams) {
  const { control, watch } = useFormContext();
  const score = watch("score");

  useFocusing(starRef);

  return { control, score };
}
