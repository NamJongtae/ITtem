import ProductUploadImgField from "./imgField/product-upload-img-field";
import ProductUploadNameField from "./product-upload-name-field";
import ProductUploadCategoryField from "./product-upload-category-field";
import ProductUploadLocationField from "./product-upload-location-field";
import ProductUploadConditionField from "./product-upload-condition-field";
import ProductUploadReturnPolicyField from "./product-upload-returnPolicy-field";
import ProductUploadTransactionField from "./product-upload-transaction-field";
import ProductUploadPriceField from "./product-upload-price-field";
import ProductUploadDescField from "./product-upload-desc-field";
import ProductUploadDeliveryFeeField from "./product-upload-deliveryFee-field";
import ProductUploadSellTypeField from "./product-upload-sellType-field";
import ProductUploadBtns from "./product-upload-btns";
import Loading from "../commons/loading";
import { MyForm } from "../commons/myForm/MyForm";
import useProductUploadSubmit from "@/hooks/productUpload/useProductUploadSubmit";
import useProductQuery from "@/hooks/querys/useProductQuery";
import ProductListEmpty from "../commons/productList/product-list-empty";
import { isAxiosError } from "axios";
import useProductEditSubmit from "@/hooks/productUpload/useProductEditSubmit";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useProductEditCheckUser from "@/hooks/productUpload/useProductEditCheckUser";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadForm({ isEdit }: IProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const { handleClickProductUploadSubmit, productUploadLoading } =
    useProductUploadSubmit();

  const { productData, loadProductLoading, loadProductError } =
    useProductQuery(isEdit);

  const { handleClickProductEditSubmit, productEditLoading } =
    useProductEditSubmit();

  useProductEditCheckUser(productData, isEdit);

  if (loadProductLoading || productUploadLoading || productEditLoading) {
    return <Loading />;
  }

  if (loadProductError) {
    if (isAxiosError<{ message: string }>(loadProductError)) {
      return (
        <ProductListEmpty
          message={loadProductError.response?.data?.message || ""}
        />
      );
    }
  }

  return !isEdit ||  user?.uid === productData?.uid ? (
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
      <ProductUploadImgField imgData={productData?.imgData} />
      <ProductUploadNameField />
      <ProductUploadSellTypeField />
      <ProductUploadCategoryField />
      <ProductUploadLocationField />
      <ProductUploadConditionField />
      <ProductUploadReturnPolicyField />
      <ProductUploadTransactionField />
      <ProductUploadPriceField />
      <ProductUploadDeliveryFeeField />
      <ProductUploadDescField />
      <ProductUploadBtns isEdit={isEdit} />
    </MyForm>
  ) : null;
}
