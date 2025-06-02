import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export default function useProductUploadBtnDisabled(isEditPage?: boolean) {
  const router = useRouter();

  const { formState, getValues } = useFormContext();

  const handleClickCancle = () => {
    router.push("/");
  };

  const { errors, dirtyFields } = formState;
  const prevImgData = getValues("prevImgData");
  const currentImgData = getValues("imgData");
  const hasImgDataChanged = useMemo(() => {
    if (!prevImgData || !currentImgData) return false;

    if (prevImgData.length !== currentImgData.length) return true;

    for (let i = 0; i < prevImgData.length; i++) {
      const a = prevImgData[i];
      const b = currentImgData[i];
      if (a.name !== b.name) return true;
    }

    return false;
  }, [prevImgData, currentImgData]);

  const isDirties = isEditPage
    ? hasImgDataChanged ||
      dirtyFields["prevImgData"] ||
      dirtyFields["price"] ||
      dirtyFields["name"] ||
      dirtyFields["sellType"] ||
      dirtyFields["category"] ||
      dirtyFields["location"] ||
      dirtyFields["condition"] ||
      dirtyFields["returnPolicy"] ||
      dirtyFields["transaction"] ||
      dirtyFields["deliveryFee"] ||
      dirtyFields["description"]
    : dirtyFields["name"] &&
      dirtyFields["imgData"] &&
      dirtyFields["price"] &&
      dirtyFields["sellType"] &&
      dirtyFields["category"] &&
      dirtyFields["location"] &&
      dirtyFields["condition"] &&
      dirtyFields["returnPolicy"] &&
      dirtyFields["transaction"] &&
      dirtyFields["deliveryFee"] &&
      dirtyFields["description"];

  const isErrors =
    errors["imgData"] ||
    errors["name"] ||
    errors["sellType"] ||
    errors["category"] ||
    errors["location"] ||
    errors["condition"] ||
    errors["returnPolicy"] ||
    errors["transaction"] ||
    errors["deliveryFee"] ||
    errors["price"] ||
    errors["description"];

  const isDisabled = !isDirties || !!isErrors;

  return { handleClickCancle, isDisabled };
}
