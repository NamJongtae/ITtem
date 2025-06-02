import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function useProductUploadPriceField() {
  const { setValue, watch, getValues } = useFormContext();
  const price = watch("price");

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    // 숫자만 남기고 나머지는 제거
    const filteredValue = value.replace(/\D/g, "");

    if (filteredValue.length === 0) {
      setValue("price", "");
      return;
    }

    // 항상 문자열로 포맷팅된 값 설정
    const formattedValue = Intl.NumberFormat().format(Number(filteredValue));
    setValue("price", formattedValue);
  };

  useEffect(() => {
    const price = getValues("price");

    if (!price) return;

    // 숫자만 추출 후 포맷팅
    const numericValue = Number(String(price).replace(/\D/g, ""));
    const formatted = Intl.NumberFormat().format(numericValue);

    setValue("price", formatted);
  }, [setValue, getValues]);

  return { price, onChangePrice };
}
