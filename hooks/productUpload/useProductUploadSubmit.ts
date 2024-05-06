import { uploadMultiImgToFirestore } from "@/lib/api/firebase";
import {
  ProductImgData,
  ProductStatus,
  ProductUploadData,
} from "@/types/productTypes";
import { FieldValues } from "react-hook-form";
import useProductUploadMutate from "../querys/useProductUploadMutate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useProductUploadSubmit() {
  const { productUploadMuate } = useProductUploadMutate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [productUploadLoading, setProductUploadLoading] = useState(false);

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
        price: parseInt(values.price, 10),
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
  };
}
