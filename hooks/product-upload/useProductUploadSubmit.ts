import { uploadMultiImgToFirestore } from "@/lib/api/firebase";
import {
  ProductImgData,
  ProductUploadData,
} from "@/types/product-types";
import { FieldValues } from "react-hook-form";
import useProductUploadMutate from "../react-query/mutations/product/useProductUploadMutate";
import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import useAuthStore from '@/store/auth-store';

export default function useProductUploadSubmit() {
  const { productUploadMuate } = useProductUploadMutate();
  const user = useAuthStore((state) => state.user);
  const [productUploadLoading, setProductUploadLoading] = useState(false);
  const [productUploadError, setProductUploadError] = useState(false);

  const handleClickProductUploadSubmit = async (values: FieldValues) => {
    try {
      setProductUploadLoading(true);
      const imgData = (await uploadMultiImgToFirestore(values.imgData)) as
        | ProductImgData[]
        | undefined;

      const productData: ProductUploadData = {
        name: values.name,
        description: values.description,
        uid: user?.uid || "",
        imgData: imgData || [],
        price: parseInt(values.price.replace(",", ""), 10),
        location: values.location,
        sellType: values.sellType,
        category: values.category,
        condition: values.condition,
        returnPolicy: values.returnPolicy,
        transaction: values.transaction,
        deliveryFee: values.deliveryFee,
      };

      await productUploadMuate(productData);
    } catch (error) {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
        setProductUploadError(true);
      } else if (error instanceof Error) {
        toast.warn(error.message);
      }
    } finally {
      setProductUploadLoading(false);
    }
  };

  return {
    handleClickProductUploadSubmit,
    productUploadLoading,
    productUploadError,
  };
}
