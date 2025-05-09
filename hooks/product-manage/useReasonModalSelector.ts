import { MutableRefObject } from "react";
import { useFormContext } from "react-hook-form";
import { useFocusing } from "../commons/useFocusing";

interface IParams {
  name: string;
  selectorRef: MutableRefObject<HTMLSelectElement | null>;
}

export default function useReasonModalSelector ({ name, selectorRef }: IParams) {
  const { register } = useFormContext();
  const { ref, ...rest } = register(name);
  useFocusing(selectorRef);

  return { ref, rest };
}
