import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ProductData } from "../../shared/types/productTypes";

export default function useInitializeFormData(productData?: ProductData) {
  const { resetField } = useFormContext();

  useEffect(() => {
    if (!productData) return;

    resetField("imgData", {
      defaultValue: productData.imgData ?? []
    });

    resetField("prevImgData", {
      defaultValue: productData.imgData ?? []
    });

    resetField("name", {
      defaultValue: productData.name ?? ""
    });

    resetField("sellType", {
      defaultValue: productData.sellType ?? ""
    });

    resetField("category", {
      defaultValue: productData.category ?? ""
    });

    resetField("location", {
      defaultValue: productData.location ?? ""
    });

    resetField("condition", {
      defaultValue: productData.condition ?? ""
    });

    resetField("returnPolicy", {
      defaultValue: productData.returnPolicy ?? ""
    });

    resetField("transaction", {
      defaultValue: productData.transaction ?? ""
    });

    resetField("deliveryFee", {
      defaultValue: productData.deliveryFee ?? ""
    });

    resetField("price", {
      defaultValue: productData.price ? productData.price.toString() : ""
    });

    resetField("description", {
      defaultValue: productData.description ?? ""
    });
  }, [productData, resetField]);
}
