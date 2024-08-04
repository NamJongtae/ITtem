import { useFormContext } from 'react-hook-form';

export default function useProductUploadSellTypeField() {
  const { register, getValues } = useFormContext();
  const sellType = getValues("sellType");
  return { register, sellType };
}
