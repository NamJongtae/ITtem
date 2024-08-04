import { useFormContext } from "react-hook-form";

export default function useIntroduceField() {
  const { register, setValue } = useFormContext();

  const introduceOnChage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim().length === 0) {
      setValue("introduce", "");
    }
  };

  const { ref, ...rest } = register("introduce", {
    onChange: introduceOnChage,
  });

  return { ref, rest };
}
