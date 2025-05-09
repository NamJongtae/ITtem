import { ProductImgData } from "@/types/product-types";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function useProductUploadImgPreview(
  initialImages: ProductImgData[] = []
) {
  const [preview, setPreview] = useState<ProductImgData[]>(initialImages);
  const { getValues, setValue } = useFormContext();

  const addPreview = (images: ProductImgData[]) => {
    setPreview((prev) => [...prev, ...images]);
  };

  const removePreview = (idx: number) => {
    const currentImgList = getValues("imgData");
    const currentPrevImgDataList = getValues("prevImgData");

    setPreview((prev) => prev.filter((_, itemIdx) => itemIdx !== idx));

    setValue(
      "imgData",
      currentImgList.filter((_: unknown, itemIdx: number) => itemIdx !== idx),
      { shouldDirty: true, shouldValidate: true }
    );
    setValue(
      "prevImgData",
      currentPrevImgDataList.filter(
        (_: unknown, itemIdx: number) => itemIdx !== idx
      ),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  return { preview, addPreview, removePreview };
}
