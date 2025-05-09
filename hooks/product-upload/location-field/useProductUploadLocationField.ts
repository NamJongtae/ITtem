import { useFormContext } from 'react-hook-form';

export default function useProductUploadLocationField() {
  const { register, setValue } = useFormContext();

  const setLocationValue = (address: string) => {
    setValue("location", address, { shouldDirty: true });
  };

  return {
    register,
    setLocationValue
  };
}
