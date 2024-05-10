import Loading from "../commons/loading";
import { MyForm } from "../commons/myForm/MyForm";
import useProductUploadSubmit from "@/hooks/productUpload/useProductUploadSubmit";
import useProductQuery from "@/hooks/querys/useProductQuery";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import useProductEditSubmit from "@/hooks/productUpload/useProductEditSubmit";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useProductEditCheckUser from "@/hooks/productUpload/useProductEditCheckUser";
import ProductUploadFormContent from "./product-upload-form-content";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadForm({ isEdit }: IProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    handleClickProductUploadSubmit,
    productUploadLoading,
  } = useProductUploadSubmit();

  const { productDetailData, loadProductLoading, loadProductError } =
    useProductQuery(isEdit);

  const {
    handleClickProductEditSubmit,
    productEditLoading,
  } = useProductEditSubmit();

  useProductEditCheckUser(productDetailData, isEdit);

  if (
    loadProductLoading ||
    productUploadLoading ||
    productEditLoading
  ) {
    return <Loading />;
  }

  if (loadProductError) {
    if (isAxiosError<{ message: string }>(loadProductError)) {
      return <Empty message={loadProductError.response?.data?.message || ""} />;
    }
  }

  return !isEdit || user?.uid === productDetailData?.uid ? (
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
  ) : null;
}
