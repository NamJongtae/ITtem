import { MutableRefObject } from "react";
import { useFocusing } from "../commons/useFocusing";
import { useFormContext } from "react-hook-form";

interface IParams {
  starRef: MutableRefObject<HTMLDivElement | null>;
}

export default function useReviewModalStar({ starRef }: IParams) {
  const { control, watch } = useFormContext();
  const score = watch("score");

  useFocusing(starRef);

  return { control, score };
}
