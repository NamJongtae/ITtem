"use client";

import Loading from "@/shared/common/components/Loading";
import { isAxiosError } from "axios";
import useProductEditSubmit from "../hooks/useProductEditSubmit";
import MyForm from "@/shared/common/components/MyForm";
import Empty from "@/shared/common/components/empty";
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
            imgData: productData?.imgData.map(() => ({})),
            prevImgData: productData?.imgData,
            name: productData?.name,
            sellType: productData?.sellType,
            category: productData?.category,
            location: productData?.location,
            condition: productData?.condition,
            returnPolicy: productData?.returnPolicy,
            transaction: productData?.transaction,
            deliveryFee: productData?.deliveryFee,
            price: productData?.price,
            description: productData?.description
          }
        }}
      >
        <ProductUploadFormContent imgData={productData?.imgData} />
      </MyForm>
    </>
  );
}
