import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

export default function useProductUploadBtnDisabled(isEdit?: boolean) {
  const router = useRouter();

  const { formState } = useFormContext();

  const handleClickCancle = () => {
    router.push("/");
  };

  const { errors, dirtyFields } = formState;

  const isDirties = isEdit
    ? dirtyFields["imgData"] ||
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
