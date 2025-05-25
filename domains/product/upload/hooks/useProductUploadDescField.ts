import { useFormContext } from "react-hook-form";

export default function useProductUploadDescField() {
  const { register, watch, setValue } = useFormContext();
  const productDesc = watch("description");
  const handleChangeProductDesc = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    if (inputValue[0] === " ") {
      setValue("description", inputValue.trim());
    } else {
      setValue("description", inputValue);
    }
  };

  return { register, productDesc, handleChangeProductDesc };
}
