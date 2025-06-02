import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ProductData } from "../../shared/types/productTypes";

export default function useInitializeFormData(productData?: ProductData) {
  const { reset } = useFormContext();

  useEffect(() => {
    if (productData) {
      reset({
        imgData: productData?.imgData,
        prevImgData: productData?.imgData,
        name: productData?.name,
        sellType: productData?.sellType,
        category: productData?.category,
        location: productData?.location,
        condition: productData?.condition,
        returnPolicy: productData?.returnPolicy,
        transaction: productData?.transaction,
        deliveryFee: productData?.deliveryFee,
        price: productData?.price.toString(),
        description: productData?.description
      });
    }
  }, [productData, reset]);
}
