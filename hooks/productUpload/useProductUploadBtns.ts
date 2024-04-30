import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

export default function useProductUploadBtns(isEdit?: boolean) {
  const router = useRouter();

  const { formState } = useFormContext();

  const handleClickCancle = () => {
    router.push("/");
  };

  const { errors, dirtyFields } = formState;

  const isDirties = isEdit
    ? dirtyFields["img"] ||
      dirtyFields["name"] ||
      dirtyFields["sellType"] ||
      dirtyFields["category"] ||
      dirtyFields["location"] ||
      dirtyFields["condition"] ||
      dirtyFields["returnPolicy"] ||
      dirtyFields["transaction"] ||
      dirtyFields["deliveryFee"] ||
      dirtyFields["desc"]
    : dirtyFields["name"] &&
      dirtyFields["img"] &&
      dirtyFields["sellType"] &&
      dirtyFields["category"] &&
      dirtyFields["location"] &&
      dirtyFields["condition"] &&
      dirtyFields["returnPolicy"] &&
      dirtyFields["transaction"] &&
      dirtyFields["deliveryFee"] &&
      dirtyFields["desc"];

  const isErrors =
    errors["img"] ||
    errors["name"] ||
    errors["sellType"] ||
    errors["category"] ||
    errors["location"] ||
    errors["condition"] ||
    errors["returnPolicy"] ||
    errors["transaction"] ||
    errors["deliveryFee"] ||
    errors["price"] ||
    errors["desc"];

  const isDisabled = !isDirties || !!isErrors;

  return { handleClickCancle, isDisabled };
}
