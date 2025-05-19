"use client";

import Loading from "../commons/loading";
import { isAxiosError } from "axios";
import useProductEditSubmit from "@/hooks/product-upload/useProductEditSubmit";
import { MyForm } from "../commons/my-form/my-form";
import Empty from "../commons/empty";
import useProductQuery from "@/hooks/react-query/queries/product/useProductQuery";
import ProductUploadFormContent from "../product-upload/product-upload-form-content";

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
