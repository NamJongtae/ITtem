"use client";

import { MyForm } from "../commons/my-form/my-form";
import Empty from "../commons/empty";
import { isAxiosError } from "axios";
import ProductUploadFormContent from "./product-upload-form-content";
import useProductUploadFormLogic from "@/hooks/product-upload/useProductUploadFormLogic";
import Loading from "../commons/loading";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadForm({ isEdit }: IProps) {
  const {
    onSubmit,
    productDetailData,
    loadProductLoading,
    isError
  } = useProductUploadFormLogic({ isEdit });


  if (isError) {
    if (isAxiosError<{ message: string }>(isError)) {
      return <Empty message={isError.response?.data?.message || ""} />;
    }
  }

  if (loadProductLoading) {
    return <Loading />;
  }

  return (
    <>
      <MyForm
        onSubmit={onSubmit}
        formOptions={{
          mode: "onChange",
          defaultValues: {
            imgData: isEdit ? productDetailData?.imgData.map(() => ({})) : [],
            prevImgData: isEdit ? productDetailData?.imgData : [],
            name: isEdit ? productDetailData?.name : "",
            sellType: isEdit ? productDetailData?.sellType : "",
            category: isEdit ? productDetailData?.category : "",
            location: isEdit ? productDetailData?.location : "",
            condition: isEdit ? productDetailData?.condition : "",
            returnPolicy: isEdit ? productDetailData?.returnPolicy : "",
            transaction: isEdit ? productDetailData?.transaction : "",
            deliveryFee: isEdit ? productDetailData?.deliveryFee : "",
            price: isEdit ? productDetailData?.price : "",
            description: isEdit ? productDetailData?.description : ""
          }
        }}
      >
        <ProductUploadFormContent
          isEdit={isEdit}
          imgData={productDetailData?.imgData}
        />
      </MyForm>
    </>
  );
}
