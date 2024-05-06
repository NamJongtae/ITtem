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

  const { productData, loadProductLoading, loadProductError } =
    useProductQuery(isEdit);

  const {
    handleClickProductEditSubmit,
    productEditLoading,
  } = useProductEditSubmit();

  useProductEditCheckUser(productData, isEdit);

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

  return !isEdit || user?.uid === productData?.uid ? (
    <MyForm
      onSubmit={
        isEdit ? handleClickProductEditSubmit : handleClickProductUploadSubmit
      }
      formOptions={{
        mode: "onChange",
        defaultValues: {
          imgData: isEdit ? productData?.imgData.map(() => ({})) : [],
          prevImgData: isEdit ? productData?.imgData : [],
          name: isEdit ? productData?.name : "",
          sellType: isEdit ? productData?.sellType : "",
          category: isEdit ? productData?.category : "",
          location: isEdit ? productData?.location : "",
          condition: isEdit ? productData?.condition : "",
          returnPolicy: isEdit ? productData?.returnPolicy : "",
          transaction: isEdit ? productData?.transaction : "",
          deliveryFee: isEdit ? productData?.deliveryFee : "",
          price: isEdit ? productData?.price : "",
          description: isEdit ? productData?.description : "",
        },
      }}
    >
      <ProductUploadFormContent
        isEdit={isEdit}
        imgData={productData?.imgData}
      />
    </MyForm>
  ) : null;
}
