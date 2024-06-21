import Loading from "../commons/loading";
import { MyForm } from "../commons/myForm/MyForm";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import ProductUploadFormContent from "./product-upload-form-content";
import useProductUploadForm from "@/hooks/productUpload/useProductUploadForm";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadForm({ isEdit }: IProps) {
  const {
    handleClickProductUploadSubmit,
    handleClickProductEditSubmit,
    productDetailData,
    isLoading,
    isError,
  } = useProductUploadForm({ isEdit });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    if (isAxiosError<{ message: string }>(isError)) {
      return <Empty message={isError.response?.data?.message || ""} />;
    }
  }

  return (
    <MyForm
      onSubmit={
        isEdit ? handleClickProductEditSubmit : handleClickProductUploadSubmit
      }
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
          description: isEdit ? productDetailData?.description : "",
        },
      }}
    >
      <ProductUploadFormContent
        isEdit={isEdit}
        imgData={productDetailData?.imgData}
      />
    </MyForm>
  );
}
