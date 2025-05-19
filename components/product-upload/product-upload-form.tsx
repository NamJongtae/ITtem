"use client";

import { MyForm } from "../commons/my-form/my-form";
import Empty from "../commons/empty";
import { isAxiosError } from "axios";
import ProductUploadFormContent from "./product-upload-form-content";
import Loading from "../commons/loading";
import useProductUploadSubmit from "@/hooks/product-upload/useProductUploadSubmit";

export default function ProductUploadForm() {
  const {
    onSubmit: productUploadSubmit,
    productUploadLoading,
    productUploadError
  } = useProductUploadSubmit();

  if (productUploadError) {
    if (isAxiosError<{ message: string }>(productUploadError)) {
      return (
        <Empty message={productUploadError.response?.data?.message || ""} />
      );
    }
  }

  if (productUploadLoading) {
    return <Loading />;
  }

  return (
    <>
      <MyForm
        onSubmit={productUploadSubmit}
        formOptions={{
          mode: "onChange",
          defaultValues: {
            imgData: [],
            prevImgData: [],
            name: "",
            sellType: "",
            category: "",
            location: "",
            condition: "",
            returnPolicy: "",
            transaction: "",
            deliveryFee: "",
            price: "",
            description: ""
          }
        }}
      >
        <ProductUploadFormContent />
      </MyForm>
    </>
  );
}
