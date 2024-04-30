import { useFormContext } from 'react-hook-form';

export default function useProductUploadDesc() {
  const { watch, setValue } = useFormContext();
  const productDesc = watch("desc");


  const handleChangeProductDesc = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    if (inputValue[0] === " ") {
      setValue("desc", productDesc.trim());
    } else {
      setValue("desc", inputValue);
    }
  };

  return { productDesc, handleChangeProductDesc };
}
