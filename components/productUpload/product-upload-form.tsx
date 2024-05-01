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
import { useEffect, useState } from "react";
import {
  ProductCategory,
  ProductCondition,
  ProductSellType,
  ProductTransaction,
  ProductData,
  ProductStatus,
} from "@/types/productTypes";
import Loading from "../commons/loading";
import { MyForm } from "../commons/myForm/MyForm";
import { v4 as uuid } from "uuid";
import useProductUploadSubmit from "@/hooks/productUpload/useProductUploadSubmit";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadForm({ isEdit }: IProps) {
  const { handleClickSubmit, productSubmitLoading } = useProductUploadSubmit();
  
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const getDummyData = (): Promise<ProductData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: uuid(),
          name: "가방",
          description: "깨끗한 가방",
          userName: "Jon",
          status: ProductStatus.sold,
          block: false,
          reportCount: 0,
          viewCount: 0,
          likeCount: 0,
          likeUserList: [],
          createdAt: new Date("2024.03.21").toString(),
          sellType: ProductSellType.중고거래,
          category: ProductCategory.가방지갑,
          imgData: [
            {
              url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              name: "가방",
            },
          ],
          price: 10000,
          location: "서울 특별시 강남구",
          condition: ProductCondition.S,
          returnPolicy: true,
          transaction: ProductTransaction.직거래,
          deliveryFee: true,
        });
      }, 2000);
    });
  };

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      getDummyData().then((data) => {
        setProductData(data);
        setIsLoading(false);
      });
    }
  }, [isEdit]);

  if (isLoading || productSubmitLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={handleClickSubmit}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          img: isEdit ? productData?.imgData : "",
          name: isEdit ? productData?.name : "",
          sellType: isEdit ? productData?.sellType : "",
          category: isEdit ? productData?.category : "",
          location: isEdit ? productData?.location : "",
          condition: isEdit ? productData?.condition : "",
          returnPolicy: isEdit ? productData?.returnPolicy : "",
          transaction: isEdit ? productData?.transaction : "",
          deliveryFee: isEdit
            ? productData?.deliveryFee
              ? "포함"
              : "비포함"
            : "",
          price: isEdit ? productData?.price : "",
          desc: isEdit ? productData?.description : "",
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
  );
}
