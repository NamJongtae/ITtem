import { ProductUploadData } from "@/types/product-types";
import { FieldValues } from "react-hook-form";
import useProductUploadMutate from "../react-query/mutations/product/useProductUploadMutate";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import useAuthStore from "@/store/auth-store";

export default function useProductUploadSubmit() {
  const { productUploadMuate, productUploadLoading, productUploadError } =
    useProductUploadMutate();
  const user = useAuthStore((state) => state.user);

  const onSubmit = async (values: FieldValues) => {
    try {
      const productData: ProductUploadData = {
        name: values.name,
        description: values.description,
        uid: user?.uid || "",
        imgData: [],
        price: parseInt(values.price.replace(",", ""), 10),
        location: values.location,
        sellType: values.sellType,
        category: values.category,
        condition: values.condition,
        returnPolicy: values.returnPolicy,
        transaction: values.transaction,
        deliveryFee: values.deliveryFee
      };

      await productUploadMuate({ productData, values });
    } catch (error) {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.warn(error.message);
      }
    }
  };

  return {
    onSubmit,
    productUploadLoading,
    productUploadError
  };
}
