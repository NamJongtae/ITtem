"use client";

import MyForm from "@/shared/common/components/MyForm";
import Empty from "@/shared/common/components/empty";
import { isAxiosError } from "axios";
import ProductUploadFormContent from "./form-content/FormContent";
import Loading from "@/shared/common/components/Loading";
import useProductUploadSubmit from "../hooks/useProductUploadSubmit";

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
