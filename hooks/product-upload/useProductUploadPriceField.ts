import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function useProductUploadPriceField() {
  const { setValue, watch, getValues } = useFormContext();
  const price = watch("price");

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    const filteredValue = value.replace(/\D/g, "");

    if (filteredValue.length === 0) {
      setValue("price", "");
      return;
    }

    const formattedValue: string = Intl.NumberFormat().format(
      Number(filteredValue)
    );
    setValue("price", formattedValue);
  };

  useEffect(() => {
    const price = getValues("price");
    if (price === "") return;
    const initialValue = Intl.NumberFormat().format(Number(price));
    setValue("price", initialValue);
  }, [setValue, getValues]);

  return { price, onChangePrice };
}
