"use client";

import Loading from "@/shared/common/components/Loading";
import { isAxiosError } from "axios";
import useProductEditSubmit from "../hooks/useProductEditSubmit";
import MyForm from "@/shared/common/components/MyForm";
import Empty from "@/shared/common/components/Empty";
import useProductQuery from "../../shared/hooks/queries/useProductQuery";
import ProductUploadFormContent from "../../upload/components/form-content/FormContent";

export default function Form() {
  const { onSubmit, productEditLoading, productEditError } =
    useProductEditSubmit();

  const { productData, productError, productLoading } = useProductQuery();

  if (productError) {
    if (isAxiosError<{ message: string }>(productEditError)) {
      return <Empty message={productEditError.response?.data?.message || ""} />;
    }
  }

  if (productEditLoading || productLoading) {
    return <Loading />;
  }

  return (
    <>
      <MyForm
        onSubmit={onSubmit}
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
        <ProductUploadFormContent
          productData={productData}
          imgData={productData?.imgData}
        />
      </MyForm>
    </>
  );
}
