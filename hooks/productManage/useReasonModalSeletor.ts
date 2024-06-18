import { MutableRefObject } from "react";
import { useFormContext } from "react-hook-form";
import { useFocusing } from "../commons/useFocusing";

interface IPrarms {
  name: string;
  selectorRef: MutableRefObject<HTMLSelectElement | null>;
}

export default function useReasonModalSeletor({
  name,
  selectorRef,
}: IPrarms) {
  const { register } = useFormContext();
  const { ref, ...rest } = register(name);
  useFocusing(selectorRef);

  return { ref, rest };
}
