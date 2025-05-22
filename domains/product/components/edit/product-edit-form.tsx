"use client";

import Loading from "@/components/loading";
import { isAxiosError } from "axios";
import useProductEditSubmit from "../../hooks/edit/useProductEditSubmit";
import { MyForm } from "@/components/my-form/my-form";
import Empty from "@/components/empty";
import useProductQuery from "../../hooks/queries/useProductQuery";
import ProductUploadFormContent from "../upload/form-content/product-upload-form-content";

export default function ProductEditForm() {
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
