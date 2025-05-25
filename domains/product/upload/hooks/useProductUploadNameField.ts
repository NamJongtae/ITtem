import { useFormContext } from "react-hook-form";

export default function useProductUploadNameField() {
  const { watch, setValue } = useFormContext();
  const productName = watch("name");

  const handleChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue[0] === " ") {
      setValue("name", productName.trim());
    } else {
      setValue("name", inputValue);
    }
  };

  return { productName, handleChangeProductName };
}
