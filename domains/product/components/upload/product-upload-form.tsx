"use client";

import { MyForm } from "@/components/my-form/my-form";
import Empty from "@/components/empty";
import { isAxiosError } from "axios";
import ProductUploadFormContent from "./form-content/product-upload-form-content";
import Loading from "@/components/loading";
import useProductUploadSubmit from "../../hooks/upload/useProductUploadSubmit";

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
