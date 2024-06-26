import { useFormContext } from "react-hook-form";

interface IPrarms {
  name: string;
}

export default function useReasonModalTextarea({ name }: IPrarms) {
  const { register, watch } = useFormContext();
  const { ref: registerRef, ...rest } = register(`textarea${name}`);
  const selectValue = watch(name);

  return { registerRef, rest, selectValue };
}
